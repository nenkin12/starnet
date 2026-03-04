"use client";

import { useState } from "react";
import type { Product, ProductCategory } from "@/types/store";
import { ProductCard } from "./ProductCard";

const CATEGORIES: { label: string; value: "all" | ProductCategory }[] = [
  { label: "All", value: "all" },
  { label: "Mounts", value: "mounts" },
  { label: "Cables", value: "cables" },
  { label: "Accessories", value: "accessories" },
];

export function ProductGrid({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<
    "all" | ProductCategory
  >("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
              activeCategory === cat.value
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-16">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
