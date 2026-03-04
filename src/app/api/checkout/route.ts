import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/firebase";
import { calculateShipping } from "@/lib/shipping";
import { demoProducts } from "@/data/demoProducts";
import type { CartItem } from "@/types/store";

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Validate prices against database — never trust client
    const productIds = items.map((i) => i.product_id);

    // Check if these are demo product IDs (prod-1, prod-2, etc.)
    const isDemoIds = productIds.some((id) => id.startsWith("prod-"));

    let products: Array<{
      id: string;
      name: string;
      price_cents: number;
      inventory_count: number;
      active: boolean;
      image_url: string | null;
    }>;

    if (isDemoIds) {
      products = demoProducts
        .filter((p) => productIds.includes(p.id))
        .map((p) => ({
          id: p.id,
          name: p.name,
          price_cents: p.price_cents,
          inventory_count: p.inventory_count,
          active: p.active,
          image_url: p.image_url ?? null,
        }));
    } else {
      const refs = productIds.map((id) => db.collection("products").doc(id));
      const snapshots = await db.getAll(...refs);
      products = snapshots
        .filter((snap) => snap.exists)
        .map((snap) => ({ id: snap.id, ...snap.data()! })) as typeof products;
    }

    const lineItems: {
      price_data: {
        currency: string;
        product_data: {
          name: string;
          metadata: { product_id: string };
          images?: string[];
        };
        unit_amount: number;
      };
      quantity: number;
    }[] = [];

    for (const cartItem of items) {
      const dbProduct = products.find(
        (p) => p.id === cartItem.product_id && p.active
      );
      if (!dbProduct) {
        return NextResponse.json(
          { error: `Product not available: ${cartItem.name}` },
          { status: 400 }
        );
      }
      if (dbProduct.inventory_count < cartItem.quantity) {
        return NextResponse.json(
          { error: `Insufficient inventory for: ${dbProduct.name}` },
          { status: 400 }
        );
      }
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: dbProduct.name,
            metadata: { product_id: dbProduct.id },
            ...(dbProduct.image_url && {
              images: [
                dbProduct.image_url.startsWith("http")
                  ? dbProduct.image_url
                  : `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL}${dbProduct.image_url}`,
              ],
            }),
          },
          unit_amount: dbProduct.price_cents,
        },
        quantity: cartItem.quantity,
      });
    }

    // Calculate shipping server-side
    const subtotalCents = products.reduce((sum, p) => {
      const cartItem = items.find((i) => i.product_id === p.id)!;
      return sum + p.price_cents * cartItem.quantity;
    }, 0);
    const shippingCents = calculateShipping(subtotalCents);

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingCents, currency: "usd" },
            display_name:
              shippingCents === 0 ? "Free Shipping" : "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      success_url: `${siteUrl}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/store/cancel`,
      metadata: {
        cart_items: JSON.stringify(
          items.map((i) => ({
            product_id: i.product_id,
            quantity: i.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", message);
    return NextResponse.json(
      { error: message || "Internal server error" },
      { status: 500 }
    );
  }
}
