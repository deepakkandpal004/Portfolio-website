"use client";

import { FiArrowRight, FiDownload } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

const roles = [
  "Building scalable products with React & Next.js",
  "Developing robust APIs with Node.js & TypeScript",
  "Creating fast and intuitive user experiences",
  "Turning ideas into production-ready software",
];

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const cur = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text === cur) { t = setTimeout(() => setDel(true), 2800); return () => clearTimeout(t); }
    if (del && text === "") { setDel(false); setIdx(i => (i + 1) % roles.length); return; }
    t = setTimeout(() => setText(del ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1)), del ? 28 : 55);
    return () => clearTimeout(t);
  }, [text, del, idx]);

  // Track mouse position over Hero section
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Magnetic button mouse effects
  const handleButtonMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      {/* Premium Tech Grid Background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(circle at 50% 45%, black 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 20%, transparent 75%)",
        opacity: isMounted ? 1 : 0,
        transform: isMounted ? "scale(1)" : "scale(1.1)",
        transition: "opacity 1.5s ease-out 0.1s, transform 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Dynamic Radial glow that follows the user's cursor */}
      <div style={{
        position: "absolute",
        top: isHovered ? mousePos.y : "45%",
        left: isHovered ? mousePos.x : "50%",
        transform: "translate(-50%, -50%)",
        width: isMounted ? "500px" : "150px",
        height: isMounted ? "500px" : "150px",
        background: "radial-gradient(circle, var(--acc-glow) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        transition: isHovered ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), top 0.15s cubic-bezier(0.25, 1, 0.5, 1), left 0.15s cubic-bezier(0.25, 1, 0.5, 1)" : "width 1.5s cubic-bezier(0.16, 1, 0.3, 1), height 1.5s cubic-bezier(0.16, 1, 0.3, 1), top 1s ease, left 1s ease",
      }} />

      {/* Scanner Sweep Line */}
      {isMounted && <div className="hero-scanner-beam" />}

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>

          {/* "Available" badge */}
          <div className="a1" style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "9px 20px",
              background: "var(--acc-glow2)",
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
          </div>

          {/* Introductory label */}
          <p className="a2" style={{
            fontFamily: "var(--font-head)",
            fontSize: 20,
            fontWeight: 500,
            color: "var(--fg2)",
            marginBottom: 10,
            letterSpacing: "-0.3px",
          }}>
            Hi, I&apos;m
          </p>

          {/* Name */}
          <h1 className="t-hero a3" style={{ color: "var(--fg)", marginBottom: 12 }}>
            Deepak<span className="acc"> Kandpal</span>
          </h1>

          {/* Subtitle */}
          <div className="a4" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 500,
            color: "var(--fg2)",
            letterSpacing: "0.2px",
            marginBottom: 24,
            marginTop: 4,
          }}>
            <span>Full Stack Developer</span>
            <span style={{ color: "var(--acc)", fontSize: 14, opacity: 0.8 }}>•</span>
            <span>MERN Stack</span>
            <span style={{ color: "var(--acc)", fontSize: 14, opacity: 0.8 }}>•</span>
            <span>Production Development</span>
          </div>

          {/* Typewriter subtitle */}
          <div className="a5" style={{
            marginBottom: 24,
            minHeight: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 17,
              fontWeight: 400, letterSpacing: "0.2px",
              color: "var(--fg2)",
            }}>
              {text}
            </span>
            <span className="cursor" />
          </div>

          {/* Tagline */}
          <p className="t-body a6" style={{
            maxWidth: 520, margin: "0 auto 48px",
            fontSize: 15, lineHeight: 1.8,
          }}>
            Turning ideas into reliable web applications with a focus on clean architecture and thoughtful user experiences.
          </p>

          {/* Stats row */}
          <div className="a7" style={{
            display: "flex", justifyContent: "center", gap: 56, marginBottom: 48,
            flexWrap: "wrap",
          }}>
            {[["1+", "Years exp."], ["5+", "Projects shipped"], ["5+", "Tech stacks"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 700,
                  color: "var(--acc)", letterSpacing: "-0.5px", lineHeight: 1,
                }}>{v}</div>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: 12,
                  color: "var(--fg3)", marginTop: 7, fontWeight: 400,
                }}>{l}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons with magnetic cursor animations */}
          <div className="a8" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 12, flexWrap: "wrap", marginBottom: 12,
          }}>
            <a
              href="#work"
              className="btn-acc"
              aria-label="View my work"
              onMouseMove={handleButtonMove}
              onMouseLeave={handleButtonLeave}
              style={{ transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), background 0.2s" }}
            >
              View my work <FiArrowRight size={13} />
            </a>
            <a
              href="#contact"
              className="btn-outline"
              aria-label="Get in touch"
              onMouseMove={handleButtonMove}
              onMouseLeave={handleButtonLeave}
              style={{ transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.2s, background 0.2s, color 0.2s" }}
            >
              Get in touch
            </a>
            <a
              href="/resume.pdf"
              className="btn-outline"
              download
              aria-label="Download resume"
              onMouseMove={handleButtonMove}
              onMouseLeave={handleButtonLeave}
              style={{ transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.2s, background 0.2s, color 0.2s" }}
            >
              <FiDownload size={13} /> Resume
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
