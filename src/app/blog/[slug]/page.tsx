import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs } from "@/data/blogPosts";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://www.starnetpros.com/blog/${slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      ...(post.image
        ? {
            images: [
              {
                url: `https://www.starnetpros.com${post.image}`,
                alt: post.imageAlt || post.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const schemas = [
    generateArticleSchema(
      post.title,
      post.date,
      post.author,
      post.metaDescription,
      `https://www.starnetpros.com/blog/${slug}`
    ),
    generateBreadcrumbSchema([
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${slug}` },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      <div className="relative bg-[#0A1628] pt-24 pb-16 overflow-hidden">
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-600/5" />
        <div className="absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-blue-600/5" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title },
          ]}
        />
      </div>

      {post.image && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        </div>
      )}

      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600 prose-strong:text-gray-900 prose-li:text-gray-600"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
                .replace(/^\- (.*$)/gm, '<li>$1</li>')
                .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
                .replace(/\|(.+)\|/g, (match) => {
                  return `<div class="overflow-x-auto"><table class="min-w-full text-sm"><tr>${match.split('|').filter(Boolean).map(cell => `<td class="border px-3 py-2">${cell.trim()}</td>`).join('')}</tr></table></div>`;
                })
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(?!<[h|l|u|o|d|t|a|s|e])(.*)/gm, (match) => {
                  if (match.trim() && !match.startsWith('<')) return `<p>${match}</p>`;
                  return match;
                }),
            }}
          />
        </div>
      </article>

      <CTASection
        title="Ready for Professional Installation?"
        subtitle="Get the speeds you deserve with expert Starlink setup from Starnet Pros."
      />
    </>
  );
}
