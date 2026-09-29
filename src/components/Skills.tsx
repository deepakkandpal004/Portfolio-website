"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  icon: string;
  cat: string;
  darkInvert: boolean;
}

const skills: SkillItem[] = [
  { name: "React",          icon: "react/react-original.svg",                               cat: "Frontend",          darkInvert: false },
  { name: "Next.js",        icon: "nextjs/nextjs-original.svg",                             cat: "Frontend",          darkInvert: true  },
  { name: "TypeScript",     icon: "typescript/typescript-original.svg",                     cat: "Frontend",          darkInvert: false },
  { name: "JavaScript",     icon: "javascript/javascript-original.svg",                     cat: "Frontend",          darkInvert: false },
  { name: "Redux Toolkit",  icon: "redux/redux-original.svg",                               cat: "Frontend",          darkInvert: false },
  { name: "Tailwind CSS",   icon: "tailwindcss/tailwindcss-original.svg",                   cat: "Frontend",          darkInvert: false },
  { name: "Node.js",        icon: "nodejs/nodejs-original.svg",                             cat: "Backend & APIs",    darkInvert: false },
  { name: "Express",        icon: "express/express-original.svg",                           cat: "Backend & APIs",    darkInvert: true  },
  { name: "GraphQL",        icon: "graphql/graphql-plain.svg",                              cat: "Backend & APIs",    darkInvert: false },
  { name: "Socket.io",      icon: "socketio/socketio-original.svg",                         cat: "Backend & APIs",    darkInvert: true  },
  { name: "REST APIs",      icon: "swagger/swagger-original.svg",                           cat: "Backend & APIs",    darkInvert: false },
  { name: "MongoDB",        icon: "mongodb/mongodb-original.svg",                           cat: "Database & Cache",  darkInvert: false },
  { name: "PostgreSQL",     icon: "postgresql/postgresql-original.svg",                     cat: "Database & Cache",  darkInvert: false },
  { name: "Redis",          icon: "redis/redis-original.svg",                               cat: "Database & Cache",  darkInvert: false },
  { name: "Prisma ORM",     icon: "prisma/prisma-original.svg",                             cat: "Database & Cache",  darkInvert: true  },
  { name: "AWS",            icon: "amazonwebservices/amazonwebservices-original-wordmark.svg", cat: "Cloud & DevOps",   darkInvert: true  },
  { name: "Docker",         icon: "docker/docker-original.svg",                             cat: "Cloud & DevOps",    darkInvert: false },
  { name: "CI/CD",          icon: "githubactions/githubactions-original.svg",               cat: "Cloud & DevOps",    darkInvert: false },
  { name: "Git",            icon: "git/git-original.svg",                                   cat: "Cloud & DevOps",    darkInvert: false },
  { name: "Vercel",         icon: "vercel/vercel-original.svg",                             cat: "Cloud & DevOps",    darkInvert: true  },
];

const categories = [
  { name: "Frontend",         sub: "Building responsive, state-driven client interfaces",   accent: "#818cf8" },
  { name: "Backend & APIs",   sub: "Designing server pipelines & real-time communication",   accent: "#22d3ee" },
  { name: "Database & Cache", sub: "Handling structured data models & caching layers",       accent: "#22d3a7" },
  { name: "Cloud & DevOps",   sub: "Automating hosting, CI/CD pipelines & environments",     accent: "#f472b6" },
];

const iconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// Core strengths — highlighted for recruiters
const coreSkills = new Set(["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"]);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" style={{ background: "transparent", position: "relative", overflow: "hidden" }}>
      {/* Subtle radial glow */}
      <div className="skills-bg-glow" />

      {/* Grid pattern overlay */}
      <div className="skills-grid-pattern" />

      {/* Slow background gradient shift */}
      <div className="skills-bg-gradient" />

      <div className="container reveal" ref={ref} style={{ position: "relative", zIndex: 10 }}>

        {/* Centered Header */}
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="skills-badge">Tech Arsenal</span>
          <h2 className="t-h2 skills-title">
            Technologies powering<br />every product I build.
          </h2>
          <p className="t-body" style={{ maxWidth: 640, margin: "32px auto 0" }}>
            I build scalable web applications using a modern stack focused on performance, maintainability, security and exceptional user experience.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="skills-bento"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((cat, catIdx) => {
            const catSkills = skills.filter(s => s.cat === cat.name);
            return (
              <motion.div key={cat.name} className="skills-bento-card" variants={cardVariants}>
                {/* Shine on hover */}
                <div className="skills-shine" />

                {/* Accent glow */}
                <div className="skills-accent-glow" style={{ background: `radial-gradient(circle, ${cat.accent}15, transparent 70%)` }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                    <div>
                      <h3 className="skills-cat-name">{cat.name}</h3>
                      <p className="skills-cat-sub">{cat.sub}</p>
                    </div>
                  </div>

                  {/* Tech pills */}
                  <motion.div
                    style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {catSkills.map(s => {
                      const iconFilter = s.darkInvert ? "brightness(0) invert(1)" : "none";
                      return (
                        <motion.span key={s.name} className={`skills-pill${coreSkills.has(s.name) ? " skills-pill-core" : ""}`} variants={pillVariants}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`${iconBase}/${s.icon}`}
                            alt={s.name}
                            style={{ width: 18, height: 18, flexShrink: 0, filter: iconFilter }}
                            loading="lazy"
                          />
                          {s.name}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Marquee ticker */}
        <div className="skills-marquee" aria-hidden="true">
          <div className="skills-marquee-track">
            {[...skills, ...skills].map((s, i) => (
              <span key={`${s.name}-${i}`} className="skills-marquee-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${iconBase}/${s.icon}`}
                  alt=""
                  style={{ width: 16, height: 16, flexShrink: 0, filter: s.darkInvert ? "brightness(0) invert(1)" : "none" }}
                  loading="lazy"
                />
                {s.name}
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .skills-bg-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 20%, var(--violet-glow), transparent 70%);
          filter: blur(100px);
        }
        .skills-grid-pattern {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.4;
          background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 50px 50px;
          -webkit-mask-image: radial-gradient(circle, black 20%, transparent 90%);
          mask-image: radial-gradient(circle, black 20%, transparent 90%);
        }
        .skills-bg-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.03) 0%,
            rgba(34, 211, 238, 0.02) 25%,
            rgba(99, 102, 241, 0.03) 50%,
            rgba(244, 114, 182, 0.02) 75%,
            rgba(99, 102, 241, 0.03) 100%
          );
          background-size: 400% 400%;
          animation: skills-bg-shift 20s ease-in-out infinite;
          opacity: 0.6;
        }
        @keyframes skills-bg-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .skills-header {
          max-width: 760px;
          margin: 0 auto 72px;
          text-align: center;
        }
        .skills-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 999px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          color: var(--acc-light);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .skills-title {
          font-size: clamp(2.25rem, 5vw, 4rem) !important;
          line-height: 1.1 !important;
          letter-spacing: -0.04em !important;
          margin-bottom: 0 !important;
        }
        .skills-bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
        }
        .skills-bento-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 380px;
          padding: 32px;
          border-radius: 24px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .skills-bento-card:nth-child(1) { grid-column: span 6; }
        .skills-bento-card:nth-child(2) { grid-column: span 6; }
        .skills-bento-card:nth-child(3) { grid-column: span 5; }
        .skills-bento-card:nth-child(4) { grid-column: span 7; }
        .skills-bento-card:hover {
          border-color: var(--bdr2);
          box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5);
          transform: translateY(-4px);
        }
        /* Signature top-line glow reveal on hover (replaces the old shine sweep) */
        .skills-shine {
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, var(--acc), transparent);
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .skills-bento-card:hover .skills-shine { opacity: 1; }
        .skills-accent-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }
        .skills-bento-card:hover .skills-accent-glow { opacity: 1; }
        .skills-cat-name {
          font-family: var(--font-head);
          font-size: 22px;
          font-weight: 700;
          color: var(--fg);
          margin-bottom: 6px;
        }
        .skills-cat-sub {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--fg3);
          line-height: 1.4;
        }
        .skills-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 12px;
          border: 1px solid var(--bdr);
          background: var(--bg);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: var(--fg2);
          cursor: default;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .skills-pill:hover {
          border-color: color-mix(in srgb, var(--acc) 45%, transparent);
          color: var(--fg);
          background: var(--bg3);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--acc-glow2);
        }
        .skills-pill-core {
          border-color: color-mix(in srgb, var(--acc) 55%, transparent);
          color: var(--fg);
          box-shadow: 0 0 16px var(--acc-glow2), inset 0 0 12px var(--acc-glow2);
        }
        .skills-marquee {
          margin-top: 56px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        }
        .skills-marquee-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: skills-marquee 32s linear infinite;
        }
        .skills-marquee:hover .skills-marquee-track { animation-play-state: paused; }
        .skills-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          border-radius: 999px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: var(--fg3);
          white-space: nowrap;
        }
        @keyframes skills-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .skills-bento-card:nth-child(1),
          .skills-bento-card:nth-child(2),
          .skills-bento-card:nth-child(3),
          .skills-bento-card:nth-child(4) { grid-column: span 12; }
          .skills-bento-card { min-height: 280px; padding: 24px; }
        }
      `}</style>
    </section>
  );
};

export default Skills;
