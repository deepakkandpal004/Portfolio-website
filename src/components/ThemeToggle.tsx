"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/src/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle theme" style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 34, height: 34,
      background: "none",
      border: "1px solid var(--bdr2)",
      borderRadius: "var(--r)",
      cursor: "pointer",
      color: "var(--fg3)",
      flexShrink: 0,
      transition: "color 0.25s, border-color 0.25s, box-shadow 0.25s",
    }}
      onMouseEnter={e => { e.currentTarget.style.color = "var(--acc)"; e.currentTarget.style.borderColor = "var(--acc)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(245, 158, 11, 0.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = "var(--fg3)"; e.currentTarget.style.borderColor = "var(--bdr2)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <span style={{ display: "inline-flex", transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)", transform: theme === "light" ? "rotate(180deg)" : "rotate(0)" }}>
        {theme === "dark" ? <FiMoon size={14} /> : <FiSun size={14} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
