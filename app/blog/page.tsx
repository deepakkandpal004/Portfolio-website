import type { Metadata } from "next";
import BlogListClient from "@/src/components/BlogListClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Deep dives into Next.js architectures, TypeScript advanced systems, and web performance optimization.",
  openGraph: {
    title: "Blog — Deepak Kandpal",
    description:
      "Deep dives into Next.js architectures, TypeScript advanced systems, and web performance optimization.",
    url: "https://deepakkandpal.me/blog",
  },
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogListClient />;
}
