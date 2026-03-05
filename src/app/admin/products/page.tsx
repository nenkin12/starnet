"use client";

import { useState, useEffect } from "react";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { AddProductForm } from "@/components/admin/AddProductForm";
import type { Product } from "@/types/store";

export default function AdminProductsPage() {
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
        <p className="text-gray-400">Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <AddProductForm
          onAdd={(product) => setProducts((ps) => [product, ...ps])}
        />
      </div>
      <ProductsTable initialProducts={products} />
    </div>
  );
}
