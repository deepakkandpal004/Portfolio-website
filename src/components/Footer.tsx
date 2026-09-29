"use client";

import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";

const socials = [
  { name: "GitHub", href: "https://github.com/deepakkandpal004", Icon: FiGithub },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/deepakkandpal", Icon: FiLinkedin },
  { name: "X", href: "https://x.com/codedbydeepak", Icon: FiTwitter },
  { name: "Instagram", href: "https://instagram.com/codedbydeepak", Icon: FiInstagram },
];

const links = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              Deepak<span className="acc"> Kandpal</span>
            </div>
            <p className="footer-tag">
              Full-stack developer building reliable, production-ready web products.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {links.map((l) => (
              <a key={l.name} href={l.href}>
                {l.name}
              </a>
            ))}
          </nav>

          <div className="footer-socials">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
              >
                <s.Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Deepak Kandpal. All rights reserved.</span>
          <span className="footer-built">Designed &amp; built with Next.js</span>
        </div>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--bdr);
          background: transparent;
          padding: 56px 0 32px;
          margin-top: 40px;
        }
        .footer-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .footer-logo {
          font-family: var(--font-head);
          font-size: 20px;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .footer-tag {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--fg3);
          max-width: 280px;
          line-height: 1.6;
        }
        .footer-nav {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
          align-items: center;
        }
        .footer-nav a {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--fg2);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav a:hover { color: var(--acc); }
        .footer-socials { display: flex; gap: 10px; }
        .footer-socials a {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fg3);
          transition: color 0.25s, border-color 0.25s, transform 0.25s;
        }
        .footer-socials a:hover {
          color: var(--acc);
          border-color: color-mix(in srgb, var(--acc) 45%, transparent);
          transform: translateY(-3px);
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid var(--bdr);
          font-family: var(--font-body);
          font-size: 12.5px;
          color: var(--fg3);
        }
        @media (max-width: 640px) {
          .footer-top { flex-direction: column; gap: 24px; }
          .footer { padding: 44px 0 28px; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
