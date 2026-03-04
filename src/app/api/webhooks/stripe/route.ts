import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { resend } from "@/lib/resend";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items", "shipping_cost.shipping_rate"],
    }) as Stripe.Checkout.Session;

    // Parse cart items from metadata
    const cartItems: { product_id: string; quantity: number }[] = JSON.parse(
      fullSession.metadata?.cart_items || "[]"
    );

    // Fetch product details
    const productRefs = cartItems.map((i) =>
      db.collection("products").doc(i.product_id)
    );
    const productSnaps = await db.getAll(...productRefs);
    const products = productSnaps
      .filter((s) => s.exists)
      .map((s) => ({ id: s.id, ...s.data()! })) as Array<{
      id: string;
      name: string;
      price_cents: number;
      image_url: string | null;
      supplier_url: string | null;
    }>;

    const orderItems = cartItems.map((ci) => {
      const p = products.find((prod) => prod.id === ci.product_id);
      return {
        product_id: ci.product_id,
        name: p?.name ?? "Unknown Product",
        price_cents: p?.price_cents ?? 0,
        quantity: ci.quantity,
        image_url: p?.image_url ?? null,
        supplier_url: p?.supplier_url ?? null,
      };
    });

    // Stripe v20+ moved shipping_details — access via collected_information or raw data
    const rawSession = fullSession as unknown as Record<string, unknown>;
    const shippingDetails = (rawSession.shipping_details ?? rawSession.collected_information) as {
      address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
      };
    } | null;
    const shippingAddress = {
      line1: shippingDetails?.address?.line1 ?? "",
      line2: shippingDetails?.address?.line2 ?? "",
      city: shippingDetails?.address?.city ?? "",
      state: shippingDetails?.address?.state ?? "",
      postal_code: shippingDetails?.address?.postal_code ?? "",
      country: shippingDetails?.address?.country ?? "US",
    };

    const subtotalCents = fullSession.amount_subtotal ?? 0;
    const shippingCents = fullSession.shipping_cost?.amount_total ?? 0;
    const totalCents = fullSession.amount_total ?? 0;
    const customerEmail = fullSession.customer_details?.email ?? "";
    const customerName = fullSession.customer_details?.name ?? "";

    // Save order
    const orderData = {
      stripe_session_id: session.id,
      customer_email: customerEmail,
      customer_name: customerName,
      shipping_address: shippingAddress,
      items: orderItems,
      subtotal_cents: subtotalCents,
      shipping_cents: shippingCents,
      total_cents: totalCents,
      status: "pending",
      tracking_number: null,
      tracking_url: null,
      easypost_shipment_id: null,
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    };

    let orderId: string;
    try {
      const orderRef = await db.collection("orders").add(orderData);
      orderId = orderRef.id;
    } catch (err) {
      console.error("Failed to save order:", err);
      return NextResponse.json(
        { error: "Order save failed" },
        { status: 500 }
      );
    }

    // Decrement inventory atomically using transactions
    for (const item of cartItems) {
      const productRef = db.collection("products").doc(item.product_id);
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(productRef);
        if (!snap.exists) return;
        const current = snap.data()!.inventory_count as number;
        tx.update(productRef, {
          inventory_count: Math.max(0, current - item.quantity),
          updated_at: FieldValue.serverTimestamp(),
        });
      });
    }

    const shortOrderId = orderId.slice(-8).toUpperCase();
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "orders@starnetpros.com";

    // Send customer confirmation
    try {
      await resend.emails.send({
        from: fromEmail,
        to: customerEmail,
        subject: `Order Confirmation — Starnet Pros #${shortOrderId}`,
        html: buildOrderConfirmationHtml(
          { id: orderId, ...orderData },
          customerName
        ),
      });
    } catch (emailErr) {
      console.error("Failed to send customer email:", emailErr);
    }

    // Send admin alert
    try {
      await resend.emails.send({
        from: fromEmail,
        to: process.env.ADMIN_EMAIL!,
        subject: `New Order — $${(totalCents / 100).toFixed(2)} from ${customerName}`,
        html: buildAdminAlertHtml({ id: orderId, ...orderData }),
      });
    } catch (emailErr) {
      console.error("Failed to send admin email:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}

function buildOrderConfirmationHtml(
  order: Record<string, unknown>,
  customerName: string
): string {
  const items = order.items as Array<{
    name: string;
    price_cents: number;
    quantity: number;
  }>;
  const address = order.shipping_address as Record<string, string>;
  const orderId = (order.id as string).slice(-8).toUpperCase();

  const itemRows = items
    .map(
      (i) =>
        `<tr style="border-bottom:1px solid #f3f4f6"><td style="padding:12px 0;color:#111827;font-size:14px">${i.name}</td><td style="padding:12px 0;text-align:right;color:#6b7280;font-size:14px">${i.quantity}</td><td style="padding:12px 0;text-align:right;color:#111827;font-size:14px">$${((i.price_cents * i.quantity) / 100).toFixed(2)}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:Inter,system-ui,sans-serif;background:#f9fafb;margin:0;padding:40px 0">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
<div style="background:#0A1628;padding:32px 40px"><p style="color:#fff;font-size:22px;font-weight:700;margin:0">Starnet Pros</p></div>
<div style="padding:32px 40px">
<h1 style="color:#111827;font-size:20px;font-weight:700;margin-top:0">Order Confirmed</h1>
<p style="color:#6b7280">Hi ${customerName}, thanks for your order! We'll send tracking info once your order ships.</p>
<p style="color:#6b7280">Order ID: <strong style="color:#111827">#${orderId}</strong></p>
<table style="width:100%;border-collapse:collapse;margin-top:24px">
<thead><tr style="border-bottom:1px solid #e5e7eb"><th style="text-align:left;padding:8px 0;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase">Product</th><th style="text-align:right;padding:8px 0;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase">Qty</th><th style="text-align:right;padding:8px 0;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase">Price</th></tr></thead>
<tbody>${itemRows}</tbody>
</table>
<div style="border-top:1px solid #e5e7eb;margin-top:16px;padding-top:16px">
<p style="color:#6b7280;font-size:14px;margin:4px 0">Subtotal: <strong style="color:#111827">$${((order.subtotal_cents as number) / 100).toFixed(2)}</strong></p>
<p style="color:#6b7280;font-size:14px;margin:4px 0">Shipping: <strong style="color:#111827">${(order.shipping_cents as number) === 0 ? "FREE" : `$${((order.shipping_cents as number) / 100).toFixed(2)}`}</strong></p>
<p style="color:#111827;font-size:16px;font-weight:700;margin:8px 0 0">Total: $${((order.total_cents as number) / 100).toFixed(2)}</p>
</div>
<div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px">
<p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;margin-top:0">Shipping To</p>
<p style="color:#111827;font-size:14px;margin:0">${customerName}<br>${address.line1}<br>${address.city}, ${address.state} ${address.postal_code}</p>
</div>
</div>
<div style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb">
<p style="color:#9ca3af;font-size:12px;margin:0;text-align:center">Questions? Email info@starnetpros.com or call (833) 411-2089</p>
</div>
</div></body></html>`;
}

function buildAdminAlertHtml(order: Record<string, unknown>): string {
  const items = order.items as Array<{
    name: string;
    price_cents: number;
    quantity: number;
    image_url: string | null;
    supplier_url: string | null;
  }>;
  const address = order.shipping_address as Record<string, string>;
  const orderId = (order.id as string).slice(-8).toUpperCase();

  const itemRows = items
    .map((i) => {
      const amazonSearch = `https://www.amazon.com/s?k=${encodeURIComponent(i.name)}`;
      const link = i.supplier_url || amazonSearch;
      return `<tr style="border-bottom:1px solid #f3f4f6">
<td style="padding:12px 0;width:48px;vertical-align:top">${i.image_url ? `<img src="${i.image_url}" alt="" style="width:44px;height:44px;object-fit:contain;border-radius:4px" />` : ""}</td>
<td style="padding:12px 8px;vertical-align:top"><a href="${link}" style="color:#2563eb;font-size:14px;font-weight:600;text-decoration:none">${i.name}</a><br><span style="color:#6b7280;font-size:12px">Qty: ${i.quantity} &bull; $${((i.price_cents * i.quantity) / 100).toFixed(2)}</span></td>
<td style="padding:12px 0;text-align:right;vertical-align:top"><a href="${link}" style="display:inline-block;background:#ff9900;color:#111;padding:6px 12px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none">Order on Amazon</a></td>
</tr>`;
    })
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:Inter,system-ui,sans-serif;background:#f9fafb;margin:0;padding:40px 0">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
<div style="background:#0A1628;padding:24px 40px"><p style="color:#fff;font-size:18px;font-weight:700;margin:0">New Order — #${orderId}</p></div>
<div style="padding:32px 40px">
<div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;padding:16px;margin-bottom:24px">
<p style="color:#065f46;font-size:20px;font-weight:700;margin:0">$${((order.total_cents as number) / 100).toFixed(2)}</p>
<p style="color:#059669;font-size:13px;margin:4px 0 0">Subtotal: $${((order.subtotal_cents as number) / 100).toFixed(2)} &bull; Shipping: ${(order.shipping_cents as number) === 0 ? "FREE" : `$${((order.shipping_cents as number) / 100).toFixed(2)}`}</p>
</div>
<p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;margin:0 0 8px">Customer</p>
<p style="color:#111827;font-size:15px;font-weight:600;margin:0">${order.customer_name}</p>
<p style="color:#6b7280;font-size:14px;margin:2px 0 0"><a href="mailto:${order.customer_email}" style="color:#2563eb;text-decoration:none">${order.customer_email}</a></p>
<div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:8px">
<p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;margin:0 0 8px">Ship To</p>
<p style="color:#111827;font-size:14px;margin:0">${order.customer_name}<br>${address.line1}${address.line2 ? `<br>${address.line2}` : ""}<br>${address.city}, ${address.state} ${address.postal_code}<br>${address.country || "US"}</p>
</div>
<p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;margin:28px 0 12px">Products to Fulfill</p>
<table style="width:100%;border-collapse:collapse">${itemRows}</table>
</div>
<div style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb">
<p style="color:#9ca3af;font-size:11px;margin:0;text-align:center">Starnet Pros Order System &bull; ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
</div>
</div></body></html>`;
}
