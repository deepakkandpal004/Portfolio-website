"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiGithub, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { projects, type Project } from "@/src/data/projects";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const ProjectCard = ({ p, variant, featured }: { p: Project; variant: "teaser" | "full"; featured?: boolean }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const isFull = variant === "full";

  return (
    <motion.article
      className={`wg-card ${isFull ? "" : "teaser"}${featured ? " featured" : ""}`}
      variants={cardVariants}
      style={{ "--pa": p.accent, "--pas": p.accentSoft } as React.CSSProperties}
    >
      <div className="wg-shine" />
      <Link
        href={`/projects/${p.slug}`}
        className="wg-stretched"
        aria-label={`View details of ${p.title}`}
      />

      <div className="wg-img">
        <img
          key={`${p.slug}-${imgIdx}`}
          src={p.screenshots[imgIdx].src}
          alt={p.screenshots[imgIdx].alt}
          loading="lazy"
        />
        <div className="wg-img-glow" />
        <span className="wg-view">
          <FiArrowUpRight size={14} /> View details
        </span>
        {featured && <span className="wg-featured-badge">Featured</span>}
      </div>

      {p.screenshots.length > 1 && (
        <div className="wg-thumbs">
          {p.screenshots.map((s, i) => (
            <button
              key={s.label}
              className={`wg-thumb ${i === imgIdx ? "active" : ""}`}
              onClick={() => setImgIdx(i)}
              aria-label={`View ${s.label}`}
            >
              <img src={s.src} alt={s.label} loading="lazy" />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="wg-body">
        <div>
          <span className="wg-cat">{p.category}</span>
          <h3 className="wg-title">{p.title}</h3>
        </div>

        <p className="wg-desc">{p.summary}</p>

        {isFull && (
          <ul className="wg-features">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <div className="wg-tags">
          {p.proof.map((t) => (
            <span key={t} className="wg-tag wg-tag-accent">
              {t}
            </span>
          ))}
        </div>

        {isFull && (
          <div className="wg-tags" style={{ marginTop: 6 }}>
            {p.tech.map((t) => (
              <span key={t} className="wg-tag">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="wg-btns">
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="wg-btn-primary"
            style={{ background: p.accent }}
          >
            Live demo <FiArrowUpRight size={14} />
          </a>
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="wg-btn-secondary"
          >
            <FiGithub size={14} /> Source code
          </a>
        </div>

        <span className="wg-more">
          View full case study <FiArrowRight size={13} />
        </span>
      </div>
    </motion.article>
  );
};

export default function WorkGrid({
  limit,
  variant = "full",
}: {
  limit?: number;
  variant?: "teaser" | "full";
}) {
  const visible = typeof limit === "number" ? projects.slice(0, limit) : projects;
  const [featured, ...rest] = visible;

  return (
    <motion.div
      className="wg-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {featured && <ProjectCard key={featured.slug} p={featured} variant={variant} featured />}
      {rest.map((p) => (
        <ProjectCard key={p.slug} p={p} variant={variant} />
      ))}

      <style>{`
        .wg-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        .wg-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 18px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          overflow: hidden;
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .wg-card:hover {
          border-color: var(--bdr2);
          transform: translateY(-4px);
          box-shadow: 0 24px 64px -16px color-mix(in srgb, var(--pa, var(--acc)) 32%, transparent),
                      0 8px 24px -8px rgba(0, 0, 0, 0.5);
        }
        /* Signature top-line glow reveal on hover (replaces the old shine sweep) */
        .wg-shine {
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(90deg, transparent, var(--pa, var(--acc)), transparent);
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .wg-card:hover .wg-shine { opacity: 1; }
        /* Stretched link: whole card opens the detail page; buttons stay clickable above it */
        .wg-stretched {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
        }
        .wg-thumbs, .wg-btns { position: relative; z-index: 2; }
        .wg-img {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-bottom: 1px solid var(--bdr);
          background: var(--bg2);
        }
        .wg-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.5s ease;
        }
        .wg-card:hover .wg-img img { transform: scale(1.04); }
        .wg-img-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(circle, var(--pas, var(--acc-glow2)), transparent 70%);
        }
        .wg-card:hover .wg-img-glow { opacity: 1; }
        .wg-thumbs {
          display: flex;
          gap: 8px;
          padding: 10px 16px 0;
        }
        .wg-thumb {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 9px 5px 5px;
          border-radius: 10px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .wg-thumb:hover { border-color: var(--bdr2); }
        .wg-thumb.active { border-color: color-mix(in srgb, var(--pa, var(--acc)) 55%, transparent); }
        .wg-thumb img {
          width: 40px;
          height: 26px;
          object-fit: cover;
          object-position: top;
          border-radius: 6px;
        }
        .wg-thumb span {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          color: var(--fg3);
        }
        .wg-thumb.active span { color: var(--pa, var(--acc)); font-weight: 600; }
        .wg-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px 22px 22px;
          flex: 1;
        }
        .wg-cat {
          display: block;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--fg3);
          margin-bottom: 5px;
        }
        .wg-title {
          font-family: var(--font-head);
          font-size: 20px;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.5px;
          line-height: 1.25;
        }
        .wg-desc {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--fg2);
        }
        .wg-features {
          list-style: none;
          display: grid;
          gap: 8px;
          padding: 0;
          margin: 0;
        }
        .wg-features li {
          display: flex;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--fg2);
          line-height: 1.5;
        }
        .wg-features li::before {
          content: "";
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          margin-top: 6px;
          border-radius: 50%;
          background: var(--pa, var(--acc));
          box-shadow: 0 0 10px var(--pa, var(--acc));
        }
        .wg-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .wg-tag {
          padding: 5px 12px;
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 500;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          color: var(--fg3);
        }
        .wg-tag-accent {
          background: var(--pas, var(--acc-glow2));
          border-color: color-mix(in srgb, var(--pa, var(--acc)) 30%, transparent);
          color: var(--pa, var(--acc));
          font-weight: 600;
        }
        .wg-btns {
          display: flex;
          gap: 10px;
          margin-top: auto;
          padding-top: 6px;
        }
        .wg-btn-primary, .wg-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 20px;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, color 0.2s;
        }
        .wg-btn-primary {
          color: #07100e;
          box-shadow: 0 10px 28px -8px color-mix(in srgb, var(--pa, var(--acc)) 45%, transparent);
        }
        .wg-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px -10px color-mix(in srgb, var(--pa, var(--acc)) 60%, transparent);
        }
        .wg-btn-secondary {
          border: 1px solid var(--bdr);
          background: var(--bg2);
          color: var(--fg2);
        }
        .wg-btn-secondary:hover {
          border-color: var(--bdr2);
          color: var(--fg);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px -12px color-mix(in srgb, var(--pa, var(--acc)) 35%, transparent);
        }
        /* Hover overlay on image: signals the card opens a detail page */
        .wg-view {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0.92);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          background: rgba(7, 8, 15, 0.78);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid color-mix(in srgb, var(--pa, var(--acc)) 45%, transparent);
          color: #fff;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          z-index: 3;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .wg-card:hover .wg-view {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        /* Always-visible cue (matters on touch devices with no hover) */
        .wg-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--pa, var(--acc));
          margin-top: 2px;
        }
        .wg-more svg { transition: transform 0.25s ease; }
        .wg-card:hover .wg-more svg { transform: translateX(4px); }
        /* Teaser variant (homepage): compact, summary only */
        .wg-card.teaser .wg-body {
          padding: 16px 20px 20px;
          gap: 10px;
        }
        .wg-card.teaser .wg-desc {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Featured spotlight: first project spans full width, horizontal layout */
        .wg-card.featured {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          grid-template-areas:
            "img body"
            "thumbs body";
        }
        .wg-card.featured .wg-img {
          grid-area: img;
          aspect-ratio: 16 / 10;
          border-bottom: none;
          border-right: 1px solid var(--bdr);
        }
        .wg-card.featured .wg-thumbs {
          grid-area: thumbs;
          border-right: 1px solid var(--bdr);
          padding: 12px 16px;
          align-items: center;
        }
        .wg-card.featured .wg-body {
          grid-area: body;
          padding: 30px 32px;
          justify-content: center;
          gap: 14px;
        }
        .wg-card.featured .wg-title { font-size: 27px; }
        .wg-card.featured .wg-desc {
          font-size: 14.5px;
          display: block;
          -webkit-line-clamp: unset;
        }
        .wg-featured-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 3;
          padding: 6px 14px;
          border-radius: 999px;
          background: var(--pa, var(--acc));
          color: #07100e;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        @media (max-width: 900px) {
          .wg-grid { grid-template-columns: 1fr; }
          .wg-card.featured {
            grid-template-columns: 1fr;
            grid-template-areas:
              "img"
              "thumbs"
              "body";
          }
          .wg-card.featured .wg-img { border-right: none; border-bottom: 1px solid var(--bdr); aspect-ratio: 16 / 9; }
          .wg-card.featured .wg-thumbs { border-right: none; }
          .wg-card.featured .wg-body { padding: 20px 22px 22px; }
          .wg-card.featured .wg-title { font-size: 22px; }
        }
        @media (max-width: 480px) {
          .wg-body { padding: 18px 18px 20px; }
          .wg-btns { flex-direction: column; }
          .wg-btn-primary, .wg-btn-secondary { width: 100%; }
        }
      `}</style>
    </motion.div>
  );
}
