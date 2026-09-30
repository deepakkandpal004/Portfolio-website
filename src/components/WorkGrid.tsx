"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
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

const ProjectCard = ({ p, variant }: { p: Project; variant: "teaser" | "full" }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const isFull = variant === "full";

  return (
    <motion.article
      className={`wg-card ${isFull ? "" : "teaser"}`}
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      style={{ "--pa": p.accent, "--pas": p.accentSoft } as React.CSSProperties}
    >
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
          {p.tech.map((t) => (
            <span key={t} className="wg-tag wg-tag-accent">
              {t}
            </span>
          ))}
        </div>

        <div className="wg-btns">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="wg-btn-primary"
              style={{ background: p.accent }}
            >
              Live demo <FiArrowUpRight size={14} />
            </a>
          )}
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="wg-btn-secondary"
          >
            <FiGithub size={14} /> Source code
          </a>
          <Link
            href={`/projects/${p.slug}`}
            className="wg-btn-secondary"
            aria-label={`View case study of ${p.title}`}
          >
            Case study <FiArrowUpRight size={14} />
          </Link>
        </div>
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

  return (
    <motion.div
      className="wg-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {visible.map((p) => (
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
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-top-color: rgba(255, 255, 255, 0.16);
          background:
            radial-gradient(120% 70% at 50% 0%, rgba(255, 255, 255, 0.10), transparent 60%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 50%, rgba(255, 255, 255, 0.045) 100%),
            rgba(13, 17, 26, 0.55);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          box-shadow:
            0 32px 64px -16px rgba(0, 0, 0, 0.65),
            0 8px 24px -8px rgba(0, 0, 0, 0.40),
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            inset 0 -1px 1px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .wg-card:hover {
          border-color: rgba(255, 255, 255, 0.18);
          border-top-color: rgba(255, 255, 255, 0.26);
          box-shadow:
            0 40px 72px -16px rgba(0, 0, 0, 0.70),
            0 12px 28px -8px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            inset 0 -1px 1px rgba(0, 0, 0, 0.25);
        }
        .wg-card:hover .wg-title {
          color: var(--pa, var(--acc));
        }
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
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 0, 0, 0.28);
        }
        .wg-img img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: transform 0.45s ease;
        }
        .wg-card:hover .wg-img img {
          transform: scale(1.06);
        }
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
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(255, 255, 255, 0.04);
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
        .wg-title {
          font-family: var(--font-head);
          font-size: 20px;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.5px;
          line-height: 1.25;
          transition: color 0.25s ease;
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
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(255, 255, 255, 0.04);
          color: var(--fg3);
        }
        .wg-tag-accent {
          background: color-mix(in srgb, var(--pa, var(--acc)) 12%, transparent);
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
          box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.5);
        }
        .wg-btn-primary:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        .wg-btn-secondary {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.05);
          color: var(--fg2);
        }
        .wg-btn-secondary:hover {
          border-color: rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.09);
          color: var(--fg);
          transform: translateY(-1px);
        }
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
        @media (max-width: 640px) {
          .wg-grid { grid-template-columns: 1fr; }
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
