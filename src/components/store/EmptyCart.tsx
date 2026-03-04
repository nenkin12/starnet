"use client";

import { ShoppingBag } from "lucide-react";

export function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShoppingBag className="h-12 w-12 text-gray-200 mb-4" />
      <p className="text-gray-500 text-sm mb-2">Your cart is empty</p>
      <button
        onClick={onClose}
        className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}
