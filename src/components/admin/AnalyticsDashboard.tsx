"use client";

import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Eye,
  Monitor,
  Smartphone,
} from "lucide-react";
import { OrderStatusBadge } from "./OrderStatusBadge";
import type { OrderStatus } from "@/types/store";
import Link from "next/link";

interface AnalyticsData {
  orders: {
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
    recentRevenue: number;
    recentOrders: number;
    dailyChart: { date: string; revenue: number; orders: number }[];
    statusCounts: Record<string, number>;
    topProducts: { name: string; quantity: number; revenue: number }[];
    recentOrdersList: {
      id: string;
      customer_name: string;
      customer_email: string;
      total_cents: number;
      status: string;
      created_at: string;
    }[];
  };
  traffic: {
    viewsToday: number;
    views7d: number;
    views30d: number;
    topPages: { path: string; count: number }[];
    topReferrers: { referrer: string; count: number }[];
    devices: { mobile: number; desktop: number };
  };
}

function fmt(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`rounded-lg p-2 ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-400",
  processing: "bg-blue-400",
  shipped: "bg-purple-400",
  delivered: "bg-green-400",
  cancelled: "bg-red-400",
};

export function AnalyticsDashboard({ data }: { data: AnalyticsData }) {
  const { orders, traffic } = data;
  const maxDailyRevenue = Math.max(
    ...orders.dailyChart.map((d) => d.revenue),
    1
  );
  const totalDevices = traffic.devices.mobile + traffic.devices.desktop;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={fmt(orders.totalRevenue)}
          sub={`${fmt(orders.recentRevenue)} last 30 days`}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          label="Total Orders"
          value={String(orders.totalOrders)}
          sub={`${orders.recentOrders} last 30 days`}
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <StatCard
          label="Avg Order Value"
          value={fmt(orders.avgOrderValue)}
          icon={TrendingUp}
          color="bg-purple-500"
        />
        <StatCard
          label="Page Views"
          value={String(traffic.views30d)}
          sub={`${traffic.viewsToday} today · ${traffic.views7d} this week`}
          icon={Eye}
          color="bg-orange-500"
        />
      </div>

      {/* Revenue Chart (30 days) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Revenue — Last 30 Days
        </h2>
        <div className="flex items-end gap-[3px] h-40">
          {orders.dailyChart.map((day) => {
            const height =
              maxDailyRevenue > 0
                ? Math.max((day.revenue / maxDailyRevenue) * 100, 2)
                : 2;
            return (
              <div
                key={day.date}
                className="flex-1 group relative"
                title={`${day.date}: ${fmt(day.revenue)} (${day.orders} orders)`}
              >
                <div
                  className="bg-blue-500 hover:bg-blue-600 rounded-t transition-colors w-full"
                  style={{ height: `${height}%` }}
                />
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10">
                  <p className="font-semibold">{fmt(day.revenue)}</p>
                  <p className="text-gray-300">
                    {day.orders} order{day.orders !== 1 ? "s" : ""} ·{" "}
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>
            {new Date(orders.dailyChart[0]?.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span>Today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status Distribution */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Order Status
          </h2>
          <div className="space-y-3">
            {Object.entries(orders.statusCounts).map(([status, count]) => {
              const pct =
                orders.totalOrders > 0
                  ? Math.round((count / orders.totalOrders) * 100)
                  : 0;
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className="w-24">
                    <OrderStatusBadge status={status as OrderStatus} />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${STATUS_COLORS[status] || "bg-gray-400"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Devices (Last 30 Days)
          </h2>
          {totalDevices === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">
              No traffic data yet — views will appear as visitors browse the
              site.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Monitor className="h-4 w-4" />
                  Desktop
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${Math.round((traffic.devices.desktop / totalDevices) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 w-16 text-right">
                  {traffic.devices.desktop} (
                  {Math.round((traffic.devices.desktop / totalDevices) * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{
                      width: `${Math.round((traffic.devices.mobile / totalDevices) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 w-16 text-right">
                  {traffic.devices.mobile} (
                  {Math.round((traffic.devices.mobile / totalDevices) * 100)}%)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Top Products
          </h2>
          {orders.topProducts.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              No sales data yet
            </p>
          ) : (
            <div className="space-y-3">
              {orders.topProducts.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {p.quantity} sold
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 ml-4">
                    {fmt(p.revenue)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Pages */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Top Pages (Last 30 Days)
          </h2>
          {traffic.topPages.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              No page view data yet
            </p>
          ) : (
            <div className="space-y-3">
              {traffic.topPages.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <p className="text-sm text-gray-700 font-mono truncate flex-1">
                    {p.path}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 ml-4">
                    {p.count}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Referrers */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Traffic Sources (Last 30 Days)
          </h2>
          {traffic.topReferrers.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              No referrer data yet — sources appear when visitors come from
              external sites
            </p>
          ) : (
            <div className="space-y-3">
              {traffic.topReferrers.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <p className="text-sm text-gray-700 truncate flex-1">
                    {r.referrer}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 ml-4">
                    {r.count}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Recent Orders
          </h2>
          {orders.recentOrdersList.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              No orders yet
            </p>
          ) : (
            <div className="space-y-3">
              {orders.recentOrdersList.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      #{o.id.slice(-8).toUpperCase()}
                    </Link>
                    <p className="text-xs text-gray-500 truncate">
                      {o.customer_name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <OrderStatusBadge status={o.status as OrderStatus} />
                    <p className="text-sm font-semibold text-gray-900">
                      {fmt(o.total_cents)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
