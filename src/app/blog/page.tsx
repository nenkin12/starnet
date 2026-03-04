import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/BlogCard";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/data/blogPosts";

export const metadata: Metadata = createMetadata({
  title: "Starlink Installation Blog | Tips & Guides | Starnet Pros",
  description:
    "Expert Starlink installation tips, speed test results, plan comparisons, and guides from the professional installers at Starnet Pros.",
  path: "/blog",
});

export default function BlogPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <SchemaMarkup schema={schema} />

      <Hero
        title="Starlink Installation Blog"
        subtitle="Expert tips, real speed results, and practical guides to help you get the most from Starlink."
        backgroundImage="/images/hero-blog.jpg"
        ctaText="Book Installation"
        ctaHref="/book"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Blog" }]} />
      </div>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                date={post.date}
                readTime={post.readTime}
                image={post.image}
                imageAlt={post.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
