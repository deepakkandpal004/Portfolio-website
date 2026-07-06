"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { blogPosts } from "@/src/data/posts";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";

const BlogPreview = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Show the latest 3 posts
  const latestPosts = blogPosts.slice(0, 3);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="blog">
      <div className="container reveal" ref={ref}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p className="t-label" style={{ marginBottom: 18 }}>Latest writing</p>
            <h2 className="t-h2">Insights & Articles.</h2>
          </div>
          <Link
            href="/blog"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-body)", fontSize: 13.5,
              fontWeight: 600, color: "var(--acc)",
              padding: "10px 20px",
              border: "1px solid var(--bdr)",
              borderRadius: "var(--r-md)",
              background: "var(--bg2)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--fg)";
              e.currentTarget.style.borderColor = "var(--acc)";
              e.currentTarget.style.background = "var(--acc-glow)";
              e.currentTarget.style.transform = "translateX(2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "var(--acc)";
              e.currentTarget.style.borderColor = "var(--bdr)";
              e.currentTarget.style.background = "var(--bg2)";
              e.currentTarget.style.transform = "none";
            }}
          >
            View all articles <FiArrowRight size={13} />
          </Link>
        </div>

        {/* Posts Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 28 }}>
          {latestPosts.map((post, idx) => (
            <article
              key={post.slug}
              className="blog-card animate-pills"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <Link href={`/blog/${post.slug}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Cover Image Wrapper */}
                <div className="blog-card-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                  />
                </div>

                {/* Content preview */}
                <div style={{ padding: "18px 4px 12px", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Meta */}
                  <div style={{ display: "flex", gap: 12, fontSize: 11.5, color: "var(--fg3)", marginBottom: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <FiCalendar size={11} style={{ color: "var(--acc)" }} /> {post.date}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <FiClock size={11} style={{ color: "var(--acc)" }} /> {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="t-h3" style={{ fontSize: "16.5px", color: "var(--fg)", marginBottom: 8, lineHeight: 1.4 }}>
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="t-body" style={{
                    fontSize: "13px", color: "var(--fg2)", marginBottom: 16,
                    lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto" }}>
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 500,
                          padding: "2px 8px", background: "var(--bg2)",
                          border: "1px solid var(--bdr)", borderRadius: "var(--r)",
                          color: "var(--fg3)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogPreview;
