"use client";

import {
  BookOpen,
  Clock,
  ArrowDownToLine,
  MousePointerClick,
} from "lucide-react";

export interface BlogAnalyticsData {
  blogViews30d: number;
  avgReadTime: number;
  avgScrollDepth: number;
  totalConversions: number;
  dailyChart: { date: string; views: number }[];
  topPosts: {
    slug: string;
    title: string;
    views: number;
    avgTime: number;
    avgScroll: number;
  }[];
  scrollBuckets: number[];
  conversionPosts: {
    slug: string;
    title: string;
    views: number;
    conversions: number;
    rate: number;
  }[];
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

function fmtTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

const SCROLL_LABELS = ["0-25%", "25-50%", "50-75%", "75-100%"];
const SCROLL_COLORS = ["bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];

export function BlogAnalyticsDashboard({ data }: { data: BlogAnalyticsData }) {
  const maxDailyViews = Math.max(...data.dailyChart.map((d) => d.views), 1);
  const totalScrollEntries = data.scrollBuckets.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Blog Performance
        </h2>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Blog Views"
          value={String(data.blogViews30d)}
          sub="Last 30 days"
          icon={BookOpen}
          color="bg-indigo-500"
        />
        <StatCard
          label="Avg Read Time"
          value={fmtTime(data.avgReadTime)}
          sub="Per visit"
          icon={Clock}
          color="bg-teal-500"
        />
        <StatCard
          label="Avg Scroll Depth"
          value={`${data.avgScrollDepth}%`}
          sub="How far readers scroll"
          icon={ArrowDownToLine}
          color="bg-amber-500"
        />
        <StatCard
          label="Blog Conversions"
          value={String(data.totalConversions)}
          sub="Clicks to book/contact"
          icon={MousePointerClick}
          color="bg-rose-500"
        />
      </div>

      {/* Daily Blog Views Chart */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Daily Blog Views — Last 30 Days
        </h3>
        {data.blogViews30d === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">
            No blog view data yet — views will appear as readers visit blog
            posts.
          </p>
        ) : (
          <>
            <div className="flex items-end gap-[3px] h-40">
              {data.dailyChart.map((day) => {
                const height =
                  maxDailyViews > 0
                    ? Math.max((day.views / maxDailyViews) * 100, 2)
                    : 2;
                return (
                  <div
                    key={day.date}
                    className="flex-1 group relative"
                    title={`${day.date}: ${day.views} views`}
                  >
                    <div
                      className="bg-indigo-500 hover:bg-indigo-600 rounded-t transition-colors w-full"
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10">
                      <p className="font-semibold">{day.views} views</p>
                      <p className="text-gray-300">
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
                {new Date(data.dailyChart[0]?.date).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric" }
                )}
              </span>
              <span>Today</span>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most-Read Posts */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Most-Read Posts
          </h3>
          {data.topPosts.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              No blog data yet
            </p>
          ) : (
            <div className="space-y-3">
              {data.topPosts.map((post) => (
                <div
                  key={post.slug}
                  className="py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 shrink-0">
                      {post.views}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-1 text-xs text-gray-500">
                    <span>{fmtTime(post.avgTime)} avg</span>
                    <span>{post.avgScroll}% scroll</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scroll Depth Distribution */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Scroll Depth Distribution
          </h3>
          {totalScrollEntries === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              No engagement data yet
            </p>
          ) : (
            <div className="space-y-4">
              {data.scrollBuckets.map((count, i) => {
                const pct =
                  totalScrollEntries > 0
                    ? Math.round((count / totalScrollEntries) * 100)
                    : 0;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-16">
                      {SCROLL_LABELS[i]}
                    </span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${SCROLL_COLORS[i]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-16 text-right">
                      {count} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Posts Driving Bookings */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Posts Driving Bookings
        </h3>
        {data.conversionPosts.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">
            No conversion data yet — appears when readers click book/contact
            links from blog posts.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-500">
                    Post
                  </th>
                  <th className="text-right py-2 font-medium text-gray-500 w-20">
                    Views
                  </th>
                  <th className="text-right py-2 font-medium text-gray-500 w-28">
                    Conversions
                  </th>
                  <th className="text-right py-2 font-medium text-gray-500 w-20">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.conversionPosts.map((post) => (
                  <tr
                    key={post.slug}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-2 text-gray-900 font-medium">
                      {post.title}
                    </td>
                    <td className="py-2 text-right text-gray-700">
                      {post.views}
                    </td>
                    <td className="py-2 text-right text-gray-700">
                      {post.conversions}
                    </td>
                    <td className="py-2 text-right font-semibold text-green-600">
                      {post.rate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
