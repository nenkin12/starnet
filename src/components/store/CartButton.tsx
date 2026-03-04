"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export function CartButton() {
  const openCart = useCartStore((s) => s.openCart);
  const items = useCartStore((s) => s.items);
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-white shadow-lg hover:bg-blue-500 transition-all shadow-blue-600/30"
      aria-label={`Open cart (${itemCount} items)`}
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="text-sm font-semibold">{itemCount}</span>
    </button>
  );
}
