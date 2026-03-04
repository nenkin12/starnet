"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { calculateShipping } from "@/lib/shipping";
import { useState } from "react";
import { EmptyCart } from "./EmptyCart";

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotalCents = items.reduce(
    (s, i) => s + i.price_cents * i.quantity,
    0
  );
  const shippingCents = calculateShipping(subtotalCents);
  const totalCents = subtotalCents + shippingCents;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  async function handleCheckout() {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Cart{" "}
            {itemCount > 0 && (
              <span className="text-blue-600">({itemCount})</span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <EmptyCart onClose={closeCart} />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex gap-4 py-3 border-b border-gray-50"
                >
                  <div className="w-16 h-16 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-gray-200" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${(item.price_cents / 100).toFixed(2)} ea.
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity - 1)
                        }
                        className="rounded-md border border-gray-200 p-0.5 hover:border-gray-400 transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity + 1)
                        }
                        className="rounded-md border border-gray-200 p-0.5 hover:border-gray-400 transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 self-start">
                    ${((item.price_cents * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals + checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${(subtotalCents / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>
                {shippingCents === 0
                  ? "FREE"
                  : `$${(shippingCents / 100).toFixed(2)}`}
              </span>
            </div>
            {shippingCents > 0 && (
              <p className="text-xs text-blue-600">
                Free shipping on orders over $150
              </p>
            )}
            <div className="flex justify-between text-base font-semibold text-gray-900 pt-1 border-t border-gray-100">
              <span>Total</span>
              <span>${(totalCents / 100).toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full rounded-lg bg-blue-600 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? "Redirecting to Stripe..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
