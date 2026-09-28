"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiAward, FiExternalLink, FiCheckCircle } from "react-icons/fi";

// Certificate image: place the file at public/images/sevasync-internship-certificate.png
const CERTIFICATE_IMG = "/images/sevasync-internship-certificate.png";

const highlights = [
  "Full-stack web application development",
  "Database management and RESTful API development",
  "Authentication and authorization",
  "Docker-based development environments",
  "Testing, debugging and deployment support",
  "Application performance optimization",
];

const Experience = () => {
  return (
    <section id="experience" className="exp-section">
      <div className="container">
        <motion.div
          className="exp-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="t-label">Experience</p>
          <h2 className="t-h2">
            Where I&apos;ve <span className="gold">worked.</span>
          </h2>
        </motion.div>

        <div className="exp-grid">
          {/* Internship card */}
          <motion.div
            className="exp-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="exp-role-row">
              <div className="exp-icon">
                <FiBriefcase size={22} />
              </div>
              <div>
                <h3 className="exp-role">Software Development Engineer Intern</h3>
                <p className="exp-company">sevaSYNC Digital Solutions Pvt. Ltd.</p>
                <p className="exp-dates">10 Jun 2026 &ndash; 25 Aug 2026 &middot; Remote</p>
              </div>
            </div>
            <ul className="exp-list">
              {highlights.map((h) => (
                <li key={h}>
                  <FiCheckCircle className="exp-check" size={15} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Certificate card */}
          <motion.a
            href={CERTIFICATE_IMG}
            target="_blank"
            rel="noopener noreferrer"
            className="exp-cert"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            aria-label="Open internship completion certificate"
          >
            <div className="exp-cert-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CERTIFICATE_IMG} alt="sevaSYNC internship completion certificate" />
              <span className="exp-cert-zoom">
                <FiExternalLink size={16} /> Open full size
              </span>
            </div>
            <div className="exp-cert-meta">
              <FiAward size={18} className="exp-cert-award" />
              <div>
                <div className="exp-cert-title">Internship Completion Certificate</div>
                <div className="exp-cert-sub">Issued 25 Aug 2026 &middot; SVS-INT-2026-0015</div>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
      <style>{`
        .exp-section { background: transparent; padding: var(--sec-pad) 0; }
        .exp-heading { max-width: 720px; margin: 0 auto 56px; text-align: center; }
        .exp-heading .t-label { margin-bottom: 20px; }
        .exp-heading .gold { color: var(--acc); }
        .exp-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 24px; max-width: 1080px; margin: 0 auto; align-items: stretch; }
        .exp-card { position: relative; overflow: hidden; border: 1px solid var(--bdr); border-radius: 22px; background: var(--bg2); padding: 36px 34px; display: flex; flex-direction: column; gap: 26px; transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s; }
        .exp-card:hover { border-color: var(--bdr2); transform: translateY(-4px); box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5); }
        /* Signature top-line glow reveal on hover */
        .exp-card::before, .exp-cert::before { content: ""; position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--acc), transparent); opacity: 0; transition: opacity 0.45s ease; pointer-events: none; z-index: 2; }
        .exp-card:hover::before, .exp-cert:hover::before { opacity: 1; }
        .exp-role-row { display: flex; gap: 18px; align-items: flex-start; }
        .exp-icon { width: 52px; height: 52px; border-radius: 16px; background: var(--acc-glow); border: 1px solid var(--acc); color: var(--acc); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .exp-role { font-family: var(--font-head); font-size: 21px; font-weight: 700; color: var(--fg); letter-spacing: -0.3px; margin: 0 0 6px; }
        .exp-company { font-family: var(--font-body); font-size: 15px; font-weight: 600; color: var(--acc); margin: 0 0 4px; }
        .exp-dates { font-family: var(--font-body); font-size: 13px; color: var(--fg3); margin: 0; }
        .exp-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .exp-list li { display: flex; gap: 12px; align-items: flex-start; font-family: var(--font-body); font-size: 14.5px; color: var(--fg2); line-height: 1.6; }
        .exp-check { color: var(--acc); flex-shrink: 0; margin-top: 3px; }
        .exp-cert { position: relative; border: 1px solid var(--bdr); border-radius: 22px; background: var(--bg2); overflow: hidden; display: flex; flex-direction: column; text-decoration: none; transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s; }
        .exp-cert:hover { border-color: var(--bdr2); transform: translateY(-4px); box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5); }
        .exp-cert-img-wrap { position: relative; flex: 1; min-height: 0; background: #fff; }
        .exp-cert-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .exp-cert-zoom { position: absolute; right: 14px; bottom: 14px; display: inline-flex; align-items: center; gap: 8px; background: rgba(7,8,15,0.78); color: #fff; font-family: var(--font-body); font-size: 12.5px; font-weight: 600; padding: 8px 14px; border-radius: 999px; backdrop-filter: blur(6px); opacity: 0; transform: translateY(6px); transition: opacity 0.25s, transform 0.25s; }
        .exp-cert:hover .exp-cert-zoom { opacity: 1; transform: none; }
        .exp-cert-meta { display: flex; gap: 14px; align-items: center; padding: 20px 24px; }
        .exp-cert-award { color: var(--acc); flex-shrink: 0; }
        .exp-cert-title { font-family: var(--font-head); font-size: 16px; font-weight: 700; color: var(--fg); }
        .exp-cert-sub { font-family: var(--font-body); font-size: 12.5px; color: var(--fg3); margin-top: 3px; }
        @media (max-width: 860px) {
          .exp-section { padding: var(--sec-pad-sm) 0; }
          .exp-grid { grid-template-columns: 1fr; }
          .exp-card { padding: 28px 24px; }
          .exp-role { font-size: 19px; }
        }
      `}</style>
    </section>
  );
};

export default Experience;