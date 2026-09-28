"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { blogPosts } from "@/src/data/posts";
import { FiCalendar, FiClock, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

const BlogPreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const posts = blogPosts.slice(0, 3);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="blog" className="bp-section">
      <div className="container reveal" ref={ref}>

        <motion.div
          className="bp-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="t-label">Latest writing</p>
          <h2 className="t-h2">Insights & Articles.</h2>
          <Link href="/blog" className="bp-view-all">
            View all articles <FiArrowRight size={13} />
          </Link>
        </motion.div>

        <div className="bp-grid">
          {posts.map((post, idx) => (
            <motion.article
              key={post.slug}
              className={`bp-card ${idx === 0 ? "bp-card-featured" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <Link href={`/blog/${post.slug}`} className="bp-card-link">
                <div className="bp-card-img">
                  <img src={post.coverImage} alt={post.title} />
                  {idx === 0 && <span className="bp-badge">Featured</span>}
                </div>
                <div className="bp-card-body">
                  <div className="bp-meta">
                    <span><FiCalendar size={11} /> {post.date}</span>
                    <span><FiClock size={11} /> {post.readTime}</span>
                  </div>
                  <h3 className="bp-card-title">{post.title}</h3>
                  <p className="bp-card-desc">{post.description}</p>
                  <div className="bp-tags">
                    {post.tags.slice(0, 2).map(t => <span key={t} className="bp-tag">{t}</span>)}
                  </div>
                  <span className="bp-read-more">
                    Read article <FiArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          className="bp-newsletter"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="bp-newsletter-inner">
            <div className="bp-newsletter-content">
              <p className="bp-newsletter-label">Stay updated</p>
              <h3 className="bp-newsletter-title">Get new articles delivered to your inbox.</h3>
              <p className="bp-newsletter-desc">No spam. Unsubscribe anytime.</p>
            </div>
            <form className="bp-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" className="bp-newsletter-input" />
              <button type="submit" className="bp-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </motion.div>

      </div>

      <style>{`
        .bp-section { background: transparent; padding: 128px 0; }
        .bp-header {
          max-width: 760px;
          margin: 0 auto 56px;
          text-align: center;
        }
        .bp-header .t-label { margin-bottom: 16px; }
        .bp-header h2 {
          font-size: clamp(2.25rem, 4.5vw, 3.5rem) !important;
          line-height: 1.1 !important;
          letter-spacing: -0.04em !important;
          margin-bottom: 20px;
        }
        .bp-view-all {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-size: 13.5px; font-weight: 600;
          color: var(--acc); padding: 10px 20px;
          border: 1px solid var(--bdr); border-radius: var(--r-md);
          background: var(--bg); transition: all 0.25s ease;
          justify-self: end; align-self: start;
        }
        .bp-view-all:hover {
          color: var(--fg); border-color: color-mix(in srgb, var(--acc) 45%, transparent);
          background: var(--acc-glow2); transform: translateX(2px);
        }

        .bp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .bp-card {
          border-radius: 16px; border: 1px solid var(--bdr);
          background: var(--bg2); overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
        }
        .bp-card:hover {
          border-color: var(--bdr2);
          box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5);
          transform: translateY(-4px);
        }
        .bp-card-link {
          display: flex; flex-direction: column;
          text-decoration: none; height: 100%;
        }
        .bp-card-img {
          position: relative; overflow: hidden;
          aspect-ratio: 16 / 10;
        }
        .bp-card-img img {
          width: 100%; height: 100%; object-fit: cover; object-position: center top;
          transition: transform 0.5s ease;
        }
        .bp-card:hover .bp-card-img img { transform: scale(1.05); }
        .bp-badge {
          position: absolute; top: 12px; left: 12px;
          padding: 4px 10px; border-radius: 999px;
          background: var(--acc); color: #07100e;
          font-family: var(--font-body); font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px;
        }
        .bp-card-body {
          padding: 18px 20px; display: flex; flex-direction: column; flex: 1;
        }
        .bp-meta {
          display: flex; gap: 12px; font-family: var(--font-body);
          font-size: 11px; color: var(--fg3); margin-bottom: 10px;
        }
        .bp-meta span { display: flex; align-items: center; gap: 4px; }
        .bp-meta svg { color: var(--acc); }
        .bp-card-title {
          font-family: var(--font-head); font-size: 15px; font-weight: 700;
          color: var(--fg); line-height: 1.4; letter-spacing: -0.3px; margin-bottom: 8px;
        }
        .bp-card-desc {
          font-family: var(--font-body); font-size: 13px; line-height: 1.6;
          color: var(--fg2); margin-bottom: 14px; flex: 1;
          display: -webkit-box; WebkitLineClamp: 2; WebkitBoxOrient: vertical; overflow: hidden;
        }
        .bp-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
        .bp-tag {
          padding: 3px 8px; border-radius: 999px;
          font-family: var(--font-body); font-size: 10px; font-weight: 500;
          border: 1px solid var(--bdr); background: var(--bg2); color: var(--fg3);
        }
        .bp-read-more {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-body); font-size: 12px; font-weight: 600;
          color: var(--acc); margin-top: auto;
          transition: gap 0.2s;
        }
        .bp-card:hover .bp-read-more { gap: 8px; }

        /* Newsletter */
        .bp-newsletter {
          border-radius: 20px; border: 1px solid var(--bdr);
          background: var(--bg2); overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s;
        }
        .bp-newsletter:hover {
          border-color: var(--bdr2);
          box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5);
        }
        .bp-newsletter-inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 40px; padding: 40px 48px;
        }
        .bp-newsletter-label {
          font-family: var(--font-body); font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 2px;
          color: var(--acc-light); margin-bottom: 8px;
        }
        .bp-newsletter-title {
          font-family: var(--font-head); font-size: 22px; font-weight: 700;
          color: var(--fg); letter-spacing: -0.5px; margin-bottom: 6px;
        }
        .bp-newsletter-desc {
          font-family: var(--font-body); font-size: 14px; color: var(--fg3);
        }
        .bp-newsletter-form {
          display: flex; gap: 10px; flex-shrink: 0;
        }
        .bp-newsletter-input {
          padding: 12px 18px; border-radius: 12px;
          border: 1px solid var(--bdr); background: var(--bg2);
          font-family: var(--font-body); font-size: 14px;
          color: var(--fg); width: 260px; outline: none;
          transition: border-color 0.2s;
        }
        .bp-newsletter-input:focus { border-color: var(--acc); }
        .bp-newsletter-btn {
          padding: 12px 24px; border-radius: 12px; border: none;
          background: var(--acc); color: #07100e;
          font-family: var(--font-body); font-size: 14px; font-weight: 600;
          cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .bp-newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -6px var(--acc-glow);
        }

        @media (max-width: 900px) {
          .bp-section { padding: 90px 0; }
          .bp-grid { grid-template-columns: 1fr; }
          .bp-newsletter-inner { flex-direction: column; align-items: flex-start; padding: 32px; }
          .bp-newsletter-form { width: 100%; }
          .bp-newsletter-input { flex: 1; width: auto; }
        }
        @media (max-width: 480px) {
          .bp-newsletter-form { flex-direction: column; }
        }
      `}</style>
    </section>
  );
};

export default BlogPreview;
