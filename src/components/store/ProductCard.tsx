"use client";

import { ShoppingCart, Package } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types/store";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const inCart = cartItems.find((i) => i.product_id === product.id);

  const outOfStock = product.inventory_count === 0;
  const priceDollars = (product.price_cents / 100).toFixed(2);

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all flex flex-col overflow-hidden group">
      {/* Image */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-gray-200" />
          </div>
        )}
        {outOfStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1 capitalize">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 flex-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-gray-900">${priceDollars}</span>
          <button
            onClick={() =>
              addItem({
                product_id: product.id,
                name: product.name,
                price_cents: product.price_cents,
                image_url: product.image_url,
                slug: product.slug,
              })
            }
            disabled={outOfStock}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              outOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : inCart
                  ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
