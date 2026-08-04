import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    const ua = req.headers.get("user-agent") || "";

    // Skip bots
    if (/bot|crawl|spider|slurp|googlebot|bingbot/i.test(ua)) {
      return NextResponse.json({ ok: true });
    }

    const { db } = await import("@/lib/firebase");

    // --- Blog Engagement Event ---
    if (type === "blog_engagement") {
      const { slug, path, session_id, time_on_page, max_scroll, conversions } =
        body;

      if (!slug || typeof slug !== "string") {
        return NextResponse.json({ ok: false }, { status: 400 });
      }

      // Cap time at 30 minutes server-side
      const cappedTime = Math.min(Number(time_on_page) || 0, 1800);

      await db.collection("blog_engagement").add({
        slug,
        path: path || `/blog/${slug}`,
        session_id: session_id || null,
        time_on_page: cappedTime,
        max_scroll: Math.min(Math.max(Number(max_scroll) || 0, 0), 100),
        conversions: Array.isArray(conversions) ? conversions.slice(0, 10) : [],
        user_agent: ua.slice(0, 300),
        device: /mobile|android|iphone|ipad/i.test(ua) ? "mobile" : "desktop",
        created_at: FieldValue.serverTimestamp(),
      });

      return NextResponse.json({ ok: true });
    }

    // --- Standard Page View ---
    const { path, referrer, session_id } = body;

    if (!path || typeof path !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Skip admin pages
    if (path.startsWith("/admin")) {
      return NextResponse.json({ ok: true });
    }

    const isMobile = /mobile|android|iphone|ipad/i.test(ua);

    await db.collection("page_views").add({
      path,
      referrer: referrer || null,
      session_id: session_id || null,
      user_agent: ua.slice(0, 300),
      device: isMobile ? "mobile" : "desktop",
      created_at: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
