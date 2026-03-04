"use client";

import { useState } from "react";
import { OrderStatusBadge } from "./OrderStatusBadge";
import type { Order, OrderStatus } from "@/types/store";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Truck,
  ExternalLink,
  Tag,
} from "lucide-react";
import Link from "next/link";

const STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export function OrderDetail({ initialOrder }: { initialOrder: Order }) {
  const [order, setOrder] = useState(initialOrder);
  const [saving, setSaving] = useState(false);
  const [labelLoading, setLabelLoading] = useState(false);
  const [labelUrl, setLabelUrl] = useState<string | null>(null);
  const [packageDims, setPackageDims] = useState({
    weight_oz: 32,
    length_in: 12,
    width_in: 10,
    height_in: 6,
  });

  const orderId = order.id.slice(-8).toUpperCase();
  const address = order.shipping_address;

  async function updateStatus(newStatus: OrderStatus) {
    setSaving(true);
    const res = await fetch(`/api/admin/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrder(updated);
    }
    setSaving(false);
  }

  async function generateLabel() {
    setLabelLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/label`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageDims),
      });
      const data = await res.json();
      if (data.labelUrl) {
        setLabelUrl(data.labelUrl);
        setOrder((o) => ({
          ...o,
          status: "shipped" as OrderStatus,
          tracking_number: data.trackingNumber,
          tracking_url: data.trackingUrl,
        }));
      } else {
        alert(data.error || "Failed to generate label");
      }
    } catch {
      alert("Network error generating label");
    } finally {
      setLabelLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Order #{orderId}
          </h1>
          <p className="text-sm text-gray-500">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: order details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Items</h2>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${(item.price_cents / 100).toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    $
                    {((item.price_cents * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${(order.subtotal_cents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>
                  {order.shipping_cents === 0
                    ? "FREE"
                    : `$${(order.shipping_cents / 100).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${(order.total_cents / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping label generation */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="h-4 w-4" /> Shipping Label
            </h2>
            {order.tracking_number ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {order.tracking_number}
                  </span>
                  {order.tracking_url && (
                    <a
                      href={order.tracking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                {labelUrl && (
                  <a
                    href={labelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Label
                  </a>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Weight (oz)
                    </label>
                    <input
                      type="number"
                      value={packageDims.weight_oz}
                      onChange={(e) =>
                        setPackageDims((d) => ({
                          ...d,
                          weight_oz: Number(e.target.value),
                        }))
                      }
                      className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Length (in)
                    </label>
                    <input
                      type="number"
                      value={packageDims.length_in}
                      onChange={(e) =>
                        setPackageDims((d) => ({
                          ...d,
                          length_in: Number(e.target.value),
                        }))
                      }
                      className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Width (in)
                    </label>
                    <input
                      type="number"
                      value={packageDims.width_in}
                      onChange={(e) =>
                        setPackageDims((d) => ({
                          ...d,
                          width_in: Number(e.target.value),
                        }))
                      }
                      className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Height (in)
                    </label>
                    <input
                      type="number"
                      value={packageDims.height_in}
                      onChange={(e) =>
                        setPackageDims((d) => ({
                          ...d,
                          height_in: Number(e.target.value),
                        }))
                      }
                      className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  onClick={generateLabel}
                  disabled={labelLoading}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {labelLoading
                    ? "Generating..."
                    : "Generate Label & Ship"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Status update */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              Update Status
            </h2>
            <select
              value={order.status}
              onChange={(e) => updateStatus(e.target.value as OrderStatus)}
              disabled={saving}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-60"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Customer */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              Customer
            </h2>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                {order.customer_name}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-3.5 w-3.5" />
                {order.customer_email}
              </div>
            </div>
          </div>

          {/* Shipping address */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Shipping Address
            </h2>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p>{order.customer_name}</p>
              <p>{address.line1}</p>
              {address.line2 && <p>{address.line2}</p>}
              <p>
                {address.city}, {address.state} {address.postal_code}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
