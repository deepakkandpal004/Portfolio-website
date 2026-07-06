"use client";

import { useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight } from "react-icons/fi";
import ContactForm from "./ContactForm";

const socials = [
  { icon: FiMail,     label: "Email",    detail: "d.kandpal1832@gmail.com",   href: "mailto:d.kandpal1832@gmail.com" },
  { icon: FiGithub,   label: "GitHub",   detail: "deepakkandpal004",          href: "https://github.com/deepakkandpal004" },
  { icon: FiLinkedin, label: "LinkedIn", detail: "/in/deepakkandpal",         href: "https://www.linkedin.com/in/deepakkandpal" },
  { icon: FiTwitter,  label: "Twitter",  detail: "@rsdeepakg1",               href: "https://x.com/rsdeepakg1" },
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
                  transition: "background 0.2s, padding-left 0.2s",
                }}
                  className="contact-social-row"
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--bg2)";
                    e.currentTarget.style.paddingLeft = "20px";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.paddingLeft = "14px";
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
            Built with React + TypeScript + Vite
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px 0 !important; }
          .contact-social-row:hover { padding-left: 14px !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
