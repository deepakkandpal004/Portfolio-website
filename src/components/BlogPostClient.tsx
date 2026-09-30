"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPostData } from "@/src/data/posts";
import { FiArrowLeft, FiClock, FiCalendar, FiShare2, FiTwitter, FiLinkedin, FiLink, FiArrowUpRight } from "react-icons/fi";

interface Props {
  post: BlogPostData;
}

const siteUrl = "https://deepakkandpal.me";

const BlogPostClient = ({ post }: Props) => {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);

  useEffect(() => {
    const updateProgress = () => {
      const el = document.querySelector(".bp-content");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setReadProgress(Math.min(Math.max(scrolled / total, 0), 1));
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      const btn = document.getElementById("copy-btn");
      if (btn) {
        btn.innerHTML = "Copied!";
        setTimeout(() => { btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`; }, 2000);
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
    author: { "@id": `${siteUrl}/#person`, "@type": "Person", name: "Deepak Kandpal", url: siteUrl },
    publisher: {
      "@type": "Organization", name: "Deepak Kandpal",
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png` },
    },
    inLanguage: "en",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Reading progress */}
      <div className="bp-progress-track">
        <div className="bp-progress-fill" style={{ width: `${readProgress * 100}%` }} />
      </div>

      <article className="bp-article">
        <div className="container bp-container">

          <Link href="/blog" className="bp-back">
            <FiArrowLeft size={14} /> Back to articles
          </Link>

          {/* Hero */}
          <header className="bp-hero">
            <div className="bp-hero-tags">
              {post.tags.map(t => (
                <span key={t} className="bp-hero-tag">{t}</span>
              ))}
            </div>

            <h1 className="bp-hero-title">{post.title}</h1>

            <div className="bp-hero-meta">
              <div className="bp-author">
                <div className="bp-author-avatar">DK</div>
                <div>
                  <p className="bp-author-name">Deepak Kandpal</p>
                  <p className="bp-author-role">Full Stack Developer</p>
                </div>
              </div>
              <div className="bp-hero-stats">
                <span><FiCalendar size={13} /> {post.date}</span>
                <span><FiClock size={13} /> {post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Cover */}
          <div className="bp-cover glass-card">
            <img src={post.coverImage} alt={post.title} />
          </div>

          {/* Content */}
          <div
            className="bp-content blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div className="bp-share glass-card">
            <div className="bp-share-label">
              <FiShare2 size={15} />
              <span>Share this article</span>
            </div>
            <div className="bp-share-btns">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="bp-share-btn"
                aria-label="Share on Twitter"
              >
                <FiTwitter size={15} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="bp-share-btn"
                aria-label="Share on LinkedIn"
              >
                <FiLinkedin size={15} />
              </a>
              <button id="copy-btn" onClick={copyLink} className="bp-share-btn" aria-label="Copy Link">
                <FiLink size={15} />
              </button>
            </div>
          </div>

          {/* Author card */}
          <div className="bp-author-card glass-card">
            <div className="bp-author-card-avatar">DK</div>
            <div className="bp-author-card-info">
              <p className="bp-author-card-label">Written by</p>
              <p className="bp-author-card-name">Deepak Kandpal</p>
              <p className="bp-author-card-bio">Full Stack Developer building AI-assisted products, developer tools, and modern web experiences.</p>
              <Link href="/" className="bp-author-card-link">
                View portfolio <FiArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Nav */}
          <div className="bp-nav-bottom">
            <Link href="/blog" className="bp-back-bottom">
              <FiArrowLeft size={14} /> All articles
            </Link>
          </div>

        </div>
      </article>

      <style>{`
        .bp-progress-track {
          position: fixed; top: 0; left: 0; right: 0; height: 3px;
          background: var(--bdr); z-index: 1000;
        }
        .bp-progress-fill {
          height: 100%; background: var(--acc);
          transition: width 0.1s linear;
        }

        .bp-article { min-height: 100vh; padding: 140px 0 100px; }
        .bp-container { max-width: 780px; }

        .bp-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: var(--acc); margin-bottom: 40px; transition: transform 0.2s;
          text-decoration: none;
        }
        .bp-back:hover { transform: translateX(-4px); }

        /* Hero */
        .bp-hero { margin-bottom: 36px; }
        .bp-hero-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .bp-hero-tag {
          padding: 5px 12px; border-radius: 999px;
          font-family: var(--font-body); font-size: 11.5px; font-weight: 600;
          background: var(--acc-glow2); border: 1px solid color-mix(in srgb, var(--acc) 30%, transparent);
          color: var(--acc); text-transform: uppercase; letter-spacing: 0.5px;
        }
        .bp-hero-title {
          font-family: var(--font-head); font-size: clamp(30px, 5vw, 44px);
          font-weight: 800; line-height: 1.2; letter-spacing: -1.5px;
          color: var(--fg); margin-bottom: 28px;
        }
        .bp-hero-meta {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 20px;
        }
        .bp-author {
          display: flex; align-items: center; gap: 12px;
        }
        .bp-author-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, var(--acc), color-mix(in srgb, var(--acc) 60%, #8b5cf6));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-head); font-size: 14px; font-weight: 700;
          color: #07100e;
        }
        .bp-author-name {
          font-family: var(--font-body); font-size: 14px; font-weight: 600; color: var(--fg);
        }
        .bp-author-role {
          font-family: var(--font-body); font-size: 12px; color: var(--fg3);
        }
        .bp-hero-stats {
          display: flex; gap: 16px; font-family: var(--font-body);
          font-size: 13px; color: var(--fg3);
        }
        .bp-hero-stats span { display: flex; align-items: center; gap: 5px; }
        .bp-hero-stats svg { color: var(--acc); }

        /* Cover */
        .bp-cover {
          width: 100%; overflow: hidden;
          margin-bottom: 48px;
          aspect-ratio: 16 / 8;
        }
        .bp-cover img {
          width: 100%; height: 100%; object-fit: cover;
        }

        /* Content */
        .bp-content {
          font-family: var(--font-body); font-size: 17px;
          line-height: 1.9; color: var(--fg2);
        }

        /* Share */
        .bp-share {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px; margin-top: 52px;
          padding: 24px 28px;
        }
        .bp-share-label {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-size: 14px; font-weight: 600; color: var(--fg);
        }
        .bp-share-label svg { color: var(--acc); }
        .bp-share-btns { display: flex; gap: 8px; }
        .bp-share-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 12px;
          border: 1px solid var(--bdr); background: var(--bg);
          color: var(--fg3); cursor: pointer; transition: all 0.2s;
          text-decoration: none; font-size: 11; font-family: var(--font-body);
        }

        /* Author card */
        .bp-author-card {
          display: flex; gap: 20px; align-items: flex-start;
          margin-top: 48px; padding: 28px;
        }
        .bp-author-card-avatar {
          width: 56px; height: 56px; border-radius: 14px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--acc), color-mix(in srgb, var(--acc) 60%, #8b5cf6));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-head); font-size: 18px; font-weight: 700;
          color: #07100e;
        }
        .bp-author-card-label {
          font-family: var(--font-body); font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 1.5px;
          color: var(--fg3); margin-bottom: 4px;
        }
        .bp-author-card-name {
          font-family: var(--font-head); font-size: 18px; font-weight: 700;
          color: var(--fg); margin-bottom: 6px;
        }
        .bp-author-card-bio {
          font-family: var(--font-body); font-size: 14px; line-height: 1.6;
          color: var(--fg2); margin-bottom: 12px;
        }
        .bp-author-card-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-body); font-size: 13px; font-weight: 600;
          color: var(--acc); text-decoration: none; transition: gap 0.2s;
        }
        .bp-author-card-link:hover { gap: 10px; }

        /* Bottom nav */
        .bp-nav-bottom {
          margin-top: 48px; padding-top: 24px;
          border-top: 1px solid var(--bdr);
        }
        .bp-back-bottom {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: var(--acc); transition: transform 0.2s; text-decoration: none;
        }
        .bp-back-bottom:hover { transform: translateX(-4px); }

        @media (max-width: 600px) {
          .bp-hero-meta { flex-direction: column; align-items: flex-start; }
          .bp-cover { aspect-ratio: 16 / 10; }
          .bp-author-card { flex-direction: column; }
          .bp-share { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
};

export default BlogPostClient;
