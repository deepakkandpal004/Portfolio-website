"use client";

import { motion } from "framer-motion";

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
            <div className="exp-card glass-card">
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
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        .exp-section { background: transparent; padding: var(--sec-pad) 0; }
        .exp-heading { max-width: 720px; margin: 0 auto 44px; text-align: center; }
        .exp-heading .t-label { margin-bottom: 20px; }
        .exp-heading .gold { color: var(--acc); }
        .exp-timeline { position: relative; max-width: 1080px; margin: 0 auto; }
        .exp-timeline::before {
          content: "";
          position: absolute;
          left: 8px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(to bottom, transparent, var(--bdr2) 12%, var(--bdr2) 88%, transparent);
        }
        .exp-item { position: relative; padding-left: 48px; }
        .exp-node {
          position: absolute;
          left: 0;
          top: 6px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--acc);
          box-shadow: 0 0 0 5px color-mix(in srgb, var(--acc) 12%, transparent);
        }
        .exp-card {
          position: relative;
          overflow: hidden;
          padding: 38px 38px 34px;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .exp-card:hover {
          border-color: rgba(255, 255, 255, 0.16);
          transform: translateY(-3px);
        }
        .exp-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
        .exp-dates {
          font-family: var(--font-head);
          font-size: 12px;
          font-weight: 700;
          color: var(--bg);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: var(--acc);
          border: 1px solid var(--acc);
          border-radius: 999px;
          padding: 6px 14px;
        }
        .exp-pill {
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 500;
          color: var(--fg2);
          border: 1px solid var(--bdr);
          background: var(--bg2);
          border-radius: 999px;
          padding: 6px 14px;
        }
        .exp-role { font-family: var(--font-head); font-size: 26px; font-weight: 700; color: var(--fg); letter-spacing: -0.5px; margin: 0 0 8px; line-height: 1.25; }
        .exp-company { font-family: var(--font-body); font-size: 15px; font-weight: 600; color: var(--acc-light); margin: 0 0 12px; }
        .exp-desc { font-family: var(--font-body); font-size: 15px; color: var(--fg2); line-height: 1.7; margin: 0 0 24px; max-width: 640px; }
        .exp-list { list-style: none; margin: 0; padding: 24px 0 0; border-top: 1px solid var(--bdr); display: grid; grid-template-columns: 1fr 1fr; gap: 14px 28px; }
        .exp-list li { position: relative; padding-left: 20px; font-family: var(--font-body); font-size: 14.5px; color: var(--fg2); line-height: 1.6; }
        .exp-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--acc);
        }
        @media (max-width: 860px) {
          .exp-section { padding: var(--sec-pad-sm) 0; }
          .exp-item { padding-left: 38px; }
          .exp-card { padding: 28px 24px; }
          .exp-role { font-size: 21px; }
          .exp-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
