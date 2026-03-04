import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const doc = await db.collection("orders").doc(id).get();
  if (!doc.exists)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const allowed = [
    "status",
    "tracking_number",
    "tracking_url",
    "easypost_shipment_id",
  ];
  const update: Record<string, unknown> = Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed.includes(k))
  );
  update.updated_at = FieldValue.serverTimestamp();

  const docRef = db.collection("orders").doc(id);
  await docRef.update(update);
  const doc = await docRef.get();
  return NextResponse.json({ id: doc.id, ...doc.data() });
}
