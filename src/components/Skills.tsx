"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/src/context/ThemeContext";
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
  const { theme } = useTheme();

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      {/* Subtle radial glow */}
      <div className="skills-bg-glow" />

      {/* Grid pattern overlay */}
      <div className="skills-grid-pattern" />

      {/* Slow background gradient shift */}
      <div className="skills-bg-gradient" />

      {/* Scanner beam line */}
      <div className="skills-scanner-beam" />

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
                      const iconFilter = s.darkInvert && theme === "dark"
                        ? "brightness(0) invert(1)"
                        : "none";
                      return (
                        <motion.span key={s.name} className="skills-pill" variants={pillVariants}>
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

        {/* Bottom tagline */}
        <div className="skills-bottom">
          <div className="skills-divider-short" />
          <p className="t-body" style={{ maxWidth: 650, margin: "0 auto", textAlign: "center" }}>
            Always learning. Always shipping. Constantly exploring new technologies to build faster, scalable and reliable products.
          </p>
        </div>
      </div>

      <style>{`
        .skills-bg-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 20%, rgba(99,102,241,0.05), transparent 70%);
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
        .skills-scanner-beam {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 10%, var(--acc-light) 50%, transparent 90%);
          opacity: 0.25;
          animation: skills-scanner-sweep 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
          filter: blur(1px);
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
        @keyframes skills-scanner-sweep {
          0% { top: -2%; opacity: 0; }
          10% { opacity: 0.25; }
          90% { opacity: 0.25; }
          100% { top: 102%; opacity: 0; }
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
          color: var(--acc);
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
          border-color: var(--acc);
          box-shadow: 0 16px 48px var(--acc-glow2);
          transform: translateY(-4px);
        }
        .skills-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%);
          transition: left 0.6s ease;
        }
        .skills-bento-card:hover .skills-shine { left: 100%; }
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
        .skills-divider-short {
          width: 140px;
          height: 1px;
          margin: 0 auto 28px;
          background: linear-gradient(90deg, transparent, var(--bdr2), transparent);
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
          border-color: var(--acc);
          color: var(--fg);
          background: var(--bg3);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--acc-glow2);
        }
        .skills-bottom {
          margin-top: 48px;
        }
        [data-theme="light"] #skills { background: var(--bg) !important; }
        [data-theme="light"] .skills-bg-glow { background: radial-gradient(circle at 50% 20%, rgba(79,70,229,0.06), transparent 70%) !important; }
        [data-theme="light"] .skills-grid-pattern { background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px) !important; }
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
