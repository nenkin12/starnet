import { NextRequest, NextResponse } from "next/server";
import { requireSalesPin } from "@/lib/salesAuth";
import { uploadSalesPhoto } from "@/lib/airtable";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
// Airtable's limit is 5MB; 4MB decoded keeps the base64 body under Netlify's
// ~6MB function payload cap. One photo per request — never batch.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const denied = requireSalesPin(req);
  if (denied) return denied;

  if (!process.env.AIRTABLE_API_KEY) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let body: { recordId?: string; filename?: string; contentType?: string; base64?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { recordId, filename, contentType, base64 } = body;
  if (!recordId?.startsWith("rec") || !base64 || !contentType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
  }
  const decodedSize = Math.floor((base64.length * 3) / 4);
  if (decodedSize > MAX_BYTES) {
    return NextResponse.json({ error: "Photo too large (4MB max)" }, { status: 413 });
  }

  try {
    await uploadSalesPhoto(
      recordId,
      contentType,
      String(filename || "photo.jpg").slice(0, 200),
      base64
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Photo upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 502 });
  }
}
