"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
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
      <div className="about-bg-glow" />

      {/* Slow background gradient shift */}
      <div className="about-bg-gradient" />

      <div className="container reveal" ref={ref} style={{ position: "relative", zIndex: 10 }}>

        {/* Centered Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="about-badge">About me</span>
          <h2 className="t-h2 about-title">
            Code that ships,<br />
            <span className="gold">scales and stays clean.</span>
          </h2>
        </motion.div>

        {/* Two Column Layout: Photo + Bio */}
        <div className="about-main-grid">
          {/* Circular Photo with Rotating Gradient Rings */}
          <motion.div
            className="about-photo-wrap"
            variants={photoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="about-ring about-ring-1" />
            <div className="about-ring about-ring-2" />
            <div className="about-ring about-ring-3" />
            <div className="about-photo-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/deepak.webp"
                alt="Deepak Kandpal"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            className="about-bio"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <p className="t-body" style={{ fontSize: "15.5px", marginBottom: 20 }}>
              I&apos;m a Full Stack Developer who enjoys building web applications from idea to deployment. I work mainly with React, Next.js, Node.js, and TypeScript, focusing on clean code, performance, and creating products that solve real problems.
            </p>
            <p className="t-body" style={{ fontSize: "15.5px" }}>
              When I&apos;m not coding, I&apos;m exploring new tools, reading about system design, or working on side projects that challenge me to grow as a developer.
            </p>
          </motion.div>
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
            <motion.div key={t.title} className="about-trait-card" variants={itemVariants}>
              <div className="about-trait-shine" />
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
        .about-bg-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 30%, var(--violet-glow), transparent 70%);
          filter: blur(100px);
        }
        .about-bg-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.02) 0%,
            rgba(245, 158, 11, 0.015) 25%,
            rgba(99, 102, 241, 0.02) 50%,
            rgba(244, 114, 182, 0.015) 75%,
            rgba(99, 102, 241, 0.02) 100%
          );
          background-size: 400% 400%;
          animation: about-bg-shift 22s ease-in-out infinite;
          opacity: 0.5;
        }
        @keyframes about-bg-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .about-header {
          max-width: 760px;
          margin: 0 auto 72px;
          text-align: center;
        }
        .about-badge {
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
        .about-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem) !important;
          line-height: 1.08 !important;
          letter-spacing: -0.04em !important;
          margin-bottom: 0 !important;
        }
        .about-main-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 80px;
        }
        .about-photo-wrap {
          position: relative;
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .about-photo-inner {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          z-index: 4;
          border: 3px solid var(--bg2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        .about-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        .about-ring-1 {
          width: 240px;
          height: 240px;
          border-top-color: var(--acc);
          border-right-color: var(--acc);
          opacity: 0.5;
          animation: rotate-ring 8s linear infinite;
          z-index: 1;
        }
        .about-ring-2 {
          width: 260px;
          height: 260px;
          border-bottom-color: var(--acc-light);
          border-left-color: var(--acc-light);
          opacity: 0.35;
          animation: rotate-ring 12s linear infinite reverse;
          z-index: 2;
        }
        .about-ring-3 {
          width: 280px;
          height: 280px;
          border-top-color: var(--acc-dim);
          border-right-color: var(--acc-dim);
          opacity: 0.2;
          animation: rotate-ring 16s linear infinite;
          z-index: 3;
        }
        @keyframes rotate-ring {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .about-bio {
          max-width: 520px;
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
          border-radius: 22px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .about-trait-card:hover {
          border-color: var(--bdr2);
          box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5);
          transform: translateY(-4px);
        }
        /* Signature top-line glow reveal on hover (replaces the old shine sweep) */
        .about-trait-shine {
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
        .about-trait-card:hover .about-trait-shine { opacity: 1; }
        .about-trait-number {
          font-family: var(--font-head);
          font-size: 48px;
          font-weight: 700;
          color: var(--acc);
          opacity: 0.12;
          line-height: 1;
          margin-bottom: 16px;
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
          .about-main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
            margin-bottom: 56px;
          }
          .about-photo-wrap { margin: 0 auto; }
          .about-bio { max-width: 100%; }
          .about-traits-grid { grid-template-columns: 1fr; gap: 18px; }
          .about-trait-card { padding: 28px 24px; }
        }
      `}</style>
    </section>
  );
};

export default About;
