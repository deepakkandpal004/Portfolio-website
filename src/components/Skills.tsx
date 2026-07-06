"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/src/context/ThemeContext";

interface SkillItem {
  name: string;
  icon: string;
  cat: string;
  darkInvert: boolean;
}

const skills: SkillItem[] = [
  // Frontend
  { name: "React",          icon: "react/react-original.svg",                               cat: "Frontend",          darkInvert: false },
  { name: "Next.js",        icon: "nextjs/nextjs-original.svg",                             cat: "Frontend",          darkInvert: true  },
  { name: "TypeScript",     icon: "typescript/typescript-original.svg",                     cat: "Frontend",          darkInvert: false },
  { name: "JavaScript",     icon: "javascript/javascript-original.svg",                     cat: "Frontend",          darkInvert: false },
  { name: "Redux Toolkit",  icon: "redux/redux-original.svg",                               cat: "Frontend",          darkInvert: false },
  { name: "Tailwind CSS",   icon: "tailwindcss/tailwindcss-original.svg",                   cat: "Frontend",          darkInvert: false },

  // Backend
  { name: "Node.js",        icon: "nodejs/nodejs-original.svg",                             cat: "Backend & APIs",    darkInvert: false },
  { name: "Express",        icon: "express/express-original.svg",                           cat: "Backend & APIs",    darkInvert: true  },
  { name: "GraphQL",        icon: "graphql/graphql-plain.svg",                              cat: "Backend & APIs",    darkInvert: false },
  { name: "Socket.io",      icon: "socketio/socketio-original.svg",                         cat: "Backend & APIs",    darkInvert: true  },
  { name: "REST APIs",      icon: "swagger/swagger-original.svg",                           cat: "Backend & APIs",    darkInvert: false },

  // Database
  { name: "MongoDB",        icon: "mongodb/mongodb-original.svg",                           cat: "Database & Cache",  darkInvert: false },
  { name: "PostgreSQL",     icon: "postgresql/postgresql-original.svg",                     cat: "Database & Cache",  darkInvert: false },
  { name: "Redis",          icon: "redis/redis-original.svg",                               cat: "Database & Cache",  darkInvert: false },
  { name: "Prisma ORM",     icon: "prisma/prisma-original.svg",                             cat: "Database & Cache",  darkInvert: true  },

  // Cloud & DevOps
  { name: "AWS",            icon: "amazonwebservices/amazonwebservices-original-wordmark.svg", cat: "Cloud & DevOps",   darkInvert: true  },
  { name: "Docker",         icon: "docker/docker-original.svg",                             cat: "Cloud & DevOps",    darkInvert: false },
  { name: "CI/CD",          icon: "githubactions/githubactions-original.svg",               cat: "Cloud & DevOps",    darkInvert: false },
  { name: "Git",            icon: "git/git-original.svg",                                   cat: "Cloud & DevOps",    darkInvert: false },
  { name: "Vercel",         icon: "vercel/vercel-original.svg",                             cat: "Cloud & DevOps",    darkInvert: true  },
];

const categories = [
  { name: "Frontend",         sub: "Building responsive, state-driven client interfaces" },
  { name: "Backend & APIs",   sub: "Designing server pipelines & real-time communication channels" },
  { name: "Database & Cache", sub: "Handling structured database models & caching layers" },
  { name: "Cloud & DevOps",   sub: "Automating hosting, CI/CD pipelines & server environments" }
];

const iconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" style={{ background: "var(--bg2)" }}>
      <div className="container reveal" ref={ref}>

        <p className="t-label" style={{ marginBottom: 18 }}>Tech stack</p>
        <h2 className="t-h2" style={{ marginBottom: 48 }}>Technologies I work with.</h2>

        {/* Categories 2x2 Grid Layout */}
        <div className="tech-grid">
          {categories.map((cat, catIdx) => (
            <div key={cat.name} className="tech-card animate-pills" style={{ animationDelay: `${catIdx * 0.08}s` }}>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "19px",
                  fontWeight: 700,
                  color: "var(--fg)",
                  marginBottom: 6,
                }}>
                  {cat.name}
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--fg3)",
                  lineHeight: 1.4,
                }}>
                  {cat.sub}
                </p>
              </div>

              {/* Badges Flow container */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto" }}>
                {skills
                  .filter(s => s.cat === cat.name)
                  .map(s => {
                    const iconFilter = s.darkInvert && theme === "dark"
                      ? "brightness(0) invert(1)"
                      : "none";

                    return (
                      <span key={s.name} className="tech-pill">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${iconBase}/${s.icon}`}
                          alt={s.name}
                          style={{ width: 16, height: 16, flexShrink: 0, filter: iconFilter }}
                          loading="lazy"
                        />
                        {s.name}
                      </span>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
