"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Line = { text: string; kind: "cmd" | "out" | "sys" | "art" };

const PROMPT_USER = "portfolio@deepakkandpal";
const PROMPT_PATH = "~";

const COMMANDS = [
  "help", "whoami", "skills", "projects", "experience", "contact",
  "socials", "resume", "ls", "cd", "open", "hire", "history",
  "date", "echo", "sudo", "rm", "clear", "cls",
];

const BOOT_LINES: string[] = [
  "✓ Portfolio shell ready",
  "Type 'help' to see what you can ask.",
];

const HELP_LINES: string[] = [
  "about me \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
  "  whoami       who is Deepak?",
  "  skills       his tech stack",
  "  projects     what he has built",
  "  experience   where he has worked",
  "  contact      how to reach him",
  "  socials      links to his profiles",
  "  resume       open his resume",
  "",
  "navigation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
  "  ls           list sections",
  "  cd <name>    jump to a section (e.g. cd projects)",
  "  open <name>  open a project page (e.g. open finora)",
  "  hire         get in touch",
  "",
  "shell   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
  "  history      what you have typed",
  "  date         current date & time",
  "  clear        wipe the screen",
];

const SECTION_IDS: Record<string, string> = {
  about: "about",
  experience: "experience",
  skills: "skills",
  projects: "work",
  contact: "contact",
};

function runCommand(raw: string): { lines: Line[]; action?: () => void } {
  const parts = raw.trim().split(/\s+/);
  const cmd = (parts[0] || "").toLowerCase();
  const args = parts.slice(1);
  const out = (texts: string[]): Line[] => texts.map((text) => ({ text, kind: "out" as const }));

  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
      return { lines: out(HELP_LINES) };
    case "whoami":
      return {
        lines: out([
          "Deepak Kandpal \u2014 Full-Stack Developer (MERN) from Pantnagar, India.",
          "SDE Intern @ sevaSYNC. Ships production apps with React, Next.js, Node.js & TypeScript.",
          "Currently open to full-time opportunities.",
        ]),
      };
    case "skills":
      return {
        lines: out([
          "Languages:   JavaScript, TypeScript, C++, SQL",
          "Frontend:    React.js, Next.js, Tailwind CSS, Redux",
          "Backend:     Node.js, Express.js, REST APIs, JWT, Zod",
          "Databases:   PostgreSQL, MongoDB, Prisma, Drizzle, Mongoose",
          "Tools:       Git, Docker, Postman, GitHub Actions",
        ]),
      };
    case "projects":
      return {
        lines: out([
          "1. CareerForge     \u2014 AI resume builder (Groq AI, ATS scoring, 7 templates)",
          "2. Finora          \u2014 AI expense tracker (receipt scanning, budgets, savings goals)",
          "3. Trim            \u2014 URL shortener (custom aliases, QR codes, 57 unit tests)",
          "4. macOS Portfolio \u2014 macOS-inspired interactive portfolio (GSAP, Zustand)",
          "",
          "Tip: click any project card on this page for the full case study.",
        ]),
      };
    case "experience":
      return {
        lines: out([
          "SDE Intern \u2014 sevaSYNC Digital Solutions Pvt. Ltd. (Remote)",
          "Jun 2026 \u2013 Aug 2026",
          "- Built full-stack apps with Next.js, PostgreSQL & REST APIs",
          "- Managed Docker-based deployments & production releases",
          "- Shipped web, mobile & backend features with the marketing team",
        ]),
      };
    case "contact":
      return {
        lines: out([
          "Email: deepakkandpal.tech@gmail.com",
          "Scroll down to the contact section \u2014 or just type 'socials'.",
        ]),
      };
    case "socials":
      return {
        lines: out([
          "GitHub:    github.com/deepakkandpal004",
          "LinkedIn:  linkedin.com/in/deepakkandpal",
          "Twitter/X: x.com/codedbydeepak",
          "LeetCode:  search 'deepakkandpal' \u2014 he is there too.",
        ]),
      };
    case "resume":
      return {
        lines: out(["Opening resume.pdf ..."]),
        action: () => window.open("/resume.pdf", "_blank"),
      };
    case "ls":
      return {
        lines: out(["about/  experience/  skills/  projects/  contact/  resume.pdf"]),
      };
    case "cd": {
      if (args.length === 0) return { lines: out(["cd: missing operand \u2014 try 'cd projects'."]) };
      const target = args[0].toLowerCase();
      if (target === "..") return { lines: out(["Already at the root of awesomeness."]) };
      const dest = SECTION_IDS[target];
      if (!dest) return { lines: out(["cd: no such directory: " + args[0]]) };
      return {
        lines: out(["Jumping to #" + dest + " ..."]),
        action: () => document.getElementById(dest)?.scrollIntoView({ behavior: "smooth" }),
      };
    }
    case "date":
      return { lines: out([new Date().toString()]) };
    case "open": {
      const p = (args[0] || "").toLowerCase();
      const pages: Record<string, string> = {
        careerforge: "/projects/careerforge",
        finora: "/projects/finora",
        trim: "/projects/trim",
        macos: "/projects/macos-portfolio",
        "macos-portfolio": "/projects/macos-portfolio",
        blog: "/blog",
      };
      if (!p)
        return {
          lines: out([
            "open: missing operand — try one of:",
            "  open careerforge | open finora | open trim | open macos | open blog",
          ]),
        };
      const dest = pages[p];
      if (!dest) return { lines: out(["open: no such project: " + args[0]]) };
      return {
        lines: out(["Opening " + dest + " ..."]),
        action: () => window.open(dest, "_blank"),
      };
    }
    case "hire":
      return {
        lines: out(["Excellent choice.", "Taking you to the contact section — let's talk."]),
        action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "rm":
      if (args.includes("-rf") && args.join(" ").includes("/"))
        return { lines: out(["rm: cannot remove '/': Permission denied. Nice try though."]) };
      return { lines: out(["rm: refusing to delete things on a portfolio. Growth mindset."]) };
    case "sudo":
      return {
        lines: out([
          "Permission denied: you are not in the sudoers file.",
          "This incident will be reported to Deepak. (He already knows.)",
        ]),
      };
    case "echo":
      return { lines: out([args.join(" ")]) };
    default:
      return {
        lines: out(["Command not found: " + cmd + ". Type 'help' to see available commands."]),
      };
  }
}

