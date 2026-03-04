import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { getEasyPost } from "@/lib/easypost-client";
import { resend } from "@/lib/resend";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const orderDoc = await db.collection("orders").doc(id).get();
  if (!orderDoc.exists)
    return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const order = { id: orderDoc.id, ...orderDoc.data()! } as Record<string, any>;

  const { weight_oz, length_in, width_in, height_in } = await req.json();

  try {
    const easypost = await getEasyPost();
    const shipment = await easypost.Shipment.create({
      toAddress: {
        name: order.customer_name,
        street1: order.shipping_address.line1,
        street2: order.shipping_address.line2 || "",
        city: order.shipping_address.city,
        state: order.shipping_address.state,
        zip: order.shipping_address.postal_code,
        country: order.shipping_address.country,
        email: order.customer_email,
      },
      fromAddress: {
        name: "Starnet Pros",
        street1: "1125 Charlottetowne Ave",
        city: "Charlotte",
        state: "NC",
        zip: "28204",
        country: "US",
        phone: "8334112089",
      },
      parcel: {
        weight: weight_oz,
        length: length_in,
        width: width_in,
        height: height_in,
      },
    });

    // Buy cheapest rate
    const lowestRate = shipment.lowestRate(["USPS", "UPS"]);
    const boughtShipment = await easypost.Shipment.buy(
      shipment.id,
      lowestRate
    );

    const trackingNumber = boughtShipment.tracking_code || "";
    const trackingUrl = boughtShipment.tracker?.public_url || "";
    const labelUrl = boughtShipment.postage_label?.label_url || "";

    // Update order
    const orderRef = db.collection("orders").doc(id);
    await orderRef.update({
      status: "shipped",
      tracking_number: trackingNumber,
      tracking_url: trackingUrl,
      easypost_shipment_id: boughtShipment.id,
      updated_at: FieldValue.serverTimestamp(),
    });
    const updatedDoc = await orderRef.get();
    const updatedOrder = updatedDoc.exists
      ? { id: updatedDoc.id, ...updatedDoc.data()! }
      : order;

    // Send shipping confirmation email
    const orderId = order.id.slice(-8).toUpperCase();
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "orders@starnetpros.com";

    try {
      await resend.emails.send({
        from: fromEmail,
        to: order.customer_email,
        subject: `Your Order Has Shipped — Starnet Pros #${orderId}`,
        html: buildShippingEmailHtml(
          updatedOrder,
          trackingNumber,
          trackingUrl
        ),
      });
    } catch (emailErr) {
      console.error("Failed to send shipping email:", emailErr);
    }

    return NextResponse.json({ labelUrl, trackingNumber, trackingUrl });
  } catch (err) {
    console.error("EasyPost label error:", err);
    return NextResponse.json(
      { error: "Failed to generate shipping label" },
      { status: 500 }
    );
  }
}

function buildShippingEmailHtml(
  order: Record<string, unknown>,
  trackingNumber: string,
  trackingUrl: string
): string {
  const address = order.shipping_address as Record<string, string>;
  const orderId = (order.id as string).slice(-8).toUpperCase();
  const customerName = order.customer_name as string;

  return `<!DOCTYPE html><html><body style="font-family:Inter,system-ui,sans-serif;background:#f9fafb;margin:0;padding:40px 0">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
<div style="background:#0A1628;padding:32px 40px"><p style="color:#fff;font-size:22px;font-weight:700;margin:0">Starnet Pros</p></div>
<div style="padding:32px 40px">
<h1 style="color:#111827;font-size:20px;font-weight:700;margin-top:0">Your Order Has Shipped!</h1>
<p style="color:#6b7280">Hi ${customerName}, your order #${orderId} is on its way!</p>
<div style="margin-top:24px;padding:20px;background:#eff6ff;border-radius:12px;border:1px solid #bfdbfe">
<p style="color:#1e40af;font-size:12px;font-weight:600;margin-top:0;text-transform:uppercase">Tracking Number</p>
<p style="color:#111827;font-size:18px;font-weight:700;margin:8px 0">${trackingNumber}</p>
${trackingUrl ? `<a href="${trackingUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;margin-top:8px">Track Your Package</a>` : ""}
</div>
<div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px">
<p style="color:#6b7280;font-size:12px;font-weight:600;margin-top:0">SHIPPING TO</p>
<p style="color:#111827;font-size:14px;margin:0">${customerName}<br>${address.line1}<br>${address.city}, ${address.state} ${address.postal_code}</p>
</div>
</div>
<div style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb">
<p style="color:#9ca3af;font-size:12px;margin:0;text-align:center">Questions? Email info@starnetpros.com or call (833) 411-2089</p>
</div>
</div></body></html>`;
}
