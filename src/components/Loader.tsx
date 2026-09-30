"use client";

import { useEffect, useState } from "react";

const Loader = () => {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const hide = () => {
      (window as any).__siteLoaded = true;
      window.dispatchEvent(new Event("site-loaded"));
      setLeaving(true);
      setTimeout(() => setGone(true), 500);
    };
    if (document.readyState === "complete") {
      const t = setTimeout(hide, 900);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", hide);
    const fallback = setTimeout(hide, 2500);
    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(fallback);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`loader ${leaving ? "loader-hide" : ""}`} aria-hidden="true">
      <div className="loader-inner">
        <p className="loader-name">Deepak Kandpal</p>
        <div className="loader-bar">
          <span />
        </div>
      </div>

      <style>{`
        .loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          transition: opacity 0.5s ease;
        }
        .loader-hide {
          opacity: 0;
          pointer-events: none;
        }
        .loader-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          animation: loader-inner-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .loader-name {
          font-family: var(--font-head);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--fg);
          margin: 0;
          animation: loader-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }
        .loader-name::after {
          content: ".";
          color: var(--acc);
        }
        .loader-bar {
          width: 132px;
          height: 2px;
          border-radius: 2px;
          background: var(--bdr);
          overflow: hidden;
          animation: loader-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both;
        }
        .loader-bar span {
          display: block;
          width: 40%;
          height: 100%;
          border-radius: 2px;
          background: var(--acc);
          animation: loader-slide 1.1s ease-in-out infinite;
        }
        @keyframes loader-inner-in {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes loader-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loader-slide {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(280%); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
