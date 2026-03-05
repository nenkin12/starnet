import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const { path, referrer } = await req.json();

    if (!path || typeof path !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Skip admin pages
    if (path.startsWith("/admin")) {
      return NextResponse.json({ ok: true });
    }

    const ua = req.headers.get("user-agent") || "";

    // Skip bots
    if (/bot|crawl|spider|slurp|googlebot|bingbot/i.test(ua)) {
      return NextResponse.json({ ok: true });
    }

    const isMobile = /mobile|android|iphone|ipad/i.test(ua);

    const { db } = await import("@/lib/firebase");
    await db.collection("page_views").add({
      path,
      referrer: referrer || null,
      user_agent: ua.slice(0, 300),
      device: isMobile ? "mobile" : "desktop",
      created_at: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
