"use client";

import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { label: "About",   href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills",  href: "#skills" },
  { label: "GitHub",  href: "#github" },
  { label: "Work",    href: "#work" },
  { label: "Contact", href: "#contact" },
  { label: "Blog",    href: "/blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // Sticky shrink + blur + hide on scroll down / show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (open) {
        setHidden(false);
      } else if (y > lastY.current && y > 140) {
        setHidden(true);
      } else if (y < lastY.current) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Scrollspy to detect active section in viewport (only active on Home page)
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sections = ["about", "experience", "skills", "github", "work", "blog", "contact"];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px",
          threshold: 0,
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(item => {
        if (item) item.observer.disconnect();
      });
    };
  }, [isHome, pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}${hidden ? " hidden" : ""}`}>
        <div className="container nav-inner">
          {/* Logo */}
          <Link href="/" onClick={close} style={{
            fontFamily: "var(--font-head)",
            fontWeight: 700, fontSize: 17,
            letterSpacing: "2px",
            color: "var(--fg)",
            userSelect: "none",
          }}>
            DK<span style={{ color: "var(--acc)" }}>.</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links" style={{
            display: "flex", gap: 4, listStyle: "none", alignItems: "center",
            margin: 0, padding: 0,
          }}>
            {navItems.map(item => {
              const isRouteLink = item.href.startsWith("/");
              const isActive = isRouteLink
                ? (pathname ?? "").startsWith(item.href)
                : isHome && `#${activeSection}` === item.href;

              const linkHref = isRouteLink
                ? item.href
                : (isHome ? item.href : `/${item.href}`);

              const linkContent = (
                <span className={`nav-link${isActive ? " active" : ""}`}>
                  {item.label}
                </span>
              );

              return (
                <li key={item.href}>
                  {isRouteLink ? (
                    <Link href={item.href} style={{ display: "block" }}>{linkContent}</Link>
                  ) : (
                    <a href={linkHref} style={{ display: "block" }}>{linkContent}</a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile controls */}
          <div className="nav-mobile" style={{ display: "none", alignItems: "center" }}>
            <button onClick={() => setOpen(o => !o)} aria-label="Toggle menu" className="nav-menu-btn">
              {open ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <div className="nav-drawer" style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      }}>
        {navItems.map(item => {
          const isRouteLink = item.href.startsWith("/");
          const isActive = isRouteLink
            ? (pathname ?? "").startsWith(item.href)
            : isHome && `#${activeSection}` === item.href;

          const linkHref = isRouteLink
            ? item.href
            : (isHome ? item.href : `/${item.href}`);

          const linkStyle = {
            fontFamily: "var(--font-head)",
            fontSize: 28, fontWeight: 700,
            letterSpacing: "-0.5px",
            color: isActive ? "var(--acc)" : "var(--fg2)",
            padding: "10px 0",
            display: "block" as const,
          };

          return (
            <li key={item.href} style={{ listStyle: "none" }}>
              {isRouteLink ? (
                <Link href={item.href} onClick={close} style={linkStyle}>
                  {item.label}
                </Link>
              ) : (
                <a href={linkHref} onClick={close} style={linkStyle}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </div>

      <style>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 200;
          background: var(--bg);
          border-bottom: 1px solid transparent;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.3s ease;
        }
        .nav.hidden {
          transform: translateY(-110%);
        }
        .nav.scrolled {
          background: rgba(11, 10, 8, 0.82);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          backdrop-filter: blur(12px) saturate(140%);
          border-bottom-color: var(--bdr);
        }
        .nav::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(60% 150% at 50% -30%, rgba(245, 158, 11, 0.20), rgba(245, 158, 11, 0.06) 45%, transparent 70%);
        }
        .nav-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          padding-bottom: 18px;
          transition: padding 0.25s ease;
        }
        .nav.scrolled .nav-inner {
          padding-top: 12px;
          padding-bottom: 12px;
        }
        section[id] {
          scroll-margin-top: 84px;
        }
        .nav-link {
          position: relative;
          font-family: var(--font-body);
          font-size: 14px; font-weight: 500;
          color: var(--fg2);
          padding: 8px 12px;
          display: block;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 3px;
          height: 2px;
          border-radius: 2px;
          background: var(--acc);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-link:hover { color: var(--fg); }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
        .nav-link.active { color: var(--acc); font-weight: 600; }
        .nav-menu-btn {
          background: none; border: 1px solid var(--bdr2);
          border-radius: var(--r); color: var(--fg);
          width: 36px; height: 36px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .nav-drawer {
          position: fixed; inset: 0; z-index: 199;
          background: var(--bg);
          display: none;
          flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          transition: opacity 0.25s;
        }
        @media (max-width: 640px) {
          .nav-links  { display: none !important; }
          .nav-mobile { display: flex !important; }
          .nav-drawer { display: flex !important; }
        }
        @media (min-width: 641px) {
          .nav-drawer { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