const Terminal = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = document.getElementById("terminal-window");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let i = 0;
          const t = setInterval(() => {
            if (i < BOOT_LINES.length) {
              const line = BOOT_LINES[i];
              setLines((prev) => [...prev, { text: line, kind: "sys" }]);
              i++;
            } else {
              clearInterval(t);
              setBooted(true);
            }
          }, 400);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const focusInput = () => inputRef.current?.focus();

  const runRaw = (raw: string) => {
    const normalized = raw.trim().toLowerCase();
    if (normalized === "clear" || normalized === "cls") {
      setLines([]);
      setInput("");
      setHistory((h) => [raw, ...h]);
      setHistIdx(-1);
      return;
    }
    if (normalized === "history") {
      const histLines: Line[] =
        history.length === 0
          ? [{ text: "No commands yet. Make some history.", kind: "out" }]
          : [...history]
              .reverse()
              .map((h, i) => ({ text: `${i + 1}  ${h}`, kind: "out" as const }));
      setLines((prev) => [...prev, { text: "CMD::" + raw, kind: "cmd" }, ...histLines]);
      setHistory((h) => [raw, ...h]);
      setHistIdx(-1);
      setInput("");
      return;
    }
    const result = runCommand(raw);
    const cmdText = raw.split("$ ").pop() ?? raw;
    setLines((prev) => [...prev, { text: "CMD::" + cmdText, kind: "cmd" }, ...result.lines]);
    setHistory((h) => [raw, ...h]);
    setHistIdx(-1);
    setInput("");
    if (result.action) setTimeout(result.action, 350);
  };

  const submit = () => runRaw(input);

  const complete = () => {
    const q = input.trim().toLowerCase().split(/\s+/)[0];
    if (!q) return;
    const matches = COMMANDS.filter((c) => c.startsWith(q));
    if (matches.length === 1) {
      setInput(matches[0] + " ");
    } else if (matches.length > 1) {
      let prefix = matches[0];
      for (const m of matches) {
        let i = 0;
        while (i < prefix.length && prefix[i] === m[i]) i++;
        prefix = prefix.slice(0, i);
      }
      if (prefix.length > q.length) setInput(prefix);
      else setLines((prev) => [...prev, { text: matches.join("   "), kind: "sys" }]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx <= 0) {
        setHistIdx(-1);
        setInput("");
      } else {
        const next = histIdx - 1;
        setHistIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <section id="playground" className="term-section">
      <div className="container">
        <motion.div
          className="term-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="t-label">Playground</p>
          <h2 className="t-h2">
            Skip the small talk.<br />
            <span className="term-accent">Ask the terminal.</span>
          </h2>
          <p className="t-body term-sub">
            A live shell wired to everything about Deepak — projects, stack, and experience. Type <code>help</code> to begin.
          </p>
        </motion.div>

        {booted && (
          <div className="term-chips">
            {["whoami", "projects", "skills", "open finora", "experience", "hire"].map((c) => (
              <button key={c} type="button" className="term-chip" onClick={() => runRaw(c)}>
                <span>$</span> {c}
              </button>
            ))}
          </div>
        )}

        <motion.div
          id="terminal-window"
          className="term-window"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          onClick={focusInput}
        >
          <div className="term-titlebar">
            <span className="term-dot" style={{ background: "#ff5f57" }} />
            <span className="term-dot" style={{ background: "#febc2e" }} />
            <span className="term-dot" style={{ background: "#28c840" }} />
            <span className="term-title">deepak@portfolio: ~</span>
            <span className="term-shell">bash</span>
          </div>

          <div ref={bodyRef} className="term-body">
            {lines.map((l, i) => (
              <div key={i} className={"term-line term-" + l.kind}>
                {l.kind === "cmd" ? (
                  <span>
                    <span className="term-prompt">{PROMPT_USER}</span>
                    <span className="term-colon">:</span>
                    <span className="term-path">{PROMPT_PATH}</span>
                    <span className="term-colon">$ </span>
                    <span className="term-cmdtext">{l.text.replace(/^CMD::/, "")}</span>
                  </span>
                ) : (
                  l.text
                )}
              </div>
            ))}
            {booted && (
              <div className="term-line term-cmd">
                <span className="term-prompt">{PROMPT_USER}</span>
                <span className="term-colon">:</span>
                <span className="term-path">{PROMPT_PATH}</span>
                <span className="term-colon">$ </span>
                <input
                  ref={inputRef}
                  className="term-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </div>
            )}
          </div>
          <div className="term-footer">
            <span className="term-status"><span className="term-status-dot" />portfolio-shell v2.1</span>
            <span className="term-hints">
              <span><kbd>↑</kbd><kbd>↓</kbd> history</span>
              <span><kbd>tab</kbd> complete</span>
              <span><kbd>clear</kbd> wipe</span>
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .term-section { background: transparent; padding: var(--sec-pad) 0; }
        .term-heading { max-width: 720px; margin: 0 auto 56px; text-align: center; }
        .term-heading .t-label { margin-bottom: 22px; }
        .term-heading .t-h2 { margin-bottom: 18px !important; font-size: clamp(36px, 5vw, 52px); }
        .term-heading .term-accent { color: var(--acc); }
        .term-sub { max-width: 520px; margin: 0 auto; font-size: 16.5px; }
        .term-sub code {
          background: var(--bg3);
          border: 1px solid var(--bdr);
          border-radius: 6px;
          padding: 2px 8px;
          font-family: var(--term-font);
          font-size: 13px;
          color: var(--acc);
        }
        .term-window {
          --term-font: var(--font-term), ui-monospace, SFMono-Regular, Menlo, monospace;
          position: relative;
          max-width: 780px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid transparent;
          background:
            linear-gradient(var(--bg2), var(--bg2)) padding-box,
            linear-gradient(165deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.03) 35%, rgba(251, 191, 36, 0.10) 100%) border-box;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55), 0 0 60px -25px rgba(251, 191, 36, 0.35);
        }
        .term-titlebar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 18px;
          background: var(--bg3);
          border-bottom: 1px solid var(--bdr);
        }
        .term-dot { width: 12px; height: 12px; border-radius: 50%; }
        .term-title {
          margin-left: 8px;
          font-family: var(--term-font);
          font-size: 12.5px;
          color: var(--fg2);
          letter-spacing: 0.02em;
        }
        .term-shell {
          margin-left: auto;
          font-family: var(--term-font);
          font-size: 11.5px;
          color: var(--fg3);
          border: 1px solid var(--bdr);
          background: var(--bg2);
          padding: 3px 12px;
          border-radius: 999px;
        }
        .term-body {
          height: 380px;
          overflow-y: auto;
          padding: 20px 22px;
          font-family: var(--term-font);
          font-size: 14px;
          line-height: 1.8;
          letter-spacing: 0.01em;
          font-variant-ligatures: contextual;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          background-image: radial-gradient(ellipse 90% 55% at 50% -10%, rgba(251, 191, 36, 0.04), transparent 70%);
        }
        .term-body::-webkit-scrollbar { width: 8px; }
        .term-body::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 8px; }
        .term-line { white-space: pre-wrap; word-break: break-word; animation: term-in 0.28s ease both; }
        @keyframes term-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
        .term-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 780px;
          margin: 0 auto 30px;
          animation: term-in 0.4s ease both;
        }
        .term-chip {
          font-family: var(--font-term), ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12.5px;
          color: var(--fg2);
          background: var(--bg2);
          border: 1px solid var(--bdr2);
          border-radius: 999px;
          padding: 8px 18px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .term-chip span { color: var(--acc); margin-right: 6px; font-weight: 700; }
        .term-chip:hover {
          border-color: var(--acc);
          color: var(--fg);
          box-shadow: 0 0 20px -10px var(--acc);
          transform: translateY(-1px);
        }
        .term-chip:active { transform: translateY(0); }
        .term-sys { color: var(--fg3); }
        .term-out { color: var(--fg2); }
        .term-cmd { color: var(--fg); }
        .term-prompt { color: var(--fg2); font-weight: 600; }
        .term-path { color: var(--acc); font-weight: 600; }
        .term-colon { color: var(--fg3); font-weight: 500; }
        .term-cmdtext { color: var(--fg); }
        .term-input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--fg);
          font-family: inherit;
          font-size: inherit;
          width: 60%;
          caret-color: var(--acc);
        }
        /* Kill the global input:focus glow/outline for the terminal input */
        .term-input:focus {
          border: none;
          box-shadow: none;
          background: transparent;
        }
        .term-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 10px 20px;
          border-top: 1px solid var(--bdr);
          background: rgba(0, 0, 0, 0.28);
          font-family: var(--term-font);
          font-size: 11.5px;
          color: var(--fg3);
        }
        .term-status { display: inline-flex; align-items: center; gap: 8px; }
        .term-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--acc);
          box-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
        }
        .term-hints { display: inline-flex; align-items: center; gap: 16px; }
        .term-footer kbd {
          display: inline-block;
          border: 1px solid var(--bdr2);
          border-bottom-width: 2px;
          border-radius: 5px;
          background: var(--bg2);
          color: var(--fg2);
          font-family: inherit;
          font-size: 11px;
          padding: 1px 8px;
          margin-right: 7px;
        }
        @media (max-width: 720px) {
          .term-section { padding: var(--sec-pad-sm) 0; }
          .term-body { height: 320px; font-size: 13px; }
          .term-input { font-size: 16px; }
          .term-footer { padding: 10px 16px; }
          .term-hints { gap: 10px; }
        }
      `}</style>
    </section>
  );
};

export default Terminal;
