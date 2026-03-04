import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demoProducts } from "@/data/demoProducts";
import { generateProductSchema } from "@/lib/product-schema";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import { ProductDetailClient } from "@/components/store/ProductDetailClient";
import { ProductCard } from "@/components/store/ProductCard";
import { CartButton } from "@/components/store/CartButton";
import { CartDrawer } from "@/components/store/CartDrawer";
import type { Product } from "@/types/store";
import Link from "next/link";

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

export async function generateStaticParams() {
  return demoProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Product Not Found | Starnet Pros" };
  }

  const title =
    product.meta_title || `${product.name} | Starnet Pros`;
  const description =
    product.meta_description || product.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.starnetpros.com/store/${product.slug}`,
      siteName: "Starnet Pros",
      type: "website",
      ...(product.image_url && {
        images: [{ url: product.image_url, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(product.image_url && { images: [product.image_url] }),
    },
    alternates: {
      canonical: `https://www.starnetpros.com/store/${product.slug}`,
    },
  };
}

const categoryLabels: Record<string, string> = {
  mounts: "Mounts",
  cables: "Cables",
  accessories: "Accessories",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Store", url: "/store" },
    {
      name: categoryLabels[product.category] || product.category,
      url: `/store#${product.category}`,
    },
    { name: product.name, url: `/store/${product.slug}` },
  ]);

  const productSchema = generateProductSchema(product);

  return (
    <>
      <SchemaMarkup schema={[productSchema, breadcrumbSchema]} />

      {/* Breadcrumbs */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/store"
              className="hover:text-blue-600 transition-colors"
            >
              Store
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Product Detail */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-300 text-6xl">📦</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
              {categoryLabels[product.category] || product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-gray-900 mb-6">
              ${(product.price_cents / 100).toFixed(2)}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Add to Cart */}
            <ProductDetailClient product={product} />

            {/* Shipping Info */}
            <div className="mt-8 border-t pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">✓</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Free shipping on orders over $150
                  </p>
                  <p className="text-xs text-gray-500">
                    Flat $9.99 shipping on all other orders
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">✓</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Pro-grade equipment
                  </p>
                  <p className="text-xs text-gray-500">
                    Same parts our installers use in the field
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">✓</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CartButton />
      <CartDrawer />
    </>
  );
}
