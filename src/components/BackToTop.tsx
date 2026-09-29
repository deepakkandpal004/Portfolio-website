"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-top ${show ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <FiArrowUp size={18} />
      <style>{`
        .back-top {
          position: fixed;
          left: 104px;
          bottom: 40px;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          color: var(--fg2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: translateY(12px);
          pointer-events: none;
          transition: opacity 0.3s, transform 0.3s, border-color 0.2s, color 0.2s;
          z-index: 150;
        }
        .back-top.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .back-top:hover { border-color: var(--acc); color: var(--acc); }
        @media (max-width: 768px) {
          .back-top { left: 16px; bottom: 16px; }
        }
      `}</style>
    </button>
  );
};

export default BackToTop;
