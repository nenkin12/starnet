"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-12">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-2">
          Thank you for your purchase. You&apos;ll receive a confirmation email
          shortly.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          We&apos;ll send tracking info as soon as your order ships.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/store"
            className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
