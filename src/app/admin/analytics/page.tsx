"use client";

import { useState, useEffect } from "react";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import {
  BlogAnalyticsDashboard,
  type BlogAnalyticsData,
} from "@/components/admin/BlogAnalyticsDashboard";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState(null);
  const [blogData, setBlogData] = useState<BlogAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/analytics").then((res) => {
        if (!res.ok) throw new Error("Failed to load analytics");
        return res.json();
      }),
      fetch("/api/admin/analytics/blog")
        .then((res) => {
          if (!res.ok) return null;
          return res.json();
        })
        .catch(() => null),
    ])
      .then(([analyticsData, blogAnalytics]) => {
        setData(analyticsData);
        setBlogData(blogAnalytics);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
      {data && <AnalyticsDashboard data={data} />}
      {blogData && <BlogAnalyticsDashboard data={blogData} />}
    </div>
  );
}
