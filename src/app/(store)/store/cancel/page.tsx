"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-12">
        <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <XCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Checkout Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          Your cart items are still saved. Come back when you&apos;re ready!
        </p>
        <Link
          href="/store"
          className="rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Back to Store
        </Link>
      </div>
    </section>
  );
}
