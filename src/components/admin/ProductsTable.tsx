"use client";

import { useState, useRef } from "react";
import type { Product, ProductCategory } from "@/types/store";
import { Pencil, Check, X, ExternalLink, Trash2 } from "lucide-react";

function EditableCell({
  value,
  onSave,
  type = "text",
  className = "",
}: {
  value: string | number;
  onSave: (val: string) => void;
  type?: "text" | "number" | "url";
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  function startEdit() {
    setDraft(String(value));
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function save() {
    onSave(draft);
    setEditing(false);
  }

  function cancel() {
    setDraft(String(value));
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          type={type}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          onBlur={save}
          className={`rounded border border-blue-400 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 ${className}`}
        />
        <button
          onClick={save}
          className="text-green-600 hover:text-green-700 flex-shrink-0"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={cancel}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={startEdit}
      className={`group flex items-center gap-1 text-left hover:text-blue-600 transition-colors ${className}`}
    >
      <span className="truncate">{value || "—"}</span>
      <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </button>
  );
}

export function ProductsTable({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [saving, setSaving] = useState<string | null>(null);

  async function updateProduct(
    id: string,
    field: string,
    value: string | number | boolean
  ) {
    setSaving(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts((ps) => ps.map((p) => (p.id === id ? updated : p)));
      }
    } finally {
      setSaving(null);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) setProducts((ps) => ps.filter((p) => p.id !== id));
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {[
              "Name",
              "Category",
              "Price",
              "Inventory",
              "Supplier URL",
              "Active",
              "",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr
              key={product.id}
              className={`hover:bg-gray-50 ${saving === product.id ? "opacity-60" : ""}`}
            >
              <td className="px-4 py-3">
                <EditableCell
                  value={product.name}
                  onSave={(v) => updateProduct(product.id, "name", v)}
                  className="font-medium text-gray-900 max-w-[200px]"
                />
              </td>
              <td className="px-4 py-3">
                <select
                  value={product.category}
                  onChange={(e) =>
                    updateProduct(
                      product.id,
                      "category",
                      e.target.value as ProductCategory
                    )
                  }
                  className="rounded border border-gray-200 px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="mounts">Mounts</option>
                  <option value="cables">Cables</option>
                  <option value="accessories">Accessories</option>
                </select>
              </td>
              <td className="px-4 py-3">
                <EditableCell
                  value={(product.price_cents / 100).toFixed(2)}
                  onSave={(v) =>
                    updateProduct(
                      product.id,
                      "price_cents",
                      Math.round(parseFloat(v) * 100)
                    )
                  }
                  type="number"
                  className="w-20"
                />
              </td>
              <td className="px-4 py-3">
                <EditableCell
                  value={product.inventory_count}
                  onSave={(v) =>
                    updateProduct(
                      product.id,
                      "inventory_count",
                      parseInt(v)
                    )
                  }
                  type="number"
                  className={`w-16 ${product.inventory_count < 10 ? "text-red-600 font-semibold" : ""}`}
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <EditableCell
                    value={product.supplier_url ?? ""}
                    onSave={(v) =>
                      updateProduct(product.id, "supplier_url", v)
                    }
                    type="url"
                    className="max-w-[180px] text-blue-600 text-xs"
                  />
                  {product.supplier_url && (
                    <a
                      href={product.supplier_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 flex-shrink-0"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() =>
                    updateProduct(product.id, "active", !product.active)
                  }
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    product.active
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {product.active ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
