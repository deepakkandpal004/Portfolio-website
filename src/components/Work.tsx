"use client";

import { useEffect, useRef, useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    n: "01", title: "Resume Builder SaaS",
    desc: "Full-stack SaaS with AI-powered resume generation, ATS scoring, version history, and cover letter builder.",
    tech: ["React", "Node.js", "MongoDB", "Groq AI"],
    live: "https://resume-builder-saas-rsdeepakg.vercel.app/",
    github: "https://github.com/deepakkandpal004/resume-builder-SaaS",
    images: [
      { src: "/images/dashboard.png", alt: "ResumeAI dashboard showing resume management and ATS insights" },
      { src: "/images/resumeBuilder.png", alt: "ResumeAI resume editor and live document preview" },
      { src: "/images/resume.png", alt: "ResumeAI landing page" },
    ],
    wip: true,
  },
  {
    n: "02", title: "URL Shortener",
    desc: "Next.js URL shortener with custom aliases, JWT auth, analytics dashboard, PostgreSQL + Drizzle ORM. 21 unit tests, CI/CD.",
    tech: ["Next.js", "PostgreSQL", "Drizzle", "JWT"],
    live: "https://url-shortener-lyart-two.vercel.app",
    github: "https://github.com/deepakkandpal004/URL-Shortener",
    images: [{ src: "/images/Url-shortener.png", alt: "ShortLink URL shortener dashboard" }],
    wip: false,
  },
  {
    n: "03", title: "AI Expense Tracker",
    desc: "Next.js expense tracking with AI-powered financial insights via OpenRouter, Clerk auth, and Neon PostgreSQL.",
    tech: ["Next.js", "PostgreSQL", "Clerk", "OpenRouter"],
    live: "https://next-expense-tracker-rsdeepakg.vercel.app",
    github: "https://github.com/deepakkandpal004/next-expense-tracker",
    images: [
      { src: "/images/expenseDashboard.png", alt: "Expense AI dashboard with balance, transactions, and AI insights" },
      { src: "/images/expense.png", alt: "Expense AI landing page" },
    ],
    wip: true,
  },
  {
    n: "04", title: "MacOS Portfolio",
    desc: "Interactive macOS-inspired desktop with a dock, window management system, and smooth native-feel animations.",
    tech: ["React", "Vite", "CSS"],
    live: "https://macos-portfolio-sepia.vercel.app",
    github: "https://github.com/deepakkandpal004/MacOS-Portfolio",
    images: [{ src: "/images/macos-portfolio.png", alt: "macOS-inspired portfolio desktop interface" }],
    wip: false,
  },
];

const ProjectRow = ({ p, i }: { p: typeof projects[0]; i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const el = cardRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add("visible");
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="reveal work-row"
      style={{
        display: "grid",
        gridTemplateColumns: i % 2 === 0 ? "1fr 400px" : "400px 1fr",
        gap: "0 64px",
        alignItems: "center",
        padding: "12px 0",
      }}
    >
      {/* Info panel */}
      <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
            color: "var(--acc)", letterSpacing: "1.5px",
          }}>{p.n}</span>
          {p.wip && (
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500,
              padding: "3px 10px",
              background: "var(--acc-glow2)",
              border: "1px solid var(--bdr)",
              borderRadius: 100,
              color: "var(--acc)",
            }}>
              In progress
            </span>
          )}
        </div>

        <h3 className="t-h3" style={{ fontSize: 22, marginBottom: 14, color: "var(--fg)", letterSpacing: "-0.4px" }}>
          {p.title}
        </h3>
        <p className="t-body" style={{ fontSize: 14.5, marginBottom: 24, maxWidth: 460, lineHeight: 1.8 }}>
          {p.desc}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
          {p.tech.map(t => (
            <span key={t} style={{
              fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500,
              padding: "4px 12px",
              background: "var(--bg)",
              border: "1px solid var(--bdr)",
              borderRadius: "var(--r-md)",
              color: "var(--fg2)",
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer"
              className="btn-acc" style={{ padding: "10px 22px", fontSize: 13.5 }}>
              <FiExternalLink size={12} /> Live demo
            </a>
          )}
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="btn-outline" style={{ padding: "9px 22px", fontSize: 13.5 }}>
            <FiGithub size={12} /> Source
          </a>
        </div>
      </div>

      {/* Image card wrapper */}
      <div style={{
        overflow: "hidden",
        borderRadius: "var(--r-lg)",
        border: "1px solid var(--bdr)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        order: i % 2 === 0 ? 1 : 0,
        background: "var(--bg)",
      }}
        className="project-image-wrapper"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.images[selectedImage].src} alt={p.images[selectedImage].alt} loading="lazy" decoding="async" width={400} height={240} style={{
          width: "100%", height: 240,
          objectFit: "cover", objectPosition: "top", display: "block",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.04) translateY(-2px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1) translateY(0)";
          }}
        />
        {p.images.length > 1 && (
          <div
            aria-label={`${p.title} screenshots`}
            style={{ display: "flex", gap: 8, padding: 10, borderTop: "1px solid var(--bdr)" }}
          >
            {p.images.map((image, index) => {
              const isSelected = index === selectedImage;
              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Show ${image.alt}`}
                  aria-pressed={isSelected}
                  style={{
                    padding: 0,
                    width: 56,
                    height: 36,
                    overflow: "hidden",
                    cursor: "pointer",
                    borderRadius: 5,
                    border: `1px solid ${isSelected ? "var(--acc)" : "var(--bdr)"}`,
                    opacity: isSelected ? 1 : 0.58,
                    background: "var(--bg)",
                    transition: "opacity 0.2s, border-color 0.2s",
                  }}
                >
                  <img src={image.src} alt="" width={56} height={36} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const Work = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add("visible");
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" style={{ background: "var(--bg2)" }}>
      <div className="container">

        {/* Section title reveal */}
        <div ref={headerRef} className="reveal" style={{ marginBottom: 60 }}>
          <p className="t-label" style={{ marginBottom: 18 }}>Selected work</p>
          <h2 className="t-h2">Things I&apos;ve built.</h2>
        </div>

        {/* Project list with custom scrollspy reveals */}
        <div style={{ display: "flex", flexDirection: "column", gap: 76 }}>
          {projects.map((p, i) => (
            <ProjectRow key={p.n} p={p} i={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .work-row { grid-template-columns: 1fr !important; gap: 28px 0 !important; }
          .work-row > div { order: unset !important; }
          .work-row > div:last-child { order: -1 !important; }
        }
      `}</style>
    </section>
  );
};

export default Work;
