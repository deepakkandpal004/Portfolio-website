"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { motion } from "framer-motion";
import type { Project } from "@/src/data/projects";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const ProjectDetailClient = ({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project | null;
  next: Project | null;
}) => {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <section className="pd-section">
      <div className="container">
        <Link href="/#work" className="pd-back">
          <FiArrowLeft size={14} /> All projects
        </Link>

        {/* Header */}
        <motion.div
          className="pd-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="t-label">{project.category}</p>
          <h1 className="t-hero pd-title">
            {project.title}
            <span className="gold">.</span>
          </h1>
          <p className="t-body pd-summary">{project.summary}</p>
          <div className="pd-actions">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-btn-primary"
              style={{ background: project.accent }}
            >
              Live demo <FiArrowUpRight size={15} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-btn-secondary"
            >
              <FiGithub size={15} /> Source code
            </a>
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          className="pd-gallery"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <div className="pd-main">
            <img
              key={`${project.slug}-${imgIdx}`}
              src={project.screenshots[imgIdx].src}
              alt={project.screenshots[imgIdx].alt}
            />
          </div>
          {project.screenshots.length > 1 && (
            <div className="pd-thumbs">
              {project.screenshots.map((s, i) => (
                <button
                  key={s.label}
                  className={`pd-thumb ${i === imgIdx ? "active" : ""}`}
                  onClick={() => setImgIdx(i)}
                  aria-label={`View ${s.label}`}
                >
                  <img src={s.src} alt={s.label} loading="lazy" />
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Case study */}
        <motion.div
          className="pd-casestudy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="pd-h2">Case study</h2>
          <div className="pd-cs-grid">
            <div className="pd-cs-card">
              <p className="pd-cs-label">The problem</p>
              <p className="pd-cs-text">{project.caseStudy.problem}</p>
            </div>
            <div className="pd-cs-card">
              <p className="pd-cs-label">What I built</p>
              <p className="pd-cs-text">{project.caseStudy.solution}</p>
            </div>
            <div className="pd-cs-card pd-cs-results">
              <p className="pd-cs-label">Results</p>
              <ul className="pd-cs-list">
                {project.caseStudy.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <div className="pd-details">
          <motion.div
            className="pd-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease }}
          >
            <h2 className="pd-h2">Highlights</h2>
            <ul className="pd-features">
              {project.highlights.map((h) => (
                <li key={h} style={{ "--pa": project.accent } as React.CSSProperties}>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="pd-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            <h2 className="pd-h2">Tech stack</h2>
            <div className="pd-tags">
              {project.tech.map((t) => (
                <span key={t} className="pd-tag">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="pd-h2" style={{ marginTop: 28 }}>
              Key facts
            </h2>
            <div className="pd-tags">
              {project.proof.map((t) => (
                <span
                  key={t}
                  className="pd-tag pd-tag-accent"
                  style={{ "--pa": project.accent, "--pas": project.accentSoft } as React.CSSProperties}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Prev / Next */}
        <div className="pd-nav">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="pd-nav-card">
              <span className="pd-nav-label">
                <FiArrowLeft size={13} /> Previous project
              </span>
              <span className="pd-nav-title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="pd-nav-card next">
              <span className="pd-nav-label">
                Next project <FiArrowRight size={13} />
              </span>
              <span className="pd-nav-title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

      <style>{`
        .pd-section {
          background: var(--bg);
          padding: 150px 0 110px;
        }
        .pd-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: var(--fg3);
          margin-bottom: 40px;
          transition: color 0.2s;
        }
        .pd-back:hover { color: var(--acc); }

        .pd-hero {
          max-width: 820px;
          margin-bottom: 48px;
        }
        .pd-hero .t-label { margin-bottom: 20px; }
        .pd-title {
          font-size: clamp(2.4rem, 5vw, 3.8rem) !important;
          line-height: 1.1 !important;
          letter-spacing: -0.04em !important;
          margin-bottom: 20px !important;
        }
        .pd-title .gold { color: var(--acc); }
        .pd-summary {
          font-size: 17px;
          line-height: 1.75;
          color: var(--tx2);
          max-width: 640px;
          margin-bottom: 28px;
        }
        .pd-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .pd-btn-primary, .pd-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 28px;
          border-radius: 14px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, color 0.2s;
        }
        .pd-btn-primary { color: #07100e; }
        .pd-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px var(--acc-glow2);
        }
        .pd-btn-secondary {
          border: 1px solid var(--bdr);
          background: var(--bg2);
          color: var(--fg2);
        }
        .pd-btn-secondary:hover {
          border-color: var(--acc);
          color: var(--fg);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--acc-glow2);
        }

        .pd-gallery { margin-bottom: 56px; }
        .pd-main {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--bdr);
          background: #0a0d12;
        }
        .pd-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .pd-thumbs {
          display: flex;
          gap: 10px;
          margin-top: 14px;
          flex-wrap: wrap;
        }
        .pd-thumb {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px 8px 8px;
          border-radius: 12px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
        }
        .pd-thumb:hover { border-color: var(--acc); transform: translateY(-2px); }
        .pd-thumb.active { border-color: var(--acc); }
        .pd-thumb img {
          width: 72px;
          height: 44px;
          object-fit: cover;
          object-position: top;
          border-radius: 8px;
        }
        .pd-thumb span {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          color: var(--fg3);
        }
        .pd-thumb.active span { color: var(--acc); font-weight: 600; }

        .pd-details {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 24px;
          margin-bottom: 72px;
        }
        .pd-casestudy { margin-bottom: 56px; }
        .pd-casestudy .pd-h2 { margin-bottom: 22px; }
        .pd-cs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .pd-cs-card {
          border: 1px solid var(--bdr);
          border-radius: 18px;
          background: var(--bg2);
          padding: 26px 24px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .pd-cs-card:hover { border-color: var(--acc); transform: translateY(-3px); }
        .pd-cs-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: var(--acc);
          margin-bottom: 14px;
        }
        .pd-cs-text {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.7;
          color: var(--fg2);
        }
        .pd-cs-list {
          list-style: none;
          display: grid;
          gap: 12px;
          padding: 0;
          margin: 0;
        }
        .pd-cs-list li {
          display: flex;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: var(--fg);
          line-height: 1.55;
        }
        .pd-cs-list li::before {
          content: "✓";
          flex-shrink: 0;
          color: var(--acc);
          font-weight: 800;
        }
        .pd-block {
          border: 1px solid var(--bdr);
          border-radius: 20px;
          background: var(--bg2);
          padding: 32px;
        }
        .pd-h2 {
          font-family: var(--font-head);
          font-size: 20px;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.5px;
          margin-bottom: 20px;
        }
        .pd-features {
          list-style: none;
          display: grid;
          gap: 14px;
          padding: 0;
          margin: 0;
        }
        .pd-features li {
          display: flex;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 14.5px;
          color: var(--fg2);
          line-height: 1.6;
        }
        .pd-features li::before {
          content: "";
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          margin-top: 8px;
          border-radius: 50%;
          background: var(--pa, var(--acc));
          box-shadow: 0 0 12px var(--pa, var(--acc));
        }
        .pd-tags { display: flex; flex-wrap: wrap; gap: 9px; }
        .pd-tag {
          padding: 8px 16px;
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 500;
          border: 1px solid var(--bdr);
          background: var(--bg);
          color: var(--fg3);
        }
        .pd-tag-accent {
          background: var(--pas, var(--acc-glow2));
          border-color: color-mix(in srgb, var(--pa, var(--acc)) 30%, transparent);
          color: var(--pa, var(--acc));
          font-weight: 600;
        }

        .pd-nav {
          display: flex;
          justify-content: space-between;
          gap: 16px;
        }
        .pd-nav-card {
          flex: 1;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 22px 26px;
          border-radius: 16px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .pd-nav-card.next { text-align: right; align-items: flex-end; }
        .pd-nav-card:hover {
          border-color: var(--acc);
          transform: translateY(-3px);
          box-shadow: 0 10px 32px var(--acc-glow2);
        }
        .pd-nav-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--fg3);
        }
        .pd-nav-card:hover .pd-nav-label { color: var(--acc); }
        .pd-nav-title {
          font-family: var(--font-head);
          font-size: 18px;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.3px;
        }

        @media (max-width: 900px) {
          .pd-details { grid-template-columns: 1fr; }
          .pd-cs-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .pd-section { padding: 120px 0 80px; }
          .pd-block { padding: 24px 22px; }
          .pd-nav { flex-direction: column; }
          .pd-nav-card { max-width: none; }
        }
      `}</style>
    </section>
  );
};

export default ProjectDetailClient;
