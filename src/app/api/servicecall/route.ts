import { NextResponse } from "next/server";

// Starnet Pros base → Service Calls table
const AIRTABLE_BASE_ID = "appD9fZSV5pwb5JFb";
const AIRTABLE_TABLE_ID = "tblDhS9kCI9rAENiX";

export async function POST(request: Request) {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!data.name || !data.phone || !data.issueSummary) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    console.error("AIRTABLE_API_KEY env var is not set — service call not synced to Airtable");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typecast: true,
        records: [
          {
            fields: {
              Name: String(data.name).slice(0, 200),
              Phone: String(data.phone).slice(0, 50),
              Email: String(data.email ?? "").slice(0, 200),
              ZIP: String(data.zip ?? "").slice(0, 20),
              "Dish Model": String(data.dishModel ?? "Not sure"),
              Status: ["Request"],
              "Issue Summary": String(data.issueSummary).slice(0, 5000),
              "Additional Systems": String(data.additionalSystems ?? "").slice(0, 1000),
              "SMS Consent": data.smsConsent === "yes",
              "Date Submitted": new Date().toISOString().slice(0, 10),
            },
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    console.error("Airtable sync failed:", res.status, detail);
    return NextResponse.json({ error: "Airtable sync failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
