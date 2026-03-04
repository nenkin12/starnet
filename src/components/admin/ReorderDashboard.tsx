"use client";

import type { Product } from "@/types/store";
import { AlertTriangle, ExternalLink, Package } from "lucide-react";

const LOW_STOCK_THRESHOLD = 10;

export function ReorderDashboard({ products }: { products: Product[] }) {
  const activeProducts = products.filter((p) => p.active);
  const lowStock = activeProducts.filter(
    (p) => p.inventory_count < LOW_STOCK_THRESHOLD
  );
  const outOfStock = activeProducts.filter((p) => p.inventory_count === 0);
  const adequateStock = activeProducts.filter(
    (p) => p.inventory_count >= LOW_STOCK_THRESHOLD
  );

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-semibold text-red-600 mb-1">
            Out of Stock
          </p>
          <p className="text-3xl font-bold text-red-700">{outOfStock.length}</p>
        </div>
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <p className="text-sm font-semibold text-yellow-600 mb-1">
            Low Stock (&lt;10)
          </p>
          <p className="text-3xl font-bold text-yellow-700">
            {lowStock.length}
          </p>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <p className="text-sm font-semibold text-green-600 mb-1">In Stock</p>
          <p className="text-3xl font-bold text-green-700">
            {adequateStock.length}
          </p>
        </div>
      </div>

      {/* Low stock items needing reorder */}
      {lowStock.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            {lowStock.length} product{lowStock.length !== 1 ? "s" : ""} low on
            stock
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStock.map((product) => (
              <div
                key={product.id}
                className={`rounded-2xl border p-5 ${
                  product.inventory_count === 0
                    ? "border-red-200 bg-red-50"
                    : "border-yellow-200 bg-yellow-50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-900 leading-snug flex-1">
                    {product.name}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ml-2 flex-shrink-0 ${
                      product.inventory_count === 0
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {product.inventory_count === 0 ? "OUT" : "LOW"}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {product.inventory_count}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    units
                  </span>
                </p>
                <p className="text-xs text-gray-500 mb-3 capitalize">
                  {product.category}
                </p>
                {product.supplier_url ? (
                  <a
                    href={product.supplier_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Order More
                  </a>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    No supplier URL set
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full inventory table */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-gray-400" />
          Full Inventory
        </h2>
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Product", "Category", "Stock", "Status", "Supplier"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeProducts
                .sort((a, b) => a.inventory_count - b.inventory_count)
                .map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500 capitalize">
                      {product.category}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        product.inventory_count === 0
                          ? "text-red-600"
                          : product.inventory_count < 10
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {product.inventory_count}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          product.inventory_count === 0
                            ? "bg-red-100 text-red-700"
                            : product.inventory_count < 10
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.inventory_count === 0
                          ? "Out of Stock"
                          : product.inventory_count < 10
                            ? "Low Stock"
                            : "In Stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {product.supplier_url ? (
                        <a
                          href={product.supplier_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-500 text-xs"
                        >
                          Order More{" "}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
