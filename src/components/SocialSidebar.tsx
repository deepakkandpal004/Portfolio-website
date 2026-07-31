"use client";

import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiInstagram } from "react-icons/fi";

const socials = [
  { icon: FiGithub,   label: "GitHub",   href: "https://github.com/deepakkandpal004" },
  { icon: FiLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/deepakkandpal" },
  { icon: FiTwitter,  label: "Twitter",  href: "https://x.com/codedbydeepak" },
  { icon: FiInstagram, label: "Instagram", href: "https://instagram.com/codedbydeepak" },
  { icon: FiMail,     label: "Email",    href: "mailto:deepakkandpal.tech@gmail.com" },
];

const SocialSidebar = () => {
  return (
    <>
      <div className="social-sidebar">
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}>
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Deepak Kandpal on ${s.label}`}
              className="sidebar-link"
              style={{
                color: "var(--fg3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.25s, transform 0.25s, box-shadow 0.25s",
                borderRadius: "10px",
                padding: "6px",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "var(--acc)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(245, 158, 11, 0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--fg3)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>
        {/* Vertical line indicator removed */}
      </div>

      <style>{`
        .social-sidebar {
          position: fixed;
          bottom: 40px;
          left: 48px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeUp 1s ease 0.8s both;
        }

        @media (max-width: 1024px) {
          .social-sidebar {
            left: 24px;
          }
        }

        @media (max-width: 768px) {
          .social-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default SocialSidebar;
