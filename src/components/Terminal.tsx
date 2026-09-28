"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Line = { text: string; kind: "cmd" | "out" | "sys" };

const PROMPT_USER = "deepak@portfolio";
const PROMPT_PATH = "~";

const BOOT_LINES: string[] = [
  "Initializing portfolio shell v2.1 ...",
  "Loading projects, skills and questionable life choices ... done.",
  "Type 'help' to see what you can ask me.",
];

const HELP_LINES: string[] = [
  "Available commands:",
  "  whoami       — who is Deepak?",
  "  skills       — his tech stack",
  "  projects     — what he has built",
  "  experience   — where he has worked",
  "  contact      — how to reach him",
  "  socials      — links to his profiles",
  "  resume       — open his resume",
  "  clear        — clear the terminal",
];

function runCommand(raw: string): { lines: Line[]; action?: () => void } {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0] || "";
  const args = parts.slice(1);
  const out = (lines: string[]): Line[] => lines.map((text) => ({ text, kind: "out" as const }));

  switch (cmd.toLowerCase()) {
    case "":
      return { lines: [] };
    case "help":
      return { lines: out(HELP_LINES) };
    case "whoami":
      return {
        lines: out([
          "Deepak Kandpal — Full-Stack Developer (MERN) from Pantnagar, India.",
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
          "1. CareerForge     — AI resume builder (Groq AI, ATS scoring, 7 templates)",
          "2. Finora          — AI expense tracker (receipt scanning, budgets, savings goals)",
          "3. Trim            — URL shortener (custom aliases, QR codes, 57 unit tests)",
          "4. macOS Portfolio — macOS-inspired interactive portfolio (GSAP, Zustand)",
          "",
          "Tip: click any project card on this page for the full case study.",
        ]),
      };
    case "experience":
      return {
        lines: out([
          "SDE Intern — sevaSYNC Digital Solutions Pvt. Ltd. (Remote)",
          "Jun 2026 – Aug 2026",
          "- Built full-stack apps with Next.js, PostgreSQL & REST APIs",
          "- Managed Docker-based deployments & production releases",
          "- Shipped web, mobile & backend features with the marketing team",
        ]),
      };
    case "contact":
      return {
        lines: out([
          "Email: deepakkandpal.tech@gmail.com",
          "Scroll down to the contact section — or just type 'socials'.",
        ]),
      };
    case "socials":
      return {
        lines: out([
          "GitHub:    github.com/deepakkandpal004",
          "LinkedIn:  linkedin.com/in/deepakkandpal",
          "Twitter/X:  x.com/codedbydeepak",
          "LeetCode:  search 'deepakkandpal' — he is there too.",
        ]),
      };
    case "resume":
      return {
        lines: out(["Opening resume.pdf ..."]),
        action: () => window.open("/resume.pdf", "_blank"),
      };
    case "sudo":
      return {
        lines: out([
          "Permission denied: you are not in the sudoers file.",
          "This incident will be reported to Deepak.",
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
          }, 450);
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

  const submit = () => {
    const raw = input;
    if (raw.trim().toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      setHistory((h) => [raw, ...h]);
      setHistIdx(-1);
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
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
          <p className="term-eyebrow">
            <span className="term-dollar">$</span> cd ~/playground
          </p>
          <h2 className="t-h2">
            Don&apos;t take my word for it —<br />
            <span className="term-grad">ask the terminal</span>
            <span className="term-caret" aria-hidden="true" />
          </h2>
          <p className="t-body term-sub">
            A tiny shell that knows everything about Deepak. Type <code>help</code> and poke around.
          </p>
        </motion.div>

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
            <span><kbd>↑</kbd><kbd>↓</kbd> history</span>
            <span><kbd>clear</kbd> wipe screen</span>
            <span className="term-footer-try">psst — try <span>sudo</span></span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .term-section { background: transparent; padding: var(--sec-pad) 0; }
        .term-heading { max-width: 720px; margin: 0 auto 56px; text-align: center; }
        .term-heading .t-h2 { margin-bottom: 18px !important; }
        .term-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          letter-spacing: 0.5px;
          color: var(--fg3);
          border: 1px solid var(--bdr);
          background: var(--bg2);
          padding: 9px 18px;
          border-radius: 999px;
          margin-bottom: 26px;
          box-shadow: 0 0 32px -8px var(--violet-glow);
        }
        .term-dollar { color: var(--acc-light); font-weight: 700; }
        .term-grad {
          background: linear-gradient(100deg, #ffffff 15%, var(--acc-light) 60%, var(--acc) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .term-caret {
          display: inline-block;
          width: 13px;
          height: 1em;
          margin-left: 10px;
          vertical-align: -0.12em;
          border-radius: 2px;
          background: var(--acc);
          box-shadow: 0 0 16px var(--acc-glow);
          animation: term-blink 1.1s steps(2, start) infinite;
        }
        @keyframes term-blink { to { visibility: hidden; } }
        .term-sub { max-width: 520px; margin: 0 auto; }
        .term-sub code {
          background: var(--bg3);
          border: 1px solid var(--bdr);
          border-radius: 6px;
          padding: 2px 8px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          color: var(--acc);
        }
        .term-window {
          position: relative;
          max-width: 780px;
          margin: 0 auto;
          border: 1px solid var(--bdr2);
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg2);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5), 0 0 80px -24px var(--violet-glow);
          cursor: text;
        }
        .term-window::before {
          content: "";
          position: absolute;
          top: -1px;
          left: 32px;
          right: 32px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--acc), transparent);
          opacity: 0.7;
          z-index: 2;
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
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12.5px;
          color: var(--fg3);
        }
        .term-shell {
          margin-left: auto;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
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
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 14px;
          line-height: 1.7;
        }
        .term-body::-webkit-scrollbar { width: 8px; }
        .term-body::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 8px; }
        .term-line { white-space: pre-wrap; word-break: break-word; }
        .term-sys { color: var(--fg3); }
        .term-out { color: var(--fg2); }
        .term-cmd { color: var(--fg); }
        .term-prompt { color: #4ade80; font-weight: 600; }
        .term-path { color: #60a5fa; font-weight: 600; }
        .term-colon { color: var(--fg3); }
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
        .term-footer {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 11px 22px;
          border-top: 1px solid var(--bdr);
          background: var(--bg3);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11.5px;
          color: var(--fg3);
        }
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
        .term-footer-try { margin-left: auto; }
        .term-footer-try span { color: var(--acc-light); font-weight: 600; }
        @media (max-width: 720px) {
          .term-section { padding: var(--sec-pad-sm) 0; }
          .term-body { height: 320px; font-size: 13px; }
          .term-input { font-size: 16px; }
        }
      `}</style>
    </section>
  );
};

export default Terminal;
