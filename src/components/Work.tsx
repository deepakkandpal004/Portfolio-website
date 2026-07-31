"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import WorkCarousel from "./WorkCarousel";

const Work = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="work-section">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="work-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="t-label work-label">Selected work</p>
          <h2 className="t-h2 work-title">Products built to solve<br /><span className="work-accent">real problems.</span></h2>
          <p className="t-body work-subtitle">A selection of full-stack products, developer tools, and interactive web experiences.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <WorkCarousel />
        </motion.div>
      </div>

      <style>{`
        .work-section { background: var(--bg2); padding: 128px 0; overflow: hidden; }
        .work-heading {
          max-width: 760px;
          margin: 0 auto 72px;
          text-align: center;
        }
        .work-label {
          margin-bottom: 24px;
        }
        .work-title {
          font-size: clamp(2.5rem, 5vw, 4rem) !important;
          line-height: 1.1 !important;
          margin-bottom: 18px !important;
          letter-spacing: -0.04em !important;
        }
        .work-accent {
          color: var(--acc);
          opacity: 0.9;
        }
        .work-subtitle {
          font-size: 18px;
          line-height: 1.75;
          color: var(--tx2);
          max-width: 560px;
          margin: 0 auto;
        }
        @media (max-width: 720px) {
          .work-section { padding: 90px 0; }
          .work-heading { margin-bottom: 46px; }
        }
      `}</style>
    </section>
  );
};

export default Work;
