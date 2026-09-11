import { db } from "@/lib/firebase";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

export type { BlogPost };

/** Fetch all dynamic posts from Firestore blog_posts collection */
async function getDynamicPosts(): Promise<BlogPost[]> {
  const snapshot = await db
    .collection("blog_posts")
    .orderBy("date", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      slug: data.slug,
      title: data.title,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      excerpt: data.excerpt,
      date: data.date,
      author: data.author,
      readTime: data.readTime,
      content: data.content,
      image: data.image || undefined,
      imageAlt: data.imageAlt || undefined,
    } as BlogPost;
  });
}

/** Get all posts (static + dynamic), sorted by date descending */
export async function getAllPosts(): Promise<BlogPost[]> {
  const dynamicPosts = await getDynamicPosts();
  const allPosts = [...blogPosts, ...dynamicPosts];
  allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return allPosts;
}

/** Get a single post by slug — checks static first, then Firestore */
export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  // Check static posts first (fast, no network call)
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) return staticPost;

  // Fall back to Firestore
  const snapshot = await db
    .collection("blog_posts")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return undefined;

  const data = snapshot.docs[0].data();
  return {
    slug: data.slug,
    title: data.title,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    excerpt: data.excerpt,
    date: data.date,
    author: data.author,
    readTime: data.readTime,
    content: data.content,
    image: data.image || undefined,
    imageAlt: data.imageAlt || undefined,
  } as BlogPost;
}

/** Get all slugs (static + dynamic) */
export async function getAllSlugs(): Promise<string[]> {
  const staticSlugs = blogPosts.map((p) => p.slug);
  const snapshot = await db
    .collection("blog_posts")
    .select("slug")
    .get();
  const dynamicSlugs = snapshot.docs.map((doc) => doc.data().slug as string);
  return [...staticSlugs, ...dynamicSlugs];
}
