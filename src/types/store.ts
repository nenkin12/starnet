export type ProductCategory = "mounts" | "cables" | "accessories";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_cents: number;
  category: ProductCategory;
  image_url: string | null;
  inventory_count: number;
  supplier_url: string | null;
  active: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product_id: string;
  name: string;
  price_cents: number;
  quantity: number;
  image_url: string | null;
  slug: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price_cents: number;
  quantity: number;
  image_url: string | null;
}

export interface Order {
  id: string;
  stripe_session_id: string;
  customer_email: string;
  customer_name: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  status: OrderStatus;
  tracking_number: string | null;
  tracking_url: string | null;
  easypost_shipment_id: string | null;
  created_at: string;
  updated_at: string;
}
