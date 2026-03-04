"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Product, ProductCategory } from "@/types/store";

export function AddProductForm({
  onAdd,
}: {
  onAdd: (product: Product) => void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "mounts" as ProductCategory,
    inventory_count: "0",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price_cents: Math.round(parseFloat(form.price) * 100),
        category: form.category,
        inventory_count: parseInt(form.inventory_count),
        active: true,
      }),
    });

    if (res.ok) {
      const product = await res.json();
      onAdd(product);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "mounts",
        inventory_count: "0",
      });
      setOpen(false);
    }
    setSaving(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Product
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-blue-200 bg-blue-50 p-6 space-y-4"
    >
      <h3 className="text-sm font-semibold text-gray-900">New Product</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-gray-600">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            placeholder="Product name"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Price ($)</label>
          <input
            required
            type="number"
            step="0.01"
            min="0.01"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Category</label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                category: e.target.value as ProductCategory,
              }))
            }
            className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="mounts">Mounts</option>
            <option value="cables">Cables</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">
            Inventory
          </label>
          <input
            type="number"
            min="0"
            value={form.inventory_count}
            onChange={(e) =>
              setForm((f) => ({ ...f, inventory_count: e.target.value }))
            }
            className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-600">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          rows={2}
          className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          placeholder="Product description"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add Product"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
