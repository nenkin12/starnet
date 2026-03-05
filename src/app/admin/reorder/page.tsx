"use client";

import { useState, useEffect } from "react";
import { ReorderDashboard } from "@/components/admin/ReorderDashboard";
import type { Product } from "@/types/store";

export default function AdminReorderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading inventory...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Reorder Dashboard
      </h1>
      <ReorderDashboard products={products} />
    </div>
  );
}
