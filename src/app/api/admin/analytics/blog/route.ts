import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

export async function GET() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysTs = Timestamp.fromDate(thirtyDaysAgo);

    // --- Blog page views (from page_views where path starts with /blog/) ---
    let blogViews30d = 0;
    const dailyViewsMap: Record<string, number> = {};
    const postViewCounts: Record<string, number> = {};
    const sessionPaths: Record<string, Set<string>> = {};

    // Initialize daily map
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - (29 - i));
      dailyViewsMap[d.toISOString().split("T")[0]] = 0;
    }

    try {
      const viewsSnap = await db
        .collection("page_views")
        .where("created_at", ">=", thirtyDaysTs)
        .get();

      for (const doc of viewsSnap.docs) {
        const d = doc.data();
        const path: string = d.path || "";
        const createdAt = d.created_at?.toDate?.();
        const sessionId: string = d.session_id || "";

        if (!path.startsWith("/blog/") || path === "/blog") continue;

        blogViews30d++;

        // Track session paths for conversion attribution
        if (sessionId) {
          if (!sessionPaths[sessionId]) sessionPaths[sessionId] = new Set();
          sessionPaths[sessionId].add(path);
        }

        // Daily counts
        if (createdAt) {
          const key = createdAt.toISOString().split("T")[0];
          if (dailyViewsMap[key] !== undefined) dailyViewsMap[key]++;
        }

        // Per-post view counts
        const slug = path.replace("/blog/", "");
        postViewCounts[slug] = (postViewCounts[slug] || 0) + 1;
      }

      // Also check for /book and /contact visits to attribute conversions by session
      for (const doc of viewsSnap.docs) {
        const d = doc.data();
        const path: string = d.path || "";
        const sessionId: string = d.session_id || "";
        if (
          sessionId &&
          (path === "/book" || path === "/contact" || path.startsWith("/book") || path.startsWith("/contact"))
        ) {
          if (!sessionPaths[sessionId]) sessionPaths[sessionId] = new Set();
          sessionPaths[sessionId].add(path);
        }
      }
    } catch {
      // page_views may not exist yet
    }

    // --- Blog engagement data ---
    const postEngagement: Record<
      string,
      { totalTime: number; totalScroll: number; count: number; conversions: number }
    > = {};
    let totalTimeSec = 0;
    let totalScroll = 0;
    let engagementCount = 0;
    let totalConversions = 0;
    const scrollBuckets = [0, 0, 0, 0]; // 0-25, 25-50, 50-75, 75-100

    try {
      const engSnap = await db
        .collection("blog_engagement")
        .where("created_at", ">=", thirtyDaysTs)
        .get();

      for (const doc of engSnap.docs) {
        const d = doc.data();
        const slug: string = d.slug || "";
        const timeOnPage: number = d.time_on_page || 0;
        const maxScrollPct: number = d.max_scroll || 0;
        const convs: string[] = d.conversions || [];

        engagementCount++;
        totalTimeSec += timeOnPage;
        totalScroll += maxScrollPct;
        totalConversions += convs.length;

        // Scroll buckets
        if (maxScrollPct <= 25) scrollBuckets[0]++;
        else if (maxScrollPct <= 50) scrollBuckets[1]++;
        else if (maxScrollPct <= 75) scrollBuckets[2]++;
        else scrollBuckets[3]++;

        // Per-post engagement
        if (slug) {
          if (!postEngagement[slug]) {
            postEngagement[slug] = { totalTime: 0, totalScroll: 0, count: 0, conversions: 0 };
          }
          postEngagement[slug].totalTime += timeOnPage;
          postEngagement[slug].totalScroll += maxScrollPct;
          postEngagement[slug].count++;
          postEngagement[slug].conversions += convs.length;
        }
      }
    } catch {
      // blog_engagement may not exist yet
    }

    // --- Build response ---
    const avgReadTime = engagementCount > 0 ? Math.round(totalTimeSec / engagementCount) : 0;
    const avgScrollDepth = engagementCount > 0 ? Math.round(totalScroll / engagementCount) : 0;

    const dailyChart = Object.entries(dailyViewsMap).map(([date, views]) => ({
      date,
      views,
    }));

    // Most-read posts (by views, enriched with engagement)
    const topPosts = Object.entries(postViewCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([slug, views]) => {
        const eng = postEngagement[slug];
        return {
          slug,
          title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          views,
          avgTime: eng ? Math.round(eng.totalTime / eng.count) : 0,
          avgScroll: eng ? Math.round(eng.totalScroll / eng.count) : 0,
        };
      });

    // Posts driving conversions
    const conversionPosts = Object.entries(postEngagement)
      .filter(([, eng]) => eng.conversions > 0)
      .map(([slug, eng]) => ({
        slug,
        title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        views: postViewCounts[slug] || 0,
        conversions: eng.conversions,
        rate: postViewCounts[slug]
          ? Math.round((eng.conversions / postViewCounts[slug]) * 100)
          : 0,
      }))
      .sort((a, b) => b.conversions - a.conversions)
      .slice(0, 10);

    return NextResponse.json({
      blogViews30d,
      avgReadTime,
      avgScrollDepth,
      totalConversions,
      dailyChart,
      topPosts,
      scrollBuckets,
      conversionPosts,
    });
  } catch (err) {
    console.error("Blog analytics error:", err);
    return NextResponse.json(
      { error: "Failed to load blog analytics" },
      { status: 500 }
    );
  }
}
