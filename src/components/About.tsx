"use client";

import { useEffect, useRef } from "react";

const traits = [
  {
    title: "Clean code",
    desc: "I like keeping my code clean and organized so it's easy to understand and easy to work on later.",
  },
  {
    title: "Fast delivery",
    desc: "I like building things fast, testing them, and making them better every day.",
  },
  {
    title: "Always learning",
    desc: "Every project teaches me something new, and I'm always curious to learn more and build better things.",
  },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="about">
      <div className="container reveal" ref={ref}>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 64, marginBottom: 64 }} className="about-header">
          <div style={{ flex: "0 0 auto", maxWidth: 460 }}>
            <p className="t-label" style={{ marginBottom: 20 }}>About me</p>
            <h2 className="t-h2">
              Code that ships,<br />
              <span className="gold">scales and stays clean.</span>
            </h2>
          </div>
          <p className="t-body" style={{ maxWidth: 400, paddingTop: 12, flexShrink: 0, fontSize: "15.5px" }}>
            I&apos;m a Full Stack Developer who enjoys building web applications from idea to deployment. I work mainly with React, Next.js, Node.js, and TypeScript, focusing on clean code, performance, and creating products that solve real problems.
          </p>
        </div>

        {/* Traits list */}
        <div style={{
          borderTop: "1px solid var(--bdr)",
        }}>
          {traits.map((t) => (
            <div key={t.title} style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: "0 52px",
              alignItems: "start",
              padding: "30px 16px",
              borderBottom: "1px solid var(--bdr)",
              transition: "background 0.25s ease, padding 0.25s ease",
              borderRadius: "var(--r)",
            }}
              className="trait-row"
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--acc-glow2)";
                e.currentTarget.style.paddingLeft = "24px";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.paddingLeft = "16px";
              }}
            >
              <h3 className="t-h3" style={{ color: "var(--fg)", fontWeight: 600 }}>{t.title}</h3>
              <p className="t-body" style={{ fontSize: 14.5, color: "var(--fg2)" }}>{t.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-header { flex-direction: column !important; gap: 24px !important; }
          .about-header > div:first-child { max-width: 100% !important; }
          .trait-row { grid-template-columns: 1fr !important; gap: 8px 0 !important; padding: 24px 12px !important; }
          .trait-row:hover { padding-left: 12px !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
