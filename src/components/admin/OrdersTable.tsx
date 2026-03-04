"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { OrderStatusBadge } from "./OrderStatusBadge";
import type { Order, OrderStatus } from "@/types/store";

const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (status !== "all") params.set("status", status);
    if (search) params.set("search", search);

    const res = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    setOrders(data.orders || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, status, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalPages = Math.ceil(total / 25);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setStatus(opt.value);
                setPage(1);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                status === opt.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Order", "Customer", "Total", "Status", "Date"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      #{order.id.slice(-8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.customer_email}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    ${(order.total_cents / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status as OrderStatus} />
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {total} order{total !== 1 ? "s" : ""} total
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
