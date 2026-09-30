"use client";

import { useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight, FiInstagram, FiCalendar, FiClock } from "react-icons/fi";
import ContactForm from "./ContactForm";

const CALENDLY_URL = "https://calendly.com/deepakkandpal-tech/30min";

const socials = [
  { icon: FiMail,     label: "Email",    detail: "deepakkandpal.tech@gmail.com",   href: "mailto:deepakkandpal.tech@gmail.com" },
  { icon: FiGithub,   label: "GitHub",   detail: "deepakkandpal004",          href: "https://github.com/deepakkandpal004" },
  { icon: FiLinkedin, label: "LinkedIn", detail: "/in/deepakkandpal",         href: "https://www.linkedin.com/in/deepakkandpal" },
  { icon: FiTwitter,  label: "Twitter",  detail: "@codedbydeepak",               href: "https://x.com/codedbydeepak" },
  { icon: FiInstagram, label: "Instagram", detail: "@codedbydeepak",             href: "https://instagram.com/codedbydeepak" },
];

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" style={{ paddingBottom: 80 }}>
      <div className="container reveal" ref={ref}>

        <p className="t-label" style={{ marginBottom: 18 }}>Get in touch</p>
        <h2 className="t-h2" style={{ marginBottom: 18 }}>
          Let&apos;s build something <span className="gold">together.</span>
        </h2>
        <p className="t-body" style={{ maxWidth: 480, marginBottom: 22 }}>
          Open to new projects, collaborations, or just a good conversation.
          Send a message and I&apos;ll get back to you.
        </p>

        {/* Response time note */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg3)",
          border: "1px solid var(--bdr)", borderRadius: 999,
          padding: "9px 18px", marginBottom: 56, background: "var(--bg2)",
        }}>
          <FiClock size={13} style={{ color: "var(--acc)", flexShrink: 0 }} />
          Typically replies within 24 hours
        </div>

        {/* Book a call banner */}
        <a
          href={CALENDLY_URL || "#contact"}
          target={CALENDLY_URL ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="book-call-banner glass-card"
        >
          <div className="book-call-icon">
            <FiCalendar size={18} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="book-call-title">Prefer talking over typing?</div>
            <div className="book-call-sub">
              Grab a 15-min intro call straight on my calendar — no back-and-forth emails.
            </div>
          </div>
          <span className="book-call-btn">
            Book a call <FiArrowUpRight size={14} />
          </span>
        </a>

        <div className="contact-card glass-card">

          {/* Social links */}
          <div className="contact-social-col">
            <p className="contact-col-label">Find me on</p>
            <div className="contact-social-list">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-social-row">
                  <span className="contact-social-icon"><s.icon size={15} /></span>
                  <span className="contact-social-text">
                    <span className="contact-social-label">{s.label}</span>
                    <span className="contact-social-detail">{s.detail}</span>
                  </span>
                  <FiArrowUpRight size={14} className="contact-social-arrow" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-col">
            <p className="contact-col-label">Send a message</p>
            <ContactForm />
          </div>
        </div>

      </div>

      <style>{`
        .book-call-banner {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 26px;
          margin-bottom: 56px;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .book-call-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: var(--r-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--acc) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--acc) 30%, transparent);
          color: var(--acc);
        }
        .book-call-title {
          font-family: var(--font-head);
          font-size: 17px;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.3px;
          margin-bottom: 4px;
        }
        .book-call-sub {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--fg2);
          line-height: 1.55;
        }
        .book-call-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          padding: 12px 24px;
          border-radius: 12px;
          background: var(--acc);
          color: #07100e;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 700;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 640px) {
          .book-call-banner { flex-wrap: wrap; }
          .book-call-btn { width: 100%; justify-content: center; }
        }
        .contact-card {
          display: grid;
          grid-template-columns: 340px 1fr;
          padding: 0;
          overflow: hidden;
        }
        .contact-social-col {
          padding: 34px 30px;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }
        .contact-form-col {
          padding: 34px 36px;
        }
        .contact-col-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--fg3);
          margin: 0 0 20px;
        }
        .contact-social-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .contact-social-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: var(--r-md);
          border: 1px solid transparent;
          transition: background 0.25s, border-color 0.25s;
        }
        .contact-social-row:hover {
          background: rgba(255, 255, 255, 0.045);
          border-color: rgba(255, 255, 255, 0.10);
        }
        .contact-social-row:hover .contact-social-arrow {
          transform: translate(2px, -2px);
          color: var(--acc);
        }
        .contact-social-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--r-md);
          background: var(--bg2);
          border: 1px solid var(--bdr);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--acc);
          flex-shrink: 0;
        }
        .contact-social-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .contact-social-label {
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--fg);
        }
        .contact-social-detail {
          font-family: var(--font-body);
          font-size: 11.5px;
          color: var(--fg3);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .contact-social-arrow {
          color: var(--fg3);
          flex-shrink: 0;
          transition: transform 0.25s, color 0.25s;
        }
        @media (max-width: 860px) {
          .contact-card { grid-template-columns: 1fr; }
          .contact-social-col {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding: 28px 24px;
          }
          .contact-form-col { padding: 28px 24px; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
