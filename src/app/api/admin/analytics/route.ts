import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

export async function GET() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const todayTs = Timestamp.fromDate(today);
    const thirtyDaysTs = Timestamp.fromDate(thirtyDaysAgo);
    const sevenDaysTs = Timestamp.fromDate(sevenDaysAgo);

    // ---- ORDER ANALYTICS ----
    const ordersSnap = await db.collection("orders").get();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orders: any[] = ordersSnap.docs.map((doc) => {
      const d = doc.data();
      return {
        ...d,
        id: doc.id,
        created_at: d.created_at?.toDate?.() || new Date(d.created_at),
      };
    });

    // All-time stats
    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.total_cents || 0),
      0
    );
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Last 30 days stats
    const recentOrders = orders.filter((o) => o.created_at >= thirtyDaysAgo);
    const recentRevenue = recentOrders.reduce(
      (sum, o) => sum + (o.total_cents || 0),
      0
    );

    // Daily revenue chart (last 30 days)
    const dailyMap: Record<string, { revenue: number; orders: number }> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - (29 - i));
      const key = d.toISOString().split("T")[0];
      dailyMap[key] = { revenue: 0, orders: 0 };
    }
    for (const order of recentOrders) {
      const key = order.created_at.toISOString().split("T")[0];
      if (dailyMap[key]) {
        dailyMap[key].revenue += order.total_cents || 0;
        dailyMap[key].orders += 1;
      }
    }
    const dailyChart = Object.entries(dailyMap).map(([date, data]) => ({
      date,
      ...data,
    }));

    // Status distribution
    const statusCounts: Record<string, number> = {};
    for (const order of orders) {
      const s = order.status || "unknown";
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    }

    // Top products
    const productMap: Record<
      string,
      { name: string; quantity: number; revenue: number }
    > = {};
    for (const order of orders) {
      for (const item of order.items || []) {
        const key = item.product_id || item.name;
        if (!productMap[key]) {
          productMap[key] = { name: item.name, quantity: 0, revenue: 0 };
        }
        productMap[key].quantity += item.quantity || 0;
        productMap[key].revenue += (item.price_cents || 0) * (item.quantity || 0);
      }
    }
    const topProducts = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Recent orders (last 5)
    const recentOrdersList = orders
      .sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime()
      )
      .slice(0, 5)
      .map((o) => ({
        id: o.id,
        customer_name: o.customer_name,
        customer_email: o.customer_email,
        total_cents: o.total_cents,
        status: o.status,
        created_at: o.created_at.toISOString(),
      }));

    // ---- PAGE VIEW ANALYTICS ----
    let viewsToday = 0;
    let views7d = 0;
    let views30d = 0;
    const pageCounts: Record<string, number> = {};
    const referrerCounts: Record<string, number> = {};
    let mobileCount = 0;
    let desktopCount = 0;

    try {
      const viewsSnap = await db
        .collection("page_views")
        .where("created_at", ">=", thirtyDaysTs)
        .get();

      for (const doc of viewsSnap.docs) {
        const d = doc.data();
        const createdAt = d.created_at?.toDate?.();
        if (!createdAt) continue;

        views30d++;
        if (createdAt >= sevenDaysAgo) views7d++;
        if (createdAt >= today) viewsToday++;

        // Top pages
        const path = d.path || "/";
        pageCounts[path] = (pageCounts[path] || 0) + 1;

        // Referrers
        if (d.referrer) {
          try {
            const host = new URL(d.referrer).hostname;
            if (host && !host.includes("starnetpros.com")) {
              referrerCounts[host] = (referrerCounts[host] || 0) + 1;
            }
          } catch {
            // Invalid URL, skip
          }
        }

        // Device
        if (d.device === "mobile") mobileCount++;
        else desktopCount++;
      }
    } catch {
      // page_views collection might not exist yet
    }

    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    const topReferrers = Object.entries(referrerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }));

    return NextResponse.json({
      orders: {
        totalRevenue,
        totalOrders,
        avgOrderValue: Math.round(avgOrderValue),
        recentRevenue,
        recentOrders: recentOrders.length,
        dailyChart,
        statusCounts,
        topProducts,
        recentOrdersList,
      },
      traffic: {
        viewsToday,
        views7d,
        views30d,
        topPages,
        topReferrers,
        devices: { mobile: mobileCount, desktop: desktopCount },
      },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json(
      { error: "Failed to load analytics" },
      { status: 500 }
    );
  }
}
