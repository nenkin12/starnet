import type { OrderStatus } from "@/types/store";

const statusConfig: Record<
  OrderStatus,
  { label: string; bg: string; text: string }
> = {
  pending: { label: "Pending", bg: "bg-yellow-100", text: "text-yellow-700" },
  processing: {
    label: "Processing",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  shipped: { label: "Shipped", bg: "bg-purple-100", text: "text-purple-700" },
  delivered: {
    label: "Delivered",
    bg: "bg-green-100",
    text: "text-green-700",
  },
  cancelled: { label: "Cancelled", bg: "bg-red-100", text: "text-red-700" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
