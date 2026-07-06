import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/src/data/posts";
import BlogPostClient from "@/src/components/BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-render all known slugs at build time
export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };

  const siteUrl = "https://portfolio-website-khaki-six-88.vercel.app";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: postUrl },
    openGraph: {
      type: "article",
      url: postUrl,
      title: `${post.title} — Deepak Kandpal`,
      description: post.description,
      images: [{ url: post.coverImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Deepak Kandpal`,
      description: post.description,
      images: [post.coverImage],
    },
    other: {
      "article:author": "Deepak Kandpal",
      "article:published_time": new Date(post.date).toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
