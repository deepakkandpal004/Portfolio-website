"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

// TODO(Deepak): replace the placeholder below with a real quote from your
// sevaSYNC manager / mentor — 2-3 lines about your work. Send me the text
// and I'll swap it in.
const testimonials = [
  {
    quote:
      "Placeholder — replace with a real testimonial. Ask your manager for 2–3 lines on what you shipped, how you work, and what stood out.",
    name: "Your Manager",
    role: "sevaSYNC Digital Solutions",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="tm-section">
      <div className="container">
        <motion.div
          className="tm-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="t-label">Testimonials</p>
          <h2 className="t-h2">
            What people I&apos;ve worked with <span className="gold">say.</span>
          </h2>
        </motion.div>

        <div className="tm-grid">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              className="tm-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <div className="tm-stars">
                {[0, 1, 2, 3, 4].map((s) => (
                  <FiStar key={s} size={14} className="tm-star" />
                ))}
              </div>
              <blockquote className="tm-quote">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="tm-author">
                <div className="tm-avatar">{t.name.charAt(0)}</div>
                <div>
                  <div className="tm-name">{t.name}</div>
                  <div className="tm-role">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <style>{`
        .tm-section { background: var(--bg2); padding: var(--sec-pad) 0; }
        .tm-heading { max-width: 720px; margin: 0 auto 56px; text-align: center; }
        .tm-heading .t-label { margin-bottom: 20px; }
        .tm-heading .gold { color: var(--acc); }
        .tm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          max-width: 860px;
          margin: 0 auto;
        }
        .tm-card {
          border: 1px solid var(--bdr);
          border-radius: 20px;
          background: var(--bg);
          padding: 32px 30px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .tm-card:hover {
          border-color: var(--acc);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px var(--acc-glow2);
        }
        .tm-stars { display: flex; gap: 5px; }
        .tm-star { color: var(--acc); fill: var(--acc); }
        .tm-quote {
          font-family: var(--font-head);
          font-size: 17px;
          line-height: 1.7;
          color: var(--fg);
          font-weight: 500;
          letter-spacing: -0.2px;
          margin: 0;
          flex: 1;
        }
        .tm-author { display: flex; align-items: center; gap: 14px; }
        .tm-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: var(--acc-glow);
          border: 1px solid var(--acc);
          color: var(--acc);
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tm-name { font-family: var(--font-body); font-size: 14.5px; font-weight: 700; color: var(--fg); }
        .tm-role { font-family: var(--font-body); font-size: 12.5px; color: var(--fg3); margin-top: 3px; }
        @media (max-width: 720px) {
          .tm-section { padding: var(--sec-pad-sm) 0; }
          .tm-card { padding: 26px 24px; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
