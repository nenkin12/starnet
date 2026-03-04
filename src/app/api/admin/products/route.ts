import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snapshot = await db
    .collection("products")
    .orderBy("category")
    .orderBy("name")
    .get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slug = body.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const docRef = await db.collection("products").add({
    ...body,
    slug,
    created_at: FieldValue.serverTimestamp(),
    updated_at: FieldValue.serverTimestamp(),
  });
  const doc = await docRef.get();
  return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 201 });
}
