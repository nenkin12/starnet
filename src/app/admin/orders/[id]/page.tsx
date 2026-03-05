"use client";

import { useState, useEffect, use } from "react";
import { OrderDetail } from "@/components/admin/OrderDetail";
import type { Order } from "@/types/store";

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then(setOrder)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading order...</p>
      </div>
    );
  }

  return <OrderDetail initialOrder={order} />;
}
