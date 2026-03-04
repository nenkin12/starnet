"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types/store";

export function ProductDetailClient({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const inCart = cartItems.find((i) => i.product_id === product.id);

  const outOfStock = product.inventory_count === 0;

  return (
    <div className="flex flex-col gap-3">
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
        className={`flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-semibold transition-colors w-full ${
          outOfStock
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : inCart
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100 border-2 border-blue-200"
              : "bg-blue-600 text-white hover:bg-blue-500"
        }`}
      >
        <ShoppingCart className="h-5 w-5" />
        {outOfStock
          ? "Out of Stock"
          : inCart
            ? `In Cart (${inCart.quantity}) — Add Another`
            : "Add to Cart"}
      </button>
      {inCart && (
        <p className="text-sm text-gray-500 text-center">
          {inCart.quantity} in your cart
        </p>
      )}
    </div>
  );
}
