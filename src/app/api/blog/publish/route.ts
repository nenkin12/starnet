import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { blogPosts } from "@/data/blogPosts";

function authorize(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  return auth.slice(7) === process.env.BLOG_API_KEY;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/** POST — publish a new blog post */
export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, content, keywords } = body as {
    title?: string;
    content?: string;
    keywords?: string[];
  };

  if (!title || !content || !keywords || !Array.isArray(keywords)) {
    return NextResponse.json(
      { error: "title, content, and keywords (array) are required" },
      { status: 400 }
    );
  }

  const slug = slugify(title as string);

  // Check for duplicate slug in static posts
  if (blogPosts.some((p) => p.slug === slug)) {
    return NextResponse.json(
      { error: "A static post with this slug already exists", slug },
      { status: 409 }
    );
  }

  // Check for duplicate slug in Firestore
  const existing = await db
    .collection("blog_posts")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (!existing.empty) {
    return NextResponse.json(
      { error: "A dynamic post with this slug already exists", slug },
      { status: 409 }
    );
  }

  const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const contentStr = content as string;
  const titleStr = title as string;
  const keywordsArr = keywords as string[];

  const excerpt =
    (body.excerpt as string) ||
    contentStr
      .replace(/[#*\[\]()_`>|-]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160) + "...";

  const metaTitle =
    (body.metaTitle as string) || `${titleStr} | Starnet Pros`;

  const metaDescription =
    (body.metaDescription as string) ||
    `${titleStr}. ${keywordsArr.slice(0, 3).join(", ")}. Expert insights from Starnet Pros.`;

  const post = {
    slug,
    title: titleStr,
    content: contentStr,
    keywords: keywordsArr,
    excerpt,
    metaTitle,
    metaDescription,
    date: now,
    author: (body.author as string) || "Starnet Pros",
    readTime: estimateReadTime(contentStr),
    image: (body.image as string) || null,
    imageAlt: (body.imageAlt as string) || null,
    createdAt: new Date().toISOString(),
  };

  await db.collection("blog_posts").doc(slug).set(post);

  return NextResponse.json(
    {
      ok: true,
      slug,
      url: `https://www.starnetpros.com/blog/${slug}`,
    },
    { status: 201 }
  );
}

/** GET — list all dynamic posts (title, slug, date) */
export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await db
    .collection("blog_posts")
    .orderBy("date", "desc")
    .get();

  const posts = snapshot.docs.map((doc) => {
    const d = doc.data();
    return {
      slug: d.slug,
      title: d.title,
      date: d.date,
      author: d.author,
      readTime: d.readTime,
    };
  });

  return NextResponse.json({ posts, count: posts.length });
}

/** DELETE — remove a dynamic post by slug */
export async function DELETE(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = (await req.json()) as { slug?: string };
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  // Prevent deleting static posts
  if (blogPosts.some((p) => p.slug === slug)) {
    return NextResponse.json(
      { error: "Cannot delete a static post via API" },
      { status: 403 }
    );
  }

  const docRef = db.collection("blog_posts").doc(slug);
  const doc = await docRef.get();

  if (!doc.exists) {
    return NextResponse.json(
      { error: "Post not found", slug },
      { status: 404 }
    );
  }

  await docRef.delete();

  return NextResponse.json({ ok: true, deleted: slug });
}
