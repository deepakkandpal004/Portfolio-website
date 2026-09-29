"use client";

import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

type Msg = { from: "bot" | "user"; text: string };

const FALLBACK =
  "I can tell you about Deepak's skills, projects, experience, education, or how to contact him - try one of the suggestions below.";

const KB: { keys: string[]; reply: string }[] = [
  {
    keys: ["careerforge", "resume builder"],
    reply:
      "CareerForge is Deepak's AI-powered resume builder (React, Express, MongoDB, Groq AI). It extracts data from PDF resumes, tailors resumes to job descriptions, scores ATS compatibility, generates cover letters, and keeps 20 versions of history - with JWT auth and 7 templates. Click the CareerForge card on this page for the full case study.",
  },
  {
    keys: ["finora", "expense"],
    reply:
      "Finora is a full-stack expense tracker (Next.js, TypeScript, PostgreSQL, Prisma). It has AI receipt scanning via OpenRouter, budgets, savings goals, recurring transactions and multi-user data isolation, with dashboards across 10+ categories. Click the Finora card on this page for the full case study.",
  },
  {
    keys: ["trim", "url shortener", "shortener"],
    reply:
      "Trim is a full-stack URL shortener (Next.js, PostgreSQL, Drizzle). Custom aliases, link expiry, QR codes, CSV export and 14-day click analytics - with auth built from scratch using scrypt hashing, short-lived JWTs and rotating refresh tokens in HttpOnly cookies. 57 Vitest unit tests and GitHub Actions CI/CD.",
  },
  {
    keys: ["macos", "portfolio project"],
    reply:
      "The macOS Portfolio is an interactive web experience that recreates macOS in the browser - dock with magnification, draggable windows (GSAP), and working Terminal, Safari and Finder apps, powered by Zustand. It's a demo of front-end craft.",
  },
  {
    keys: ["project"],
    reply:
      "Deepak has built 4 production projects: CareerForge (AI resume builder), Finora (AI expense tracker), Trim (URL shortener) and a macOS-inspired portfolio. Ask me about any of them by name, or click a card on this page.",
  },
  {
    keys: ["skill", "tech", "stack", "technolog"],
    reply:
      "Deepak's stack: JavaScript/TypeScript, React.js, Next.js, Tailwind CSS and Redux on the frontend; Node.js, Express.js, REST APIs, JWT and Zod on the backend; PostgreSQL and MongoDB with Prisma, Drizzle and Mongoose; plus Git, Docker and GitHub Actions.",
  },
  {
    keys: ["experience", "work", "intern", "sevasync", "job"],
    reply:
      "Deepak was an SDE Intern at sevaSYNC Digital Solutions (Remote, Jun-Aug 2026), where he built full-stack apps with Next.js and PostgreSQL, managed Docker-based deployments and production releases, and shipped web, mobile and backend features. He's now looking for a full-time role.",
  },
  {
    keys: ["education", "college", "degree", "university", "study", "studied"],
    reply:
      "B.Tech in Computer Science & Engineering from Graphic Era Hill University (2022-2026), CGPA 7.77/10. Also Oracle-certified in Agentic AI Foundations and Docker Foundations.",
  },
  {
    keys: ["contact", "email", "reach", "hire", "phone", "call"],
    reply:
      "You can email him at deepakkandpal.tech@gmail.com, use the contact form at the bottom of this page, or book a 30-min intro call right from the contact section.",
  },
  {
    keys: ["where", "based", "location", "live", "city"],
    reply:
      "He's based in Pantnagar, Uttarakhand, India - and open to remote roles as well as positions in Pune, Noida, Mumbai, Hyderabad, Gurgaon, Delhi NCR and Bengaluru.",
  },
  {
    keys: ["available", "availab", "opportunit", "looking", "open to"],
    reply:
      "Yes - Deepak is actively looking for full-time MERN full-stack developer roles and can join immediately.",
  },
  {
    keys: ["blog", "article", "writing", "writes"],
    reply:
      "He writes about things he's built - JWT auth from scratch, Prisma query optimization and similar. Scroll to the blog section on this page.",
  },
  {
    keys: ["who", "about", "deepak", "yourself", "introduce"],
    reply:
      "Deepak Kandpal is a Full-Stack Developer (MERN) from Pantnagar, India. He was an SDE Intern at sevaSYNC and has shipped 4 production projects with React, Next.js, Node.js and TypeScript. Ask me about his skills, projects or experience.",
  },
  {
    keys: ["hello", "hi", "hey", "namaste"],
    reply:
      "Hey! Ask me anything about Deepak - his skills, projects, experience, or how to reach him.",
  },
  {
    keys: ["thank", "thanks", "great", "nice", "cool", "awesome"],
    reply: "Anytime! If you want to talk to Deepak directly, his email is deepakkandpal.tech@gmail.com.",
  },
];

function answer(q: string): string {
  const s = q.toLowerCase();
  for (const item of KB) {
    if (item.keys.some((k) => s.includes(k))) return item.reply;
  }
  return FALLBACK;
}

const CHIPS = [
  "What are his skills?",
  "Tell me about Finora",
  "Where has he worked?",
  "How can I contact him?",
];

