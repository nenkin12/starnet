import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 25;

  let query: FirebaseFirestore.Query = db
    .collection("orders")
    .orderBy("created_at", "desc");

  if (status && status !== "all") {
    query = query.where("status", "==", status);
  }

  // Get all matching docs for count, then paginate
  const countSnap = await query.count().get();
  const total = countSnap.data().count;

  const snapshot = await query
    .offset((page - 1) * limit)
    .limit(limit)
    .get();

  let orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Firestore doesn't support ilike — filter in memory for admin search
  if (search) {
    const term = search.toLowerCase();
    orders = orders.filter((o) => {
      const email = ((o as Record<string, unknown>).customer_email as string || "").toLowerCase();
      const name = ((o as Record<string, unknown>).customer_name as string || "").toLowerCase();
      return email.includes(term) || name.includes(term);
    });
  }

  return NextResponse.json({ orders, total });
}
