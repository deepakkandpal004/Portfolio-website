"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const highlights = [
  "Built and shipped full-stack web applications for client projects",
  "Designed RESTful APIs and managed databases",
  "Implemented authentication and authorization flows",
  "Containerized development environments with Docker",
  "Testing, debugging, and deployment support",
  "Optimized application performance",
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

        <div className="exp-timeline">
          <motion.div
            className="exp-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="exp-node" aria-hidden="true" />
            <div className="exp-card">
              <div className="exp-top">
                <span className="exp-dates">Jun 2026 &mdash; Aug 2026</span>
                <span className="exp-pill">Remote</span>
                <span className="exp-pill">Internship</span>
              </div>
              <h3 className="exp-role">Software Development Engineer Intern</h3>
              <p className="exp-company">sevaSYNC Digital Solutions Pvt. Ltd.</p>
              <p className="exp-desc">
                Delivered full-stack web applications for client projects at a digital solutions consultancy.
              </p>
              <ul className="exp-list">
                {highlights.map((h) => (
                  <li key={h}>
                    <FiCheckCircle className="exp-check" size={15} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div
            className="exp-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="exp-node exp-node-next" aria-hidden="true" />
            <a href="#contact" className="exp-cta" aria-label="Get in touch">
              <div>
                <div className="exp-cta-title">Open to opportunities</div>
                <div className="exp-cta-sub">Looking for a full-stack developer? Let&apos;s talk.</div>
              </div>
              <span className="exp-cta-arrow">
                <FiArrowRight size={18} />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
      <style>{`
        .exp-section { background: transparent; padding: var(--sec-pad) 0; }
        .exp-heading { max-width: 720px; margin: 0 auto 56px; text-align: center; }
        .exp-heading .t-label { margin-bottom: 20px; }
        .exp-heading .gold { color: var(--acc); }
        .exp-timeline { position: relative; max-width: 880px; margin: 0 auto; }
        .exp-timeline::before {
          content: "";
          position: absolute;
          left: 7px;
          top: 12px;
          bottom: 12px;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(to bottom, var(--acc), var(--bdr2));
        }
        .exp-item { position: relative; padding-left: 44px; }
        .exp-item + .exp-item { margin-top: 20px; }
        .exp-node {
          position: absolute;
          left: 0;
          top: 8px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--acc);
          box-shadow: 0 0 18px var(--acc-glow);
        }
        .exp-node-next {
          background: transparent;
          border-style: dashed;
          box-shadow: none;
        }
        .exp-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border: 1px dashed var(--bdr2);
          border-radius: 20px;
          padding: 24px 28px;
          text-decoration: none;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .exp-cta:hover {
          border-color: var(--acc);
          border-style: solid;
          transform: translateY(-3px);
          box-shadow: 0 20px 48px -16px var(--acc-glow);
        }
        .exp-cta-title { font-family: var(--font-head); font-size: 18px; font-weight: 700; color: var(--fg); letter-spacing: -0.2px; }
        .exp-cta-sub { font-family: var(--font-body); font-size: 13.5px; color: var(--fg3); margin-top: 5px; }
        .exp-cta-arrow {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--acc-glow);
          border: 1px solid var(--acc);
          color: var(--acc);
          transition: background 0.25s, color 0.25s, transform 0.25s;
        }
        .exp-cta:hover .exp-cta-arrow { background: var(--acc); color: #07100e; transform: translateX(4px); }
        .exp-card {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--bdr);
          border-radius: 20px;
          background: var(--bg2);
          padding: 34px 34px 32px;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .exp-card:hover {
          border-color: var(--bdr2);
          transform: translateY(-4px);
          box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5);
        }
        .exp-card::before {
          content: "";
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--acc), transparent);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }
        .exp-card:hover::before { opacity: 1; }
        .exp-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
        .exp-dates {
          font-family: var(--font-term), ui-monospace, monospace;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--acc);
          letter-spacing: 0.04em;
        }
        .exp-pill {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 500;
          color: var(--fg3);
          border: 1px solid var(--bdr2);
          border-radius: 999px;
          padding: 4px 12px;
        }
        .exp-role { font-family: var(--font-head); font-size: 24px; font-weight: 700; color: var(--fg); letter-spacing: -0.3px; margin: 0 0 6px; }
        .exp-company { font-family: var(--font-body); font-size: 15.5px; font-weight: 600; color: var(--fg2); margin: 0 0 10px; }
        .exp-desc { font-family: var(--font-body); font-size: 14.5px; color: var(--fg3); line-height: 1.65; margin: 0 0 22px; max-width: 620px; }
        .exp-list { list-style: none; margin: 0; padding: 22px 0 0; border-top: 1px solid var(--bdr); display: grid; grid-template-columns: 1fr 1fr; gap: 13px 24px; }
        .exp-list li { display: flex; gap: 12px; align-items: flex-start; font-family: var(--font-body); font-size: 14.5px; color: var(--fg2); line-height: 1.6; }
        .exp-check { color: var(--acc); flex-shrink: 0; margin-top: 3px; }
        @media (max-width: 860px) {
          .exp-section { padding: var(--sec-pad-sm) 0; }
          .exp-item { padding-left: 36px; }
          .exp-card { padding: 26px 24px; }
          .exp-role { font-size: 20px; }
          .exp-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
