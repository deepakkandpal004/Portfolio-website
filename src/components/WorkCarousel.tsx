"use client";

import { useState, useEffect, useCallback } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

type Screenshot = { src: string; alt: string; label: string };
type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  proof: string[];
  tech: string[];
  live: string;
  github: string;
  accent: string;
  accentSoft: string;
  screenshots: Screenshot[];
};

const projects: Project[] = [
  {
    slug: "resume-builder",
    title: "Resume Builder SaaS",
    category: "AI career platform",
    summary: "A full-stack resume builder with AI-powered writing, ATS scoring, cover letter generation, and interview prep — all in one workspace.",
    highlights: [
      "ATS Score Checker and Resume Tailor to match any job description",
      "Cover Letter Generator and Interview Prep with AI",
      "7 templates, live preview, PDF export, and auto-save",
    ],
    proof: ["7 templates", "Groq AI", "Auto-save"],
    tech: ["React 19", "Vite 7", "Express 5", "MongoDB", "Groq AI"],
    live: "https://resume-builder-saas-rsdeepakg.vercel.app/",
    github: "https://github.com/deepakkandpal004/Resume-Builder-SaaS",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    screenshots: [
      { src: "/images/dashboard.png", alt: "ResumeAI dashboard", label: "Dashboard" },
      { src: "/images/resumeBuilder.png", alt: "ResumeAI editor", label: "Resume editor" },
      { src: "/images/resume.png", alt: "ResumeAI landing", label: "Landing page" },
    ],
  },
  {
    slug: "expense-ai",
    title: "Expense AI",
    category: "AI finance tracker",
    summary: "An AI-powered expense tracker with intelligent insights, smart budgets, and savings goals — manage your finances in one place.",
    highlights: [
      "AI Financial Coach with spending analysis and recommendations",
      "Budget tracking with real-time alerts and visual progress",
      "Savings goals, command palette, and dark mode",
    ],
    proof: ["OpenRouter AI", "Prisma + PostgreSQL", "Dark mode"],
    tech: ["Next.js 15", "React 19", "Prisma", "PostgreSQL", "OpenRouter"],
    live: "https://next-expense-tracker-rsdeepakg.vercel.app/",
    github: "https://github.com/deepakkandpal004/next-expense-tracker",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    screenshots: [
      { src: "/images/expenseDashboard.png", alt: "Expense AI dashboard", label: "Dashboard" },
      { src: "/images/expense.png", alt: "Expense AI landing", label: "Landing page" },
    ],
  },
  {
    slug: "url-shortener",
    title: "ShortLink",
    category: "Full-stack URL shortener",
    summary: "A full-stack URL shortener with custom aliases, JWT auth, and a dashboard — short links redirect directly from your domain.",
    highlights: [
      "Custom aliases and direct redirects from yourdomain.com/:code",
      "JWT auth with dashboard to manage, copy, and delete links",
      "21 unit tests, GitHub Actions CI/CD, and Vercel deployments",
    ],
    proof: ["21 unit tests", "CI/CD pipeline", "Drizzle ORM"],
    tech: ["Next.js 16", "PostgreSQL", "Drizzle", "JWT", "Vitest"],
    live: "https://url-shortener-lyart-two.vercel.app",
    github: "https://github.com/deepakkandpal004/URL-Shortener",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    screenshots: [
      { src: "/images/Url-shortener.png", alt: "ShortLink dashboard", label: "Dashboard" },
    ],
  },
  {
    slug: "macos-portfolio",
    title: "macOS Portfolio",
    category: "Interactive web experience",
    summary: "A macOS-inspired portfolio with a dock, draggable windows, and interactive apps — Terminal, Safari, Finder, and Resume viewer.",
    highlights: [
      "macOS dock with hover magnification and app launch",
      "Draggable windows with GSAP for a native feel",
      "Zustand-powered window state and welcome typing animation",
    ],
    proof: ["GSAP animations", "Zustand state", "Window system"],
    tech: ["React 19", "Vite 7", "GSAP", "Zustand", "Tailwind CSS v4"],
    live: "https://macos-portfolio-sepia.vercel.app",
    github: "https://github.com/deepakkandpal004/MacOS-Portfolio",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    screenshots: [
      { src: "/images/macos-portfolio.png", alt: "macOS portfolio", label: "Desktop" },
    ],
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 500 : -500, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 500 : -500, opacity: 0 }),
};

export default function WorkCarousel() {
  const [[idx, dir], setSlide] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const total = projects.length;
  const p = projects[idx];

  // Reset image index when project changes
  useEffect(() => { setImgIdx(0); }, [idx]);

  const go = useCallback((d: number) => setSlide(([prev]) => [(prev + d + total) % total, d]), [total]);
  const jump = useCallback((i: number) => setSlide(([prev]) => [i, i > prev ? 1 : -1]), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [paused, go]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 60) go(-1);
    else if (info.offset.x < -60) go(1);
  };

  return (
    <div className="wc" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

      {/* Top bar: counter + title + nav */}
      <div className="wc-topbar">
        <div className="wc-topbar-left">
          <span className="wc-counter" style={{ color: p.accent }}>
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span className="wc-counter-sep">/</span>
            <span className="wc-counter-total">{String(total).padStart(2, "0")}</span>
        </div>

        <div className="wc-topbar-title">
          <span className="wc-topbar-cat">{p.category}</span>
          <h3 className="wc-topbar-name">{p.title}</h3>
        </div>

        <div className="wc-topbar-nav">
          <button onClick={() => go(-1)} className="wc-nav-btn" aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={() => go(1)} className="wc-nav-btn" aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="wc-progress-track">
        {projects.map((proj, i) => (
          <button
            key={proj.slug}
            className={`wc-progress-seg ${i === idx ? "active" : ""} ${i < idx ? "done" : ""}`}
            onClick={() => jump(i)}
            aria-label={`Go to ${proj.title}`}
          >
            {i === idx && (
              <motion.div
                className="wc-progress-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                style={{ background: proj.accent }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="wc-body">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={idx}
            className="wc-slide"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
            style={{ "--pa": p.accent, "--pas": p.accentSoft } as React.CSSProperties}
          >
            {/* Left info */}
            <div className="wc-left">
              <p className="wc-desc">{p.summary}</p>

              <ul className="wc-features">
                {p.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>

              <div className="wc-tags">
                {p.proof.map((t) => <span key={t} className="wc-tag wc-tag-accent">{t}</span>)}
              </div>

              <div className="wc-tags" style={{ marginTop: 8 }}>
                {p.tech.map((t) => <span key={t} className="wc-tag">{t}</span>)}
              </div>

              <div className="wc-btns">
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="wc-btn-primary" style={{ background: p.accent }}>
                  Live demo <FiArrowUpRight size={14} />
                </a>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="wc-btn-secondary">
                  <FiGithub size={14} /> Source code
                </a>
              </div>
            </div>

            {/* Right image */}
            <div className="wc-right">
              <div className="wc-img-frame">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${idx}-${imgIdx}`}
                    src={p.screenshots[imgIdx].src}
                    alt={p.screenshots[imgIdx].alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                <div className="wc-img-glow" style={{ background: `radial-gradient(circle, ${p.accent}20, transparent 70%)` }} />
              </div>
              {p.screenshots.length > 1 && (
                <div className="wc-thumbs">
                  {p.screenshots.map((s, i) => (
                    <button
                      key={i}
                      className={`wc-thumb ${i === imgIdx ? "active" : ""}`}
                      onClick={() => setImgIdx(i)}
                      style={i === imgIdx ? { borderColor: p.accent } : {}}
                    >
                      <img src={s.src} alt={s.label} />
                      <span className="wc-thumb-label">{s.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="wc-dots">
        {projects.map((proj, i) => (
          <button
            key={proj.slug}
            className={`wc-dot ${i === idx ? "active" : ""}`}
            onClick={() => jump(i)}
            style={i === idx ? { background: proj.accent } : {}}
            aria-label={proj.title}
          />
        ))}
      </div>

      <style>{`
        .wc {
          position: relative;
          border-radius: 24px;
          border: 1px solid var(--bdr);
          background: var(--bg);
          overflow: hidden;
        }

        /* Top bar */
        .wc-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 36px;
          border-bottom: 1px solid var(--bdr);
        }
        .wc-topbar-left {
          display: flex;
          align-items: baseline;
          gap: 4px;
          font-family: var(--font-head);
        }
        .wc-counter {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -1px;
        }
        .wc-counter-sep {
          font-size: 18px;
          color: var(--bdr2);
          margin: 0 2px;
        }
        .wc-counter-total {
          font-size: 18px;
          color: var(--fg3);
          font-weight: 500;
        }
        .wc-topbar-title {
          text-align: center;
          flex: 1;
        }
        .wc-topbar-cat {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--fg3);
          display: block;
          margin-bottom: 4px;
        }
        .wc-topbar-name {
          font-family: var(--font-head);
          font-size: 20px;
          font-weight: 700;
          color: var(--acc);
          opacity: 0.9;
          letter-spacing: -0.5px;
        }
        .wc-topbar-nav {
          display: flex;
          gap: 8px;
        }
        .wc-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          color: var(--fg3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .wc-nav-btn:hover {
          border-color: var(--pa, var(--acc));
          color: var(--fg);
          background: var(--acc-glow2);
          box-shadow: 0 4px 16px color-mix(in srgb, var(--pa, var(--acc)) 20%, transparent);
        }

        /* Progress segments */
        .wc-progress-track {
          display: flex;
          height: 3px;
          background: var(--bdr);
        }
        .wc-progress-seg {
          flex: 1;
          position: relative;
          cursor: pointer;
          border: none;
          background: transparent;
          padding: 0;
          transition: background 0.3s;
        }
        .wc-progress-seg.done { background: var(--bdr2); }
        .wc-progress-fill {
          position: absolute;
          inset: 0;
          transform-origin: left;
        }

        /* Body */
        .wc-body {
          padding: 40px 36px 36px;
          min-height: 460px;
        }
        .wc-slide {
          display: grid;
          grid-template-columns: 0.8fr 1.6fr;
          gap: 40px;
          align-items: center;
          cursor: grab;
        }
        .wc-slide:active { cursor: grabbing; }

        /* Left */
        .wc-left {}
        .wc-desc {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.7;
          color: var(--fg2);
          margin-bottom: 22px;
        }
        .wc-features {
          list-style: none;
          display: grid;
          gap: 10px;
          padding: 0;
          margin: 0 0 22px;
        }
        .wc-features li {
          display: flex;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--fg2);
          line-height: 1.5;
        }
        .wc-features li::before {
          content: "";
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          margin-top: 6px;
          border-radius: 50%;
          background: var(--pa, var(--acc));
          box-shadow: 0 0 10px var(--pa, var(--acc));
        }
        .wc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .wc-tag {
          padding: 6px 14px;
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          color: var(--fg3);
        }
        .wc-tag-accent {
          background: var(--pas, var(--acc-glow2));
          border-color: color-mix(in srgb, var(--pa, var(--acc)) 30%, transparent);
          color: var(--pa, var(--acc));
          font-weight: 600;
        }
        .wc-btns {
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }
        .wc-btn-primary, .wc-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .wc-btn-primary {
          color: #07100e;
        }
        .wc-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px color-mix(in srgb, var(--pa, var(--acc)) 35%, transparent);
        }
        .wc-btn-secondary {
          border: 1px solid var(--bdr);
          background: var(--bg2);
          color: var(--fg2);
        }
        .wc-btn-secondary:hover {
          border-color: var(--pa, var(--acc));
          color: var(--fg);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px color-mix(in srgb, var(--pa, var(--acc)) 20%, transparent);
        }

        /* Right image */
        .wc-right {
          position: relative;
        }
        .wc-img-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--bdr);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
          aspect-ratio: 16 / 11;
          background: #0a0d12;
        }
        .wc-img-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .wc-img-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .wc-slide:hover .wc-img-glow { opacity: 1; }

        /* Thumbnails */
        .wc-thumbs {
          display: flex;
          gap: 10px;
          margin-top: 14px;
        }
        .wc-thumb {
          flex: 1;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid var(--bdr);
          background: var(--bg2);
          cursor: pointer;
          padding: 0;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .wc-thumb.active {
          box-shadow: 0 0 0 1px var(--pa, var(--acc));
        }
        .wc-thumb img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
        }
        .wc-thumb-label {
          display: block;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 500;
          color: var(--fg3);
          padding: 5px 0;
          text-align: center;
          background: var(--bg2);
        }
        .wc-thumb.active .wc-thumb-label {
          color: var(--pa, var(--acc));
          font-weight: 600;
        }

        /* Dots */
        .wc-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 0 0 28px;
        }
        .wc-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: var(--bdr2);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .wc-dot.active {
          width: 32px;
          border-radius: 999px;
        }
        .wc-dot:hover:not(.active) { background: var(--fg3); }

        /* Responsive */
        @media (max-width: 900px) {
          .wc-slide {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .wc-body { padding: 32px 24px; min-height: auto; }
          .wc-topbar { padding: 20px 24px; }
          .wc-topbar-title { display: none; }
          .wc-right { order: -1; }
        }
        @media (max-width: 480px) {
          .wc-body { padding: 24px 16px; }
          .wc-topbar { padding: 16px; }
          .wc-counter { font-size: 22px; }
          .wc-btns { flex-direction: column; }
          .wc-btn-primary, .wc-btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
