import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { requireSalesPin } from "@/lib/salesAuth";
import { computeTotals, findCatalogItem, formatOrderSummary, type SalesSelection } from "@/lib/salesTotals";
import { createSalesRecord, patchSalesRecord, getSalesRecord } from "@/lib/airtable";

const cap = (v: unknown, n: number) => String(v ?? "").slice(0, n);

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "https://starnetpros.com"
  ).replace(/\/$/, "");
}

async function createDepositSession(args: {
  recordId: string;
  customerName: string;
  customerEmail: string;
  salesPerson: string;
  installLabel: string;
  totalJobValue: number;
  depositDue: number;
  balanceDue: number;
}) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: args.customerEmail || undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Installation Deposit — ${args.installLabel}`,
            description:
              `Total job value $${args.totalJobValue.toFixed(2)}. ` +
              `Balance of $${args.balanceDue.toFixed(2)} due at completion.`,
          },
          unit_amount: Math.round(args.depositDue * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl()}/book?deposit=paid`,
    cancel_url: siteUrl(),
    metadata: {
      kind: "sales_deposit",
      airtable_record_id: args.recordId,
      customer_name: cap(args.customerName, 100),
      sales_person: cap(args.salesPerson, 50),
    },
  });
}

export async function POST(req: NextRequest) {
  const denied = requireSalesPin(req);
  if (denied) return denied;

  if (!process.env.AIRTABLE_API_KEY) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // ---- Retry path: regenerate the payment link for an existing record ----
  if (typeof body.recordId === "string" && body.recordId.startsWith("rec")) {
    try {
      const fields = await getSalesRecord(body.recordId);
      const depositDue = Number(fields["Deposit Due"] ?? 0);
      if (!(depositDue >= 1)) {
        return NextResponse.json({ error: "Record has no deposit due" }, { status: 400 });
      }
      const session = await createDepositSession({
        recordId: body.recordId,
        customerName: String(fields["Customer Name"] ?? ""),
        customerEmail: String(fields["Email"] ?? ""),
        salesPerson: String(fields["Sales Person"] ?? ""),
        installLabel: String(fields["Installation Package"] ?? "Installation"),
        totalJobValue: Number(fields["Total Job Value"] ?? 0),
        depositDue,
        balanceDue: Number(fields["Balance Due"] ?? 0),
      });
      await patchSalesRecord(body.recordId, {
        "Stripe Session ID": session.id,
        "Payment Link": session.url,
        Status: "Deposit Link Sent",
      });
      return NextResponse.json({ recordId: body.recordId, checkoutUrl: session.url });
    } catch (err) {
      console.error("Sales retry failed:", err);
      return NextResponse.json({ error: "Retry failed" }, { status: 502 });
    }
  }

  // ---- New submission ----
  const customerName = cap(body.customerName, 200);
  const email = cap(body.email, 200);
  const phone = cap(body.phone, 50);
  if (!customerName || !email || !phone) {
    return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
  }
  if (body.termsAccepted !== true) {
    return NextResponse.json({ error: "Terms must be accepted" }, { status: 400 });
  }

  const selection: SalesSelection = {
    installationId: cap(body.installationId, 60),
    unitId: cap(body.unitId, 60),
    mountId: cap(body.mountId, 60),
    addonIds: Array.isArray(body.addonIds) ? body.addonIds.map((x) => cap(x, 60)).slice(0, 30) : [],
    planIds: Array.isArray(body.planIds) ? body.planIds.map((x) => cap(x, 60)).slice(0, 30) : [],
    additionalEquipment: Number(body.additionalEquipment) || 0,
    discount: Number(body.discount) || 0,
    tripFee: Number(body.tripFee) || 0,
  };

  const install = findCatalogItem(selection.installationId);
  if (!install) {
    return NextResponse.json({ error: "Installation type is required" }, { status: 400 });
  }

  // Server-side recompute — never trust client totals for the charge.
  const totals = computeTotals(selection);

  const unit = findCatalogItem(selection.unitId);
  const mount = findCatalogItem(selection.mountId);
  const addonLines = selection.addonIds
    .map((id) => findCatalogItem(id))
    .filter(Boolean)
    .map((i) => `${i!.label} — $${i!.price.toFixed(2)}`)
    .join("\n");
  const planLines = selection.planIds
    .map((id) => findCatalogItem(id))
    .filter(Boolean)
    .map((i) => `${i!.label} — $${i!.price.toFixed(2)}`)
    .join("\n");

  const fields: Record<string, unknown> = {
    "Customer Name": customerName,
    Email: email,
    Phone: phone,
    "Sales Person": cap(body.salesPerson, 50),
    "Street Address": cap(body.street, 300),
    City: cap(body.city, 100),
    State: cap(body.state, 30),
    ZIP: cap(body.zip, 20),
    "Accepts Deliveries": body.acceptsDeliveries === true,
    "Delivery Notes": cap(body.deliveryNotes, 2000),
    "Home Sqft": Number(body.homeSqft) || undefined,
    "Over 2400 Sqft": body.over2400 === true,
    "Roof Material": cap(body.roofMaterial, 50) || undefined,
    Stories: cap(body.stories, 5) || undefined,
    "Notes for Tech": cap(body.notesForTech, 5000),
    "Installation Package": install.label,
    "Starlink Unit": unit?.label ?? "",
    Mount: mount?.label ?? "",
    "Equipment Source": cap(body.equipmentSource, 30) || undefined,
    Addons: addonLines,
    "Warranty / Plans": planLines,
    "Additional Equipment $": selection.additionalEquipment || undefined,
    "Discount $": selection.discount || undefined,
    "Additional Trip Fee $": selection.tripFee || undefined,
    "Order Summary": formatOrderSummary(totals),
    "Line Items JSON": JSON.stringify({ selection, totals }, null, 0).slice(0, 90000),
    "Total Job Value": totals.totalJobValue,
    "Deposit Due": totals.depositDue,
    "Balance Due": totals.balanceDue,
    "Terms Accepted": true,
    Status: "Draft",
    "Date Submitted": new Date().toISOString().slice(0, 10),
  };

  let recordId: string;
  try {
    recordId = await createSalesRecord(fields);
  } catch (err) {
    console.error("Sales record create failed:", err);
    return NextResponse.json({ error: "Airtable sync failed" }, { status: 502 });
  }

  // Zero-deposit orders (equipment only / paid via estimate) skip Stripe.
  if (totals.depositDue < 1) {
    return NextResponse.json({ recordId, checkoutUrl: null, depositDue: 0 });
  }

  try {
    const session = await createDepositSession({
      recordId,
      customerName,
      customerEmail: email,
      salesPerson: cap(body.salesPerson, 50),
      installLabel: install.label,
      totalJobValue: totals.totalJobValue,
      depositDue: totals.depositDue,
      balanceDue: totals.balanceDue,
    });
    await patchSalesRecord(recordId, {
      "Stripe Session ID": session.id,
      "Payment Link": session.url,
      Status: "Deposit Link Sent",
    });
    return NextResponse.json({
      recordId,
      checkoutUrl: session.url,
      depositDue: totals.depositDue,
    });
  } catch (err) {
    // Record saved but payment link failed — client offers a retry with recordId.
    console.error("Stripe session failed:", err);
    return NextResponse.json(
      { recordId, error: "Payment link failed", depositDue: totals.depositDue },
      { status: 502 }
    );
  }
}
