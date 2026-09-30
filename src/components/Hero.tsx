"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiDownload, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { motion, MotionConfig, type Variants } from "framer-motion";

declare global {
  interface Window {
    __siteLoaded?: boolean;
  }
}

/* TODO: replace with your real profile URLs */
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/deepakkandpal004", Icon: FiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/deepakkandpal", Icon: FiLinkedin },
  { label: "X", href: "https://x.com/codedbydeepak", Icon: FiTwitter }
];

const STATS = [
  { value: "3", label: "deployed projects" },
  { value: "57", label: "unit tests in Trim" },
  { value: "SDE Intern", label: "sevaSYNC, 2026" },
];

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

  useEffect(() => {
    if (window.__siteLoaded) {
      setLoaded(true);
      return;
    }
    const onLoaded = () => setLoaded(true);
    window.addEventListener("site-loaded", onLoaded);
    // Safety net: never leave the hero invisible if the loader event is missed
    const fallback = setTimeout(() => setLoaded(true), 2500);
    return () => {
      window.removeEventListener("site-loaded", onLoaded);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section id="hero" aria-label="Introduction" className="hero">
        <div className="container hero-container">
          <div className="hero-grid">
            {/* Left: text content */}
            <motion.div variants={container} initial="hidden" animate={loaded ? "visible" : "hidden"}>
              <motion.div variants={item} className="hero-badge-row">
                <span className="hero-badge">
                  <span className="hero-badge-dot" />
                  <span>Open to SDE &amp; backend roles</span>
                </span>
              </motion.div>

              <motion.p variants={item} className="hero-hi">
                Hi, I&apos;m
              </motion.p>

              <motion.h1 variants={item} className="t-hero hero-name">
                Deepak Kandpal
              </motion.h1>

              <motion.div variants={item} className="hero-subtitle">
                <span>Full Stack Developer</span>
                <span className="hero-sep">•</span>
                <span>Next.js + Node.js</span>
                <span className="hero-sep">•</span>
                <span>Backend &amp; Deployment</span>
              </motion.div>

              <motion.div variants={item} className="hero-location">
                <FiMapPin size={13} aria-hidden="true" />
                <span>Pantnagar, India</span>
                <span className="hero-dot">·</span>
                <span>Open to remote</span>
              </motion.div>

              <motion.p variants={item} className="t-body hero-tagline">
                I build full-stack apps with real authentication, tested APIs, and Docker-based
                deployments. Recently shipped production releases as an SDE intern.
              </motion.p>

              <motion.ul variants={item} className="hero-stats" aria-label="Highlights">
                {STATS.map((s) => (
                  <li key={s.label}>
                    <b>{s.value}</b> {s.label}
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={item} className="hero-actions">
                <a href="#work" className="btn-acc">
                  View my work <FiArrowRight size={13} aria-hidden="true" />
                </a>
                <a href="/resume.pdf" className="btn-outline" download aria-label="Download resume">
                  <FiDownload size={13} aria-hidden="true" /> Resume
                </a>
                <a href="#contact" className="btn-text">
                  Get in touch
                </a>

                <span className="hero-socials">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="hero-social"
                    >
                      <Icon size={17} aria-hidden="true" />
                    </a>
                  ))}
                </span>
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
                <Image
                  src="/images/deepak.png"
                  alt="Deepak Kandpal"
                  width={380}
                  height={380}
                  priority
                  sizes="(max-width: 860px) 240px, 380px"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`
          .hero {
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            padding: clamp(72px, 12vw, 110px) 0;
          }
          .hero-container { position: relative; z-index: 1; width: 100%; }
          .hero-grid {
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: 80px;
            align-items: center;
            max-width: 1280px;
          }

          /* Text blocks */
          .hero-badge-row { display: flex; justify-content: flex-start; margin-bottom: 36px; }
          .hero-badge {
            display: inline-flex; align-items: center; gap: 9px;
            padding: 9px 20px;
            background: var(--bg2);
            border: 1px solid var(--bdr);
            border-radius: 100px;
            font-family: var(--font-body);
            font-size: 12.5px; font-weight: 500;
            color: var(--fg2); letter-spacing: 0.3px;
          }
          .hero-badge-dot {
            width: 7px; height: 7px; border-radius: 50%;
            background: var(--ok); flex-shrink: 0;
            animation: pulse-dot 2s ease-in-out infinite;
          }
          .hero-hi {
            font-family: var(--font-head);
            font-size: 20px; font-weight: 500;
            color: var(--fg2);
            margin-bottom: 10px; letter-spacing: -0.3px;
          }
          .hero-name { margin-bottom: 12px; padding-bottom: 0.08em; }
          .hero-subtitle {
            display: flex; align-items: center; flex-wrap: wrap; gap: 14px;
            font-family: var(--font-body);
            font-size: 15px; font-weight: 500;
            color: var(--fg2); letter-spacing: 0.2px;
            margin-bottom: 24px;
          }
          .hero-sep { color: var(--acc); font-size: 14px; opacity: 0.8; }
          .hero-location {
            display: flex; align-items: center; gap: 7px;
            font-family: var(--font-body);
            font-size: 13px; color: var(--fg3);
            margin-bottom: 20px;
          }
          .hero-location svg { color: var(--acc); flex-shrink: 0; }
          .hero-dot { opacity: 0.4; }
          .hero-tagline { max-width: 560px; margin: 0 0 24px; font-size: 15px; line-height: 1.8; }

          .hero-stats {
            list-style: none;
            display: flex; flex-wrap: wrap; gap: 10px 28px;
            margin: 0 0 36px; padding: 0;
            font-family: var(--font-body);
            font-size: 13px; color: var(--fg3);
          }
          .hero-stats b { color: var(--fg); font-weight: 600; }

          /* Actions */
          .hero-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
          .btn-text {
            padding: 11px 10px;
            font-family: var(--font-body);
            font-size: 14px; font-weight: 500;
            color: var(--fg2);
            text-decoration: underline;
            text-decoration-color: var(--bdr2);
            text-underline-offset: 5px;
            transition: color 0.2s, text-decoration-color 0.2s;
          }
          .btn-text:hover { color: var(--fg); text-decoration-color: var(--acc); }
          .hero-socials { display: inline-flex; gap: 6px; margin-left: 8px; }
          .hero-social {
            display: inline-flex; align-items: center; justify-content: center;
            width: 40px; height: 40px;
            color: var(--fg2);
            border: 1px solid var(--bdr);
            border-radius: var(--r-md);
            transition: color 0.2s, border-color 0.2s, background 0.2s;
          }
          .hero-social:hover {
            color: var(--fg);
            border-color: var(--acc);
            background: rgb(var(--acc-rgb) / 0.06);
          }

          /* Photo */
          .hero-photo-wrap { position: relative; width: 380px; height: 380px; }
          .hero-photo { position: relative; width: 100%; height: 100%; }
          .hero-photo::before {
            content: "";
            position: absolute; inset: -48px;
            background: radial-gradient(circle, rgb(var(--acc-rgb) / 0.16), transparent 65%);
            pointer-events: none;
          }
          .hero-photo::after {
            content: "";
            position: absolute; inset: 0;
            border-radius: 28px;
            background: linear-gradient(135deg, rgb(var(--acc-rgb) / 0.14), rgba(120, 60, 10, 0.10) 60%, rgb(var(--acc-rgb) / 0.05));
            pointer-events: none; z-index: 2;
          }
          .hero-photo img {
            position: relative; z-index: 1;
            width: 380px; height: 380px;
            object-fit: cover;
            border-radius: 28px;
            border: 2px solid rgb(var(--acc-rgb) / 0.35);
            box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.6);
            display: block;
            transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .hero-photo:hover img { transform: scale(1.03); }

          @media (max-width: 860px) {
            .hero-grid { grid-template-columns: 1fr; gap: 40px; }
            .hero-photo-wrap { width: 240px; height: 240px; }
            .hero-photo img { width: 240px; height: 240px; }
            .hero-photo::before { inset: -32px; }
            .hero-socials { margin-left: 0; }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-badge-dot {
              animation: none;
            }
          }
        `}</style>
      </section>
    </MotionConfig>
  );
};

export default Hero;