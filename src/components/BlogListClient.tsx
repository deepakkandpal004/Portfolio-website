"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/src/data/posts";
import { FiSearch, FiArrowLeft, FiClock, FiCalendar, FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

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

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  return (
    <section className="bl-section">
      <div className="container">

        <Link href="/" className="bl-back">
          <FiArrowLeft size={14} /> Back to portfolio
        </Link>

        <motion.div
          className="bl-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="t-label">Articles & Insights</p>
          <h1 className="t-hero bl-title">
            Web Engineering <span className="gold">Blog.</span>
          </h1>
          <p className="t-body bl-subtitle">
            Deep dives into Next.js architectures, TypeScript advanced systems, and web performance optimization.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="bl-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="bl-search-wrap">
            <FiSearch size={16} className="bl-search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="bl-search"
              aria-label="Search articles"
            />
          </div>
          <div className="bl-tags">
            {allTags.map(tag => {
              const isActive = tag === selectedTag;
              return (
                <button key={tag} onClick={() => setSelectedTag(tag)} className={`bl-tag-btn ${isActive ? "active" : ""}`}>
                  {tag}
                </button>
              );
            })}
          </div>
        </motion.div>

        {filteredPosts.length > 0 ? (
          <>
            {/* Featured post */}
            {featured && (
              <motion.article
                className="bl-featured"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <Link href={`/blog/${featured.slug}`} className="bl-featured-link">
                  <div className="bl-featured-img">
                    <img src={featured.coverImage} alt={featured.title} />
                    <div className="bl-featured-overlay" />
                    <span className="bl-badge">Latest</span>
                  </div>
                  <div className="bl-featured-body">
                    <div className="bl-meta">
                      <span><FiCalendar size={12} /> {featured.date}</span>
                      <span><FiClock size={12} /> {featured.readTime}</span>
                    </div>
                    <h2 className="bl-featured-title">{featured.title}</h2>
                    <p className="bl-featured-desc">{featured.description}</p>
                    <div className="bl-tags-inline">
                      {featured.tags.map(t => <span key={t} className="bl-tag">{t}</span>)}
                    </div>
                    <span className="bl-read-link">
                      Read article <FiArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            )}

            {/* Grid */}
            <div className="bl-grid">
              {rest.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  className="bl-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + idx * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                  <Link href={`/blog/${post.slug}`} className="bl-card-link">
                    <div className="bl-card-img">
                      <img src={post.coverImage} alt={post.title} />
                    </div>
                    <div className="bl-card-body">
                      <div className="bl-meta">
                        <span><FiCalendar size={11} /> {post.date}</span>
                        <span><FiClock size={11} /> {post.readTime}</span>
                      </div>
                      <h3 className="bl-card-title">{post.title}</h3>
                      <p className="bl-card-desc">{post.description}</p>
                      <div className="bl-tags-inline">
                        {post.tags.slice(0, 3).map(t => <span key={t} className="bl-tag">{t}</span>)}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </>
        ) : (
          <div className="bl-empty">
            <p className="t-body" style={{ fontSize: 16 }}>No articles found.</p>
          </div>
        )}

      </div>

      <style>{`
        .bl-section { min-height: 100vh; padding: 140px 0 80px; }
        .bl-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: var(--acc); margin-bottom: 40px; transition: transform 0.2s;
          text-decoration: none;
        }
        .bl-back:hover { transform: translateX(-4px); }

        .bl-hero { margin-bottom: 48px; }
        .bl-title {
          font-size: clamp(38px, 6vw, 60px); margin-bottom: 18px;
        }
        .bl-subtitle { max-width: 520px; font-size: 16px; }

        /* Controls */
        .bl-controls {
          display: flex; flex-direction: column; gap: 20px;
          margin-bottom: 56px;
          background: var(--bg2); border: 1px solid var(--bdr);
          border-radius: var(--r-lg); padding: 24px;
        }
        .bl-search-wrap { position: relative; width: 100%; }
        .bl-search-icon {
          position: absolute; left: 18px; top: 50%;
          transform: translateY(-50%); color: var(--fg3);
        }
        .bl-search {
          width: 100%; padding: 14px 18px 14px 48px;
          border-radius: 14px; border: 1px solid var(--bdr);
          background: var(--bg); font-family: var(--font-body);
          font-size: 14px; color: var(--fg); outline: none;
          transition: border-color 0.2s;
        }
        .bl-search:focus { border-color: var(--acc); }
        .bl-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .bl-tag-btn {
          padding: 7px 16px; border-radius: 999px;
          font-family: var(--font-body); font-size: 12.5px; font-weight: 500;
          border: 1px solid var(--bdr); background: var(--bg);
          color: var(--fg2); cursor: pointer; transition: all 0.2s;
        }
        .bl-tag-btn:hover { border-color: var(--acc); }
        .bl-tag-btn.active {
          background: var(--acc); border-color: var(--acc); color: #07100e;
        }

        /* Featured */
        .bl-featured {
          border-radius: 20px; border: 1px solid var(--bdr);
          background: var(--bg); overflow: hidden;
          margin-bottom: 32px;
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
        }
        .bl-featured:hover {
          border-color: var(--acc);
          box-shadow: 0 12px 40px rgba(245, 158, 11, 0.15), 0 0 0 1px rgba(245, 158, 11, 0.1);
          transform: translateY(-4px);
        }
        .bl-featured-link {
          display: grid; grid-template-columns: 1fr 1fr;
          text-decoration: none; min-height: 340px;
        }
        .bl-featured-img {
          position: relative; overflow: hidden;
        }
        .bl-featured-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
        }
        .bl-featured:hover .bl-featured-img img { transform: scale(1.04); }
        .bl-featured-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, transparent, rgba(0,0,0,0.15));
        }
        .bl-badge {
          position: absolute; top: 20px; left: 20px;
          padding: 6px 14px; border-radius: 999px;
          background: var(--acc); color: #07100e;
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px;
        }
        .bl-featured-body {
          padding: 36px; display: flex; flex-direction: column; justify-content: center;
        }
        .bl-meta {
          display: flex; gap: 14px; font-family: var(--font-body);
          font-size: 12px; color: var(--fg3); margin-bottom: 16px;
        }
        .bl-meta span { display: flex; align-items: center; gap: 5px; }
        .bl-meta svg { color: var(--acc); }
        .bl-featured-title {
          font-family: var(--font-head); font-size: 26px; font-weight: 700;
          color: var(--fg); line-height: 1.35; letter-spacing: -0.5px; margin-bottom: 14px;
        }
        .bl-featured-desc {
          font-family: var(--font-body); font-size: 15px; line-height: 1.7;
          color: var(--fg2); margin-bottom: 20px;
          display: -webkit-box; WebkitLineClamp: 3; WebkitBoxOrient: vertical; overflow: hidden;
        }
        .bl-tags-inline { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .bl-tag {
          padding: 4px 10px; border-radius: 999px;
          font-family: var(--font-body); font-size: 11px; font-weight: 500;
          border: 1px solid var(--bdr); background: var(--bg2); color: var(--fg3);
        }
        .bl-read-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-body); font-size: 13px; font-weight: 600;
          color: var(--acc); margin-top: auto; transition: gap 0.2s;
        }
        .bl-featured:hover .bl-read-link { gap: 10px; }

        /* Grid */
        .bl-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px; margin-bottom: 60px;
        }
        .bl-card {
          border-radius: 16px; border: 1px solid var(--bdr);
          background: var(--bg); overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
        }
        .bl-card:hover {
          border-color: var(--acc);
          box-shadow: 0 10px 35px rgba(245, 158, 11, 0.12), 0 0 0 1px rgba(245, 158, 11, 0.08);
          transform: translateY(-4px);
        }
        .bl-card-link { display: flex; flex-direction: column; height: 100%; text-decoration: none; }
        .bl-card-img { aspect-ratio: 16 / 10; overflow: hidden; }
        .bl-card-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease;
        }
        .bl-card:hover .bl-card-img img { transform: scale(1.05); }
        .bl-card-body { padding: 22px; display: flex; flex-direction: column; flex: 1; }
        .bl-card-title {
          font-family: var(--font-head); font-size: 18px; font-weight: 700;
          color: var(--fg); line-height: 1.4; letter-spacing: -0.3px; margin-bottom: 10px;
        }
        .bl-card-desc {
          font-family: var(--font-body); font-size: 13.5px; line-height: 1.6;
          color: var(--fg2); margin-bottom: 16px; flex: 1;
          display: -webkit-box; WebkitLineClamp: 3; WebkitBoxOrient: vertical; overflow: hidden;
        }

        /* Empty */
        .bl-empty {
          text-align: center; padding: 80px 24px;
          background: var(--bg2); border: 1px solid var(--bdr);
          border-radius: var(--r-lg);
        }

        @media (max-width: 768px) {
          .bl-controls { padding: 18px; }
          .bl-featured-link { grid-template-columns: 1fr; }
          .bl-featured-img { aspect-ratio: 16 / 9; }
          .bl-featured-body { padding: 24px; }
        }
      `}</style>
    </section>
  );
};

export default BlogListClient;
