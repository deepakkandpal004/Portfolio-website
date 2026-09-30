"use client";

import { useEffect, useState } from "react";
import { FiArrowRight, FiDownload, FiMapPin } from "react-icons/fi";
import { motion, type Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  // Start entrance animations once the page loader fades out
  useEffect(() => {
    if ((window as any).__siteLoaded) {
      setLoaded(true);
      return;
    }
    const onLoaded = () => setLoaded(true);
    window.addEventListener("site-loaded", onLoaded);
    return () => window.removeEventListener("site-loaded", onLoaded);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: 110,
        paddingBottom: 110,
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="hero-grid">

          {/* Left: text content */}
          <motion.div variants={container} initial="hidden" animate={loaded ? "visible" : "hidden"}>
            {/* "Available" badge */}
            <motion.div variants={item} style={{ display: "flex", justifyContent: "flex-start", marginBottom: 36 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                padding: "9px 20px",
                background: "var(--bg2)",
                border: "1px solid var(--bdr)",
                borderRadius: 100,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#4ade80", flexShrink: 0,
                  animation: "pulse-dot 2s ease-in-out infinite",
                }} />
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 12.5,
                  fontWeight: 500, color: "var(--fg2)", letterSpacing: "0.3px",
                }}>
                  Available for opportunities
                </span>
              </span>
            </motion.div>

            {/* Introductory label */}
            <motion.p variants={item} style={{
              fontFamily: "var(--font-head)",
              fontSize: 20,
              fontWeight: 500,
              color: "var(--fg2)",
              marginBottom: 10,
              letterSpacing: "-0.3px",
            }}>
              Hi, I&apos;m
            </motion.p>

            {/* Name — Space Grotesk, reference style */}
            <motion.h1 variants={item} className="t-hero hero-name" style={{ marginBottom: 12 }}>
              Deepak Kandpal
            </motion.h1>

            {/* Subtitle */}
            <motion.div variants={item} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 14,
              flexWrap: "wrap",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 500,
              color: "var(--fg2)",
              letterSpacing: "0.2px",
              marginBottom: 24,
            }}>
              <span>Full Stack Developer</span>
              <span style={{ color: "var(--acc)", fontSize: 14, opacity: 0.8 }}>•</span>
              <span>MERN Stack</span>
              <span style={{ color: "var(--acc)", fontSize: 14, opacity: 0.8 }}>•</span>
              <span>Production Development</span>
            </motion.div>

            {/* Location */}
            <motion.div variants={item} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 7,
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--fg3)",
              marginBottom: 20,
            }}>
              <FiMapPin size={13} style={{ color: "var(--acc)", flexShrink: 0 }} />
              <span>Based in India</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Open to remote</span>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={item} className="t-body" style={{
              maxWidth: 560, margin: "0 0 40px",
              fontSize: 15, lineHeight: 1.8,
            }}>
              Turning ideas into reliable web applications with a focus on clean architecture and thoughtful user experiences.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} style={{
              display: "flex", alignItems: "center", justifyContent: "flex-start",
              gap: 12, flexWrap: "wrap",
            }}>
              <a
                href="#work"
                className="btn-acc"
                aria-label="View my work"
              >
                View my work <FiArrowRight size={13} />
              </a>
              <a
                href="#contact"
                className="btn-outline"
                aria-label="Get in touch"
              >
                Get in touch
              </a>
              <a
                href="/resume.pdf"
                className="btn-outline"
                download
                aria-label="Download resume"
              >
                <FiDownload size={13} /> Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            className="hero-photo-wrap"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease, delay: 0.55 }}
          >
            <div className="hero-photo">
              <div className="hp-layer hp-layer-1" aria-hidden="true" />
              <div className="hp-layer hp-layer-2" aria-hidden="true" />
              <div className="hp-ring" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/deepak.png"
                alt="Deepak Kandpal"
              />
              <span className="hp-chip hp-chip-1"><i />Node.js</span>
              <span className="hp-chip hp-chip-2"><i />MERN</span>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 80px;
          align-items: center;
          max-width: 1280px;
        }
        .hero-photo-wrap {
          position: relative;
          width: 380px;
          height: 380px;
        }
        .hero-photo {
          position: relative;
          width: 100%;
          height: 100%;
          animation: hp-float-main 7s ease-in-out infinite;
        }
        @keyframes hp-float-main {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .hero-photo::before {
          content: "";
          position: absolute;
          inset: -48px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.16), transparent 65%);
          pointer-events: none;
          animation: hp-glow 5s ease-in-out infinite;
        }
        @keyframes hp-glow {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.07); }
        }
        .hero-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.14), rgba(120, 60, 10, 0.10) 60%, rgba(245, 158, 11, 0.05));
          pointer-events: none;
          z-index: 2;
        }
        .hp-layer {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(38, 33, 26, 0.92), rgba(20, 18, 14, 0.92));
          border: 1px solid rgba(245, 158, 11, 0.14);
          z-index: 0;
        }
        .hp-layer-1 { transform: rotate(-7deg) translate(-10px, 14px); }
        .hp-layer-2 { transform: rotate(5deg) translate(12px, -8px); opacity: 0.7; }
        @property --hp-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        .hp-ring {
          position: absolute;
          inset: -3px;
          border-radius: 31px;
          padding: 2px;
          background: conic-gradient(from var(--hp-angle), rgba(245, 158, 11, 0.9), rgba(245, 158, 11, 0.05) 25%, transparent 40%, transparent 60%, rgba(245, 158, 11, 0.05) 75%, rgba(245, 158, 11, 0.9));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: hp-ring-spin 7s linear infinite;
          z-index: 3;
          pointer-events: none;
          opacity: 0.55;
        }
        @keyframes hp-ring-spin {
          to { --hp-angle: 360deg; }
        }
        .hp-chip {
          position: absolute;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 15px;
          border-radius: 100px;
          background: rgba(20, 18, 14, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--bdr2);
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--fg);
          letter-spacing: 0.2px;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5);
          animation: hp-chip-float 5.5s ease-in-out infinite;
          white-space: nowrap;
        }
        .hp-chip i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .hp-chip-1 { top: 34px; left: -64px; }
        .hp-chip-1 i { background: #3fa34d; box-shadow: 0 0 10px rgba(63, 163, 77, 0.9); }
        .hp-chip-2 { bottom: 40px; right: -52px; animation-delay: 2.75s; }
        .hp-chip-2 i { background: #f59e0b; box-shadow: 0 0 10px rgba(245, 158, 11, 0.9); }
        @keyframes hp-chip-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        .hero-photo img {
          position: relative;
          z-index: 1;
          width: 380px;
          height: 380px;
          object-fit: cover;
          border-radius: 28px;
          border: 2px solid rgba(245, 158, 11, 0.35);
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.6);
          display: block;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-photo:hover img {
          transform: scale(1.03);
        }
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-photo-wrap {
            width: 240px;
            height: 240px;
          }
          .hero-photo img {
            width: 240px;
            height: 240px;
          }
          .hero-photo::before {
            inset: -32px;
          }
          .hp-chip-1 { top: 10px; left: 10px; }
          .hp-chip-2 { bottom: 10px; right: 10px; }
          .hp-layer-1 { transform: rotate(-7deg) translate(-6px, 9px); }
          .hp-layer-2 { transform: rotate(5deg) translate(7px, -5px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
