"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/src/data/posts";
import { FiSearch, FiArrowLeft, FiClock, FiCalendar } from "react-icons/fi";

const BlogListClient = () => {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap(p => p.tags)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase());
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <section style={{ minHeight: "100vh", paddingTop: "140px", paddingBottom: "80px" }}>
      <div className="container" style={{ animation: "fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both" }}>

        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
          color: "var(--acc)", marginBottom: 32, transition: "transform 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateX(-4px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "none")}
        >
          <FiArrowLeft size={14} /> Back to portfolio
        </Link>

        <div style={{ marginBottom: 48 }}>
          <p className="t-label" style={{ marginBottom: 16 }}>Articles & Insights</p>
          <h1 className="t-hero" style={{ fontSize: "clamp(38px, 6vw, 60px)", marginBottom: 18 }}>
            Web Engineering <span className="gold">Blog.</span>
          </h1>
          <p className="t-body" style={{ maxWidth: 520, fontSize: 16 }}>
            Deep dives into Next.js architectures, TypeScript advanced systems, and web performance optimization.
          </p>
        </div>

        <div style={{
          display: "flex", flexDirection: "column", gap: 24,
          marginBottom: 48, background: "var(--bg2)",
          border: "1px solid var(--bdr)", borderRadius: "var(--r-lg)",
          padding: "24px",
        }} className="blog-controls">
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ paddingLeft: "48px", background: "var(--bg)", border: "1px solid var(--bdr)" }}
              aria-label="Search articles"
            />
            <FiSearch size={16} style={{
              position: "absolute", left: "18px", top: "50%",
              transform: "translateY(-50%)", color: "var(--fg3)",
            }} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allTags.map(tag => {
              const isActive = tag === selectedTag;
              return (
                <button key={tag} onClick={() => setSelectedTag(tag)} style={{
                  padding: "6px 14px",
                  background: isActive ? "var(--acc)" : "var(--bg)",
                  border: `1px solid ${isActive ? "var(--acc)" : "var(--bdr)"}`,
                  borderRadius: 100,
                  fontFamily: "var(--font-body)", fontSize: 12.5, fontWeight: 500,
                  color: isActive ? "#fff" : "var(--fg2)",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = "var(--acc)"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = "var(--bdr)"; }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
            {filteredPosts.map((post, idx) => (
              <article key={post.slug} className="blog-card animate-pills" style={{ animationDelay: `${idx * 0.05}s` }}>
                <Link href={`/blog/${post.slug}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div className="blog-card-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.coverImage} alt={post.title} loading="lazy" />
                  </div>
                  <div style={{ padding: "20px 4px 12px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--fg3)", marginBottom: 12 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <FiCalendar size={11} style={{ color: "var(--acc)" }} /> {post.date}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <FiClock size={11} style={{ color: "var(--acc)" }} /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="t-h3" style={{ fontSize: "18px", color: "var(--fg)", marginBottom: 10, lineHeight: 1.4 }}>
                      {post.title}
                    </h2>
                    <p className="t-body" style={{
                      fontSize: "13.5px", marginBottom: 18, lineHeight: 1.6,
                      display: "-webkit-box", WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                      {post.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                      {post.tags.map(t => (
                        <span key={t} style={{
                          fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500,
                          padding: "3px 9px", background: "var(--bg2)",
                          border: "1px solid var(--bdr)", borderRadius: "var(--r)",
                          color: "var(--fg3)",
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "80px 24px",
            background: "var(--bg2)", border: "1px solid var(--bdr)",
            borderRadius: "var(--r-lg)",
          }}>
            <p className="t-body" style={{ fontSize: 16 }}>No articles found.</p>
          </div>
        )}

        <div style={{
          marginTop: 80, paddingTop: 28, borderTop: "1px solid var(--bdr)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--fg3)" }}>
            © {new Date().getFullYear()} Deepak Kandpal
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--fg3)" }}>
            Next.js Portfolio
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .blog-controls { padding: 18px !important; } }
      `}</style>
    </section>
  );
};

export default BlogListClient;