const AskDeepak = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Hi! I'm Deepak's portfolio assistant. Ask me about his skills, projects, or experience." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: answer(q) }]);
      setTyping(false);
    }, 600);
  };

  return (
    <div className="ask-wrap">
      {open && (
        <div className="ask-panel">
          <div className="ask-header">
            <div className="ask-avatar">D</div>
            <div>
              <div className="ask-title">Ask about Deepak</div>
              <div className="ask-status">
                <span className="ask-dot" /> Typically replies instantly
              </div>
            </div>
            <button className="ask-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <FiX size={16} />
            </button>
          </div>

          <div ref={bodyRef} className="ask-body">
            {msgs.map((m, i) => (
              <div key={i} className={"ask-msg ask-" + m.from}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="ask-msg ask-bot ask-typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <div className="ask-chips">
            {CHIPS.map((c) => (
              <button key={c} className="ask-chip" onClick={() => send(c)}>
                {c}
              </button>
            ))}
          </div>

          <form
            className="ask-inputrow"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              className="ask-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects..."
              aria-label="Ask about Deepak"
            />
            <button type="submit" className="ask-send" aria-label="Send">
              <FiSend size={15} />
            </button>
          </form>
        </div>
      )}

      <button
        className="ask-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Ask about Deepak"}
      >
        {open ? <FiX size={20} /> : <FiMessageCircle size={20} />}
        {!open && <span className="ask-fab-label">Ask about Deepak</span>}
      </button>

      <style>{`
        .ask-wrap { position: fixed; right: 24px; bottom: 24px; z-index: 300; display: flex; flex-direction: column; align-items: flex-end; gap: 14px; }
        .ask-fab {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 999px;
          border: 1px solid var(--bdr2);
          background: var(--bg2);
          color: var(--fg);
          cursor: pointer;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .ask-fab:hover { transform: translateY(-2px); box-shadow: 0 16px 48px -8px var(--acc-glow), 0 8px 24px rgba(0, 0, 0, 0.45); }
        .ask-fab-label { font-family: var(--font-body); font-size: 13.5px; font-weight: 600; }
        .ask-panel {
          width: 380px;
          max-width: calc(100vw - 48px);
          height: 520px;
          max-height: calc(100vh - 140px);
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          border: 1px solid var(--bdr2);
          background: var(--bg2);
          box-shadow: 0 32px 90px rgba(0, 0, 0, 0.5), 0 0 80px -32px var(--violet-glow);
          overflow: hidden;
          animation: ask-in 0.25s ease;
        }
        @keyframes ask-in { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }
        .ask-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          border-bottom: 1px solid var(--bdr);
          background: var(--bg3);
        }
        .ask-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--acc);
          color: #07100e;
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 6px 20px -4px var(--acc-glow);
        }
        .ask-title { font-family: var(--font-head); font-size: 15px; font-weight: 700; color: var(--fg); }
        .ask-status { display: flex; align-items: center; gap: 6px; font-family: var(--font-body); font-size: 11.5px; color: var(--fg3); margin-top: 2px; }
        .ask-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; }
        .ask-close {
          margin-left: auto;
          background: none;
          border: none;
          color: var(--fg3);
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
        }
        .ask-close:hover { color: var(--fg); background: var(--bg4); }
        .ask-body {
          flex: 1;
          overflow-y: auto;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ask-msg {
          max-width: 85%;
          padding: 11px 15px;
          border-radius: 16px;
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.6;
        }
        .ask-bot {
          align-self: flex-start;
          background: var(--bg3);
          border: 1px solid var(--bdr);
          color: var(--fg2);
          border-bottom-left-radius: 6px;
        }
        .ask-user {
          align-self: flex-end;
          background: var(--acc);
          color: #07100e;
          font-weight: 500;
          border-bottom-right-radius: 6px;
        }
        .ask-typing { display: inline-flex; gap: 5px; padding: 14px 18px; }
        .ask-typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--fg3); animation: ask-blink 1.2s infinite; }
        .ask-typing span:nth-child(2) { animation-delay: 0.2s; }
        .ask-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes ask-blink { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
        .ask-chips { display: flex; gap: 8px; padding: 4px 18px 12px; overflow-x: auto; }
        .ask-chip {
          flex-shrink: 0;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid var(--bdr2);
          background: transparent;
          color: var(--acc);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .ask-chip:hover { border-color: color-mix(in srgb, var(--acc) 45%, transparent); background: var(--acc-glow2); }
        .ask-inputrow { display: flex; gap: 10px; padding: 14px 18px 18px; border-top: 1px solid var(--bdr); }
        .ask-input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid var(--bdr2);
          background: var(--bg);
          color: var(--fg);
          font-family: var(--font-body);
          font-size: 13.5px;
          outline: none;
        }
        .ask-input:focus { border-color: var(--acc); }
        .ask-send {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border-radius: 12px;
          border: none;
          background: var(--acc);
          color: #07100e;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .ask-send:hover { transform: scale(1.06); box-shadow: 0 8px 24px -6px var(--acc-glow); }
        @media (max-width: 640px) {
          .ask-wrap { right: 16px; bottom: 16px; }
          .ask-fab-label { display: none; }
          .ask-fab { padding: 14px; }
        }
      `}</style>
    </div>
  );
};

export default AskDeepak;
