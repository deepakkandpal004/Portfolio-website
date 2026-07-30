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
          <p className="t-label">Selected work</p>
          <div>
            <h2 className="t-h2">Products built to solve real problems.</h2>
            <p className="t-body">A selection of full-stack products, developer tools, and interactive web experiences.</p>
          </div>
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
        .work-heading { display: grid; grid-template-columns: minmax(145px, 0.32fr) 1fr; gap: 34px; align-items: start; margin-bottom: 72px; }
        .work-heading .t-label { margin: 10px 0 0; }
        .work-heading h2 { max-width: 670px; margin-bottom: 18px; }
        .work-heading .t-body { max-width: 560px; font-size: 16px; line-height: 1.75; }
        @media (max-width: 720px) {
          .work-section { padding: 90px 0; }
          .work-heading { grid-template-columns: 1fr; gap: 14px; margin-bottom: 46px; }
          .work-heading .t-label { margin: 0; }
        }
      `}</style>
    </section>
  );
};

export default Work;
