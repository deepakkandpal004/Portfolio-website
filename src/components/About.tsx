"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const traits = [
  {
    title: "Production experience",
    desc: "SDE Intern at sevaSYNC Digital Solutions \u2014 shipped client-facing MERN features from API design to deployment.",
  },
  {
    title: "API-first backend",
    desc: "35+ REST APIs built with Node.js, Express and TypeScript \u2014 JWT auth, Prisma ORM and Redis caching.",
  },
  {
    title: "Full-stack ownership",
    desc: "From React/Next.js interfaces to Dockerized deployments \u2014 I take features from idea to production.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ background: "transparent", position: "relative", overflow: "hidden" }}>
      <div className="container reveal" ref={ref} style={{ position: "relative", zIndex: 10 }}>

        {/* Centered Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="t-label" style={{ marginBottom: 24 }}>About me</p>
          <h2 className="t-h2 about-title">
            Code that ships,<br />
            <span className="gold">scales and stays clean.</span>
          </h2>
        </motion.div>

        {/* Bio Text — centered */}
        <div className="about-bio-section">
          <div className="about-bio">
            <p className="t-body" style={{ fontSize: "16px", marginBottom: 20 }}>
              I&apos;m Deepak Kandpal, a full-stack developer from Pantnagar, India. As an SDE Intern at sevaSYNC, I shipped client-facing features end to end — React and Next.js on the front, Node.js, TypeScript and Prisma behind it, Docker at the finish line.
            </p>
            <p className="t-body" style={{ fontSize: "16px" }}>
              I like owning features, not just tickets: clean APIs, fast queries, and interfaces that feel obvious. Right now I&apos;m looking for a full-time MERN role where I can do more of that.
            </p>
          </div>
        </div>

        {/* Traits Grid */}
        <motion.div
          className="about-traits-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {traits.map((t, idx) => (
            <motion.div key={t.title} className="about-trait-card glass-card" variants={itemVariants} whileHover={{ y: -4 }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="about-trait-number">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="about-trait-title">{t.title}</h3>
                <p className="about-trait-desc">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <style>{`
        .about-header {
          max-width: 760px;
          margin: 0 auto 56px;
          text-align: center;
        }
        .about-title {
          font-size: clamp(2.5rem, 5vw, 4rem) !important;
          line-height: 1.1 !important;
          letter-spacing: -0.04em !important;
          margin-bottom: 0 !important;
        }
        .about-bio-section {
          max-width: 760px;
          margin: 0 auto 80px;
          text-align: center;
        }
        .about-bio {
          max-width: 640px;
          margin: 0 auto;
        }
        .about-traits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .about-trait-card {
          position: relative;
          overflow: hidden;
          padding: 36px 30px;
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .about-trait-card:hover {
          border-color: rgba(255, 255, 255, 0.16);
        }
        .about-trait-card:hover .about-trait-number {
          opacity: 0.22;
        }
        .about-trait-number {
          font-family: var(--font-head);
          font-size: 48px;
          font-weight: 700;
          color: var(--acc);
          opacity: 0.12;
          line-height: 1;
          margin-bottom: 16px;
          transition: opacity 0.3s ease;
        }
        .about-trait-title {
          font-family: var(--font-head);
          font-size: 22px;
          font-weight: 700;
          color: var(--fg);
          margin-bottom: 12px;
          letter-spacing: -0.3px;
        }
        .about-trait-desc {
          font-family: var(--font-body);
          font-size: 14.5px;
          color: var(--fg2);
          line-height: 1.7;
        }
        @media (max-width: 768px) {
          .about-bio-section { margin-bottom: 56px; }
          .about-traits-grid { grid-template-columns: 1fr; gap: 18px; }
          .about-trait-card { padding: 28px 24px; }
        }
      `}</style>
    </section>
  );
};

export default About;
