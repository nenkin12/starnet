import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

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
    "name",
    "description",
    "price_cents",
    "category",
    "image_url",
    "inventory_count",
    "supplier_url",
    "active",
  ];
  const update: Record<string, unknown> = Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed.includes(k))
  );

  // If name changed, update slug too
  if (update.name) {
    update.slug = (update.name as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  update.updated_at = FieldValue.serverTimestamp();

  const docRef = db.collection("products").doc(id);
  await docRef.update(update);
  const doc = await docRef.get();
  if (!doc.exists)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.collection("products").doc(id).delete();
  return NextResponse.json({ ok: true });
}
