"use client";

import { useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight, FiInstagram, FiCalendar } from "react-icons/fi";
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
        <p className="t-body" style={{ maxWidth: 480, marginBottom: 56 }}>
          Open to new projects, collaborations, or just a good conversation.
          Send a message and I&apos;ll get back to you.
        </p>

        {/* Book a call banner */}
        <a
          href={CALENDLY_URL || "#contact"}
          target={CALENDLY_URL ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="book-call-banner"
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "0 80px", alignItems: "start" }} className="contact-grid">

          <ContactForm />

          {/* Social links */}
          <div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 11, color: "var(--fg3)",
              fontWeight: 600, marginBottom: 20, letterSpacing: "1.5px", textTransform: "uppercase",
            }}>
              Find me on
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 14px",
                  borderRadius: "var(--r-md)",
                  transition: "background 0.25s, padding-left 0.25s, box-shadow 0.25s, border-color 0.25s",
                }}
                  className="contact-social-row"
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--bg2)";
                    e.currentTarget.style.paddingLeft = "20px";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(245, 158, 11, 0.1)";
                    e.currentTarget.style.borderColor = "var(--acc)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.paddingLeft = "14px";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "var(--bdr)";
                  }}
                >
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: "var(--r-md)",
                    background: "var(--bg2)",
                    border: "1px solid var(--bdr)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--acc)", flexShrink: 0,
                  }}>
                    <s.icon size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "var(--fg)" }}>
                      {s.label}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "var(--fg3)", marginTop: 2 }}>
                      {s.detail}
                    </div>
                  </div>
                  <FiArrowUpRight size={13} style={{ color: "var(--fg3)", flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 80, paddingTop: 28,
          borderTop: "1px solid var(--bdr)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--fg3)", fontWeight: 400 }}>
            © {new Date().getFullYear()} Deepak Kandpal
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--fg3)", fontWeight: 400 }}>
            Built with Next.js + TypeScript
          </span>
        </div>
      </div>

      <style>{`
        .book-call-banner {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 26px;
          margin-bottom: 56px;
          border-radius: var(--r-lg);
          border: 1px solid color-mix(in srgb, var(--acc) 35%, transparent);
          background: linear-gradient(135deg, var(--acc-glow2), transparent 60%), var(--bg2);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .book-call-banner:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--acc) 60%, transparent);
          box-shadow: 0 16px 48px -12px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.45);
        }
        .book-call-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: var(--r-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--acc-glow);
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
          box-shadow: 0 10px 28px -8px var(--acc-glow);
        }
        .book-call-banner:hover .book-call-btn {
          box-shadow: 0 14px 36px -8px var(--acc-glow);
        }
        @media (max-width: 640px) {
          .book-call-banner { flex-wrap: wrap; }
          .book-call-btn { width: 100%; justify-content: center; }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px 0 !important; }
          .contact-social-row:hover { padding-left: 14px !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
