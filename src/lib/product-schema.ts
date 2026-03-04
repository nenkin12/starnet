import type { Product } from "@/types/store";

const SITE_URL = "https://www.starnetpros.com";

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.meta_description || product.description,
    image: product.image_url || undefined,
    brand: {
      "@type": "Brand",
      name: "Starlink",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/store/${product.slug}`,
      priceCurrency: "USD",
      price: (product.price_cents / 100).toFixed(2),
      availability:
        product.inventory_count > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Starnet Pros",
      },
    },
    category: product.category,
  };
}
