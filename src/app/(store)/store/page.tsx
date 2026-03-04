import type { Product } from "@/types/store";
import { ProductGrid } from "@/components/store/ProductGrid";
import { CartButton } from "@/components/store/CartButton";
import { CartDrawer } from "@/components/store/CartDrawer";
import { demoProducts } from "@/data/demoProducts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Starlink Accessories & Mounts | Starnet Pros",
  description:
    "Professional-grade Starlink mounts, cables, and accessories. The same equipment our technicians install on every job.",
};

async function getProducts(): Promise<Product[]> {
  if (!process.env.FIREBASE_PROJECT_ID) {
    return demoProducts;
  }
  try {
    const { db } = await import("@/lib/firebase");
    const snapshot = await db
      .collection("products")
      .where("active", "==", true)
      .get();
    if (snapshot.empty) return demoProducts;
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate?.()?.toISOString?.() ?? "",
        updated_at: data.updated_at?.toDate?.()?.toISOString?.() ?? "",
      } as Product;
    });
  } catch {
    return demoProducts;
  }
}

export default async function StorePage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0A1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Shop Starlink Accessories
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Professional-grade mounts, cables, and accessories. The same
            equipment our technicians install on every job.
          </p>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"
      >
        <ProductGrid products={products} />
      </section>

      {/* Shipping info */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Free Shipping Over $150
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Flat $9.99 shipping on all other orders
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Pro-Grade Equipment
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Same parts our installers use in the field
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Secure Checkout
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Powered by Stripe for safe, encrypted payments
              </p>
            </div>
          </div>
        </div>
      </section>

      <CartButton />
      <CartDrawer />
    </>
  );
}
