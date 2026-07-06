"use client";

import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

const socials = [
  { icon: FiGithub,   label: "GitHub",   href: "https://github.com/deepakkandpal004" },
  { icon: FiLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/deepakkandpal" },
  { icon: FiTwitter,  label: "Twitter",  href: "https://x.com/rsdeepakg1" },
  { icon: FiMail,     label: "Email",    href: "mailto:d.kandpal1832@gmail.com" },
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
                transition: "color 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "var(--acc)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--fg3)";
                e.currentTarget.style.transform = "translateY(0)";
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
