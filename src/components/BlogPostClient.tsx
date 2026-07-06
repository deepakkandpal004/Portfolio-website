"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BlogPostData } from "@/src/data/posts";
import { FiArrowLeft, FiClock, FiCalendar, FiShare2, FiTwitter, FiLinkedin, FiLink } from "react-icons/fi";

interface Props {
  post: BlogPostData;
}

const siteUrl = "https://portfolio-website-khaki-six-88.vercel.app";

const BlogPostClient = ({ post }: Props) => {
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      // Use a subtle visual cue instead of alert()
      const btn = document.getElementById("copy-btn");
      if (btn) {
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = ""; btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`; }, 2000);
      }
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: { "@type": "Person", name: "Deepak Kandpal", url: siteUrl },
    publisher: {
      "@type": "Organization", name: "Deepak Kandpal",
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article style={{ minHeight: "100vh", paddingTop: "140px", paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "760px", animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}>

          <Link href="/blog" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
            color: "var(--acc)", marginBottom: 32, transition: "transform 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateX(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "none")}
          >
            <FiArrowLeft size={14} /> Back to articles
          </Link>

          <header style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {post.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-body)", fontSize: 11.5, fontWeight: 600,
                  padding: "4px 10px", background: "var(--bg3)",
                  border: "1px solid var(--bdr)", borderRadius: "var(--r)",
                  color: "var(--acc)", textTransform: "uppercase", letterSpacing: "0.5px",
                }}>{t}</span>
              ))}
            </div>
            <h1 className="t-hero" style={{
              fontSize: "clamp(30px, 5vw, 44px)", lineHeight: 1.25,
              letterSpacing: "-1px", marginBottom: 20, color: "var(--fg)",
            }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--fg3)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <FiCalendar size={13} style={{ color: "var(--acc)" }} /> {post.date}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <FiClock size={13} style={{ color: "var(--acc)" }} /> {post.readTime}
              </span>
            </div>
          </header>

          <div style={{
            width: "100%", height: "clamp(220px, 40vw, 380px)",
            borderRadius: "var(--r-lg)", overflow: "hidden",
            border: "1px solid var(--bdr)", marginBottom: 40,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "var(--fg2)" }}
          />

          <div style={{ height: 1, background: "var(--bdr)", margin: "48px 0" }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FiShare2 size={15} style={{ color: "var(--acc)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--fg)" }}>
                Share this article
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`, icon: FiTwitter, label: "Share on Twitter" },
                { href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, icon: FiLinkedin, label: "Share on LinkedIn" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 38, height: 38, border: "1px solid var(--bdr)",
                    borderRadius: "var(--r-md)", color: "var(--fg3)", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--acc)"; e.currentTarget.style.borderColor = "var(--acc)"; e.currentTarget.style.background = "var(--acc-glow2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--fg3)"; e.currentTarget.style.borderColor = "var(--bdr)"; e.currentTarget.style.background = "transparent"; }}
                  aria-label={s.label}
                >
                  <s.icon size={15} />
                </a>
              ))}
              <button id="copy-btn" onClick={copyLink}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 38, height: 38, border: "1px solid var(--bdr)",
                  borderRadius: "var(--r-md)", color: "var(--fg3)",
                  background: "transparent", cursor: "pointer", transition: "all 0.2s",
                  fontSize: 11, fontFamily: "var(--font-body)",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--acc)"; e.currentTarget.style.borderColor = "var(--acc)"; e.currentTarget.style.background = "var(--acc-glow2)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--fg3)"; e.currentTarget.style.borderColor = "var(--bdr)"; e.currentTarget.style.background = "transparent"; }}
                aria-label="Copy Link"
              >
                <FiLink size={15} />
              </button>
            </div>
          </div>

        </div>
      </article>

      <style>{`
        .blog-post-content p { margin-bottom: 24px; }
        .blog-post-content h2 { font-family: var(--font-head); font-size: 24px; font-weight: 700; color: var(--fg); margin-top: 36px; margin-bottom: 16px; letter-spacing: -0.5px; }
        .blog-post-content h3 { font-family: var(--font-head); font-size: 20px; font-weight: 600; color: var(--fg); margin-top: 28px; margin-bottom: 12px; }
        .blog-post-content ul, .blog-post-content ol { margin-bottom: 24px; padding-left: 20px; }
        .blog-post-content li { margin-bottom: 8px; }
        .blog-post-content pre { background: var(--bg2); border: 1px solid var(--bdr); border-radius: var(--r-md); padding: 16px; overflow-x: auto; margin-bottom: 24px; }
        .blog-post-content code { font-family: monospace; font-size: 14px; color: var(--acc-light); }
        .blog-post-content strong { color: var(--fg); font-weight: 600; }
      `}</style>
    </>
  );
};

export default BlogPostClient;
