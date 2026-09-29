"use client";

import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navBg = scrolled ? "rgba(5, 7, 12, 0.82)" : "transparent";

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 210,
          height: 2, width: `${progress}%`,
          background: "linear-gradient(90deg, var(--acc), #f59e0b)",
          boxShadow: "0 0 12px var(--acc-glow)",
          transition: "width 0.08s linear",
          pointerEvents: "none",
        }}
      />
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        borderBottom: scrolled ? "1px solid var(--bdr)" : "1px solid transparent",
        background: navBg,
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}>
        <div style={{
          maxWidth: "var(--max-w)", margin: "0 auto",
          padding: `${scrolled ? "14px" : "22px"} var(--pad-x)`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          transition: "padding 0.3s ease",
        }}>
          {/* Logo */}
          <Link href="/" onClick={close} style={{
            fontFamily: "var(--font-head)",
            fontWeight: 700, fontSize: 19,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "var(--fg)",
            userSelect: "none",
          }}>
            DK<span style={{ color: "var(--acc)" }}>.</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links" style={{
            display: "flex", gap: 4, listStyle: "none", alignItems: "center",
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
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--acc)" : "var(--fg2)",
                  padding: "8px 14px",
                  display: "block",
                  borderRadius: "var(--r)",
                  background: isActive ? "var(--acc-glow2)" : "transparent",
                  boxShadow: isActive ? "0 0 18px var(--acc-glow2)" : "none",
                  transition: "color 0.2s, background 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--fg)";
                      e.currentTarget.style.background = "var(--bg3)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--fg2)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
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
          <div className="nav-mobile" style={{ display: "none", alignItems: "center", gap: 8 }}>
            <button onClick={() => setOpen(o => !o)} aria-label="Toggle menu" style={{
              background: "none", border: "1px solid var(--bdr2)",
              borderRadius: "var(--r)", color: "var(--fg)",
              width: 36, height: 36, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, background 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--acc)"; e.currentTarget.style.background = "var(--acc-glow2)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bdr2)"; e.currentTarget.style.background = "none"; }}
            >
              {open ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <div className="nav-drawer" style={{
        position: "fixed", inset: 0, zIndex: 199,
        background: "var(--bg)",
        display: "none",
        flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 8,
        opacity: open ? 1 : 0,
        transform: open ? "none" : "translateY(-12px)",
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.25s, transform 0.25s",
      }}>
        {navItems.map(item => {
          const isRouteLink = item.href.startsWith("/");
          const isActive = isRouteLink
            ? (pathname ?? "").startsWith(item.href)
            : isHome && `#${activeSection}` === item.href;

          const linkHref = isRouteLink
            ? item.href
            : (isHome ? item.href : `/${item.href}`);

          return (
            <li key={item.href} style={{ listStyle: "none" }}>
              {isRouteLink ? (
                <Link href={item.href} onClick={close} style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 34, fontWeight: 700,
                  letterSpacing: "-0.5px",
                  textTransform: "uppercase",
                  color: isActive ? "var(--acc)" : "var(--fg2)",
                  padding: "10px 0",
                  display: "block",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--acc)")}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? "var(--acc)" : "var(--fg2)")}
                >
                  {item.label}
                </Link>
              ) : (
                <a href={linkHref} onClick={close} style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 34, fontWeight: 700,
                  letterSpacing: "-0.5px",
                  textTransform: "uppercase",
                  color: isActive ? "var(--acc)" : "var(--fg2)",
                  padding: "10px 0",
                  display: "block",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--acc)")}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? "var(--acc)" : "var(--fg2)")}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </div>

      <style>{`
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
