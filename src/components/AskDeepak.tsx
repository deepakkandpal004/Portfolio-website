"use client";

import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";

type Msg = { from: "bot" | "user"; text: string };

const FALLBACK =
  "I can tell you about my skills, projects, internship at sevaSYNC, education, availability, or how to contact me — try a suggestion below, or just ask in your own words.";

const KB: { keys: string[]; reply: string }[] = [
  {
    keys: ["careerforge", "resume builder"],
    reply:
      "CareerForge is my AI resume builder — React, Express, MongoDB and Groq AI. It extracts structured data from PDF resumes, tailors them to job descriptions, scores ATS compatibility, generates cover letters and keeps 20 versions of history. JWT auth, 7 templates. The CareerForge card on this page has the full case study.",
  },
  {
    keys: ["finora", "expense"],
    reply:
      "Finora is my AI expense tracker — Next.js, TypeScript, PostgreSQL and Prisma. AI receipt scanning, budgets with real-time alerts, savings goals, recurring transactions, and strict multi-user data isolation. The Finora card on this page has the full case study.",
  },
  {
    keys: ["trim", "url shortener", "shortener"],
    reply:
      "Trim is my URL shortener — Next.js, PostgreSQL, Drizzle. Custom aliases, link expiry, QR codes, CSV export and 14-day click analytics. I built the auth from scratch: scrypt hashing, short-lived JWTs and rotating refresh tokens. 57 Vitest tests, GitHub Actions CI/CD.",
  },
  {
    keys: ["async job", "job processing", "job queue", "worker", "dlq"],
    reply:
      "Async Job Processing is my backend job queue system — TypeScript, Express, Prisma on PostgreSQL, Redis. Workers claim jobs with leases and heartbeats, retries stay safe via idempotency keys and fencing tokens, failed jobs land in a dead-letter queue with manual retry, and Prometheus + Grafana track throughput. No frontend — pure backend infrastructure.",
  },
  {
    keys: ["project"],
    reply:
      "I've shipped 4 production projects: CareerForge (AI resume builder), Finora (AI expense tracker), Trim (URL shortener) and Async Job Processing (backend job queue). Ask me about any of them by name, or click a card on this page.",
  },
  {
    keys: ["experience", "work", "intern", "sevasync", "job"],
    reply:
      "I was an SDE Intern at sevaSYNC Digital Solutions (remote, Jun–Aug 2026). I built full-stack apps with Next.js and PostgreSQL, managed Docker-based deployments and production releases, and shipped web, mobile and backend features with the marketing team.",
  },
  {
    keys: ["education", "college", "degree", "university", "study", "studied", "cgpa"],
    reply:
      "B.Tech in Computer Science from Graphic Era Hill University (2022–2026), CGPA 7.77/10. I'm also Oracle-certified in Agentic AI Foundations and Docker Foundations.",
  },
  {
    keys: ["skill", "tech", "stack", "technolog", "language"],
    reply:
      "My stack: TypeScript/JavaScript, React, Next.js, Tailwind and Redux up front; Node.js, Express, REST APIs, JWT and Zod on the backend; PostgreSQL and MongoDB with Prisma, Drizzle and Mongoose; plus Git, Docker and GitHub Actions.",
  },
  {
    keys: ["contact", "email", "reach", "hire", "phone", "call", "message"],
    reply:
      "Email me at deepakkandpal.tech@gmail.com, use the contact form at the bottom of this page, or book a 30-min intro call from the contact section.",
  },
  {
    keys: ["social", "github", "linkedin", "twitter", "instagram", "leetcode"],
    reply:
      "I'm on GitHub (deepakkandpal004), LinkedIn (in/deepakkandpal) and X (@codedbydeepak). The links are in the sidebar on the left of this page.",
  },
  {
    keys: ["where", "based", "location", "live", "city"],
    reply:
      "I'm based in Pantnagar, Uttarakhand — open to remote roles and happy to relocate to Pune, Noida, Mumbai, Hyderabad, Gurgaon, Delhi NCR or Bengaluru.",
  },
  {
    keys: ["available", "availab", "opportunit", "looking", "open to"],
    reply:
      "Yes — I'm actively looking for full-time MERN full-stack roles and can join immediately.",
  },
  {
    keys: ["blog", "article", "writing", "writes"],
    reply:
      "I write about things I've built — JWT auth from scratch, Prisma query optimization and similar. Scroll to the blog section on this page.",
  },
  {
    keys: ["who", "about deepak", "about him", "deepak", "yourself", "introduce"],
    reply:
      "I'm Deepak Kandpal, a full-stack developer (MERN) from Pantnagar. I interned at sevaSYNC and have shipped 4 production projects with React, Next.js, Node.js and TypeScript.",
  },
  {
    keys: ["hello", "hi", "hey", "namaste"],
    reply: "Hey! Ask me anything — my skills, projects, experience, or how to reach me.",
  },
  {
    keys: ["thank", "thanks", "great", "nice", "cool", "awesome"],
    reply: "Anytime! My email is deepakkandpal.tech@gmail.com if you want to talk directly.",
  },
  {
    keys: ["ctc", "salary", "pay", "package", "compensation", "expected"],
    reply:
      "I'm a fresher, so no current CTC. I'm looking around \u20B93 LPA for full-time MERN roles — flexible for the right opportunity.",
  },
  {
    keys: ["notice period", "notice", "join", "joining", "immediate", "start date"],
    reply: "I can join immediately — no notice period, no current commitments.",
  },
  {
    keys: ["relocate", "relocation", "move to", "willing"],
    reply: "Yes — happy to relocate for the right role, and fully set up for remote work too.",
  },
  {
    keys: ["why hire", "why should", "hire him", "strength", "good fit"],
    reply:
      "Because I ship. 4 production projects, 35+ REST APIs, and a full internship delivering client work at sevaSYNC — React to Dockerized deployments. And I can start immediately.",
  },
  {
    keys: ["resume", "cv"],
    reply:
      "There's a resume download button in the hero section at the top of this page — one click and it's yours.",
  },
  // ——— Casual & fun — in-character, first-person ———
  {
    keys: ["is deepak cute", "cute", "handsome", "good looking"],
    reply:
      "I'll let the photo on this page answer that. But my code is definitely cute — clean, typed, and well-tested.",
  },
  {
    keys: ["are you single", "single", "girlfriend", "married", "relationship", "dating"],
    reply:
      "I'm in a committed relationship — with my terminal. It never sleeps, and neither do my side projects.",
  },
  {
    keys: ["how are you", "how r u", "how's it going", "hows it going", "what's up", "whats up"],
    reply: "Doing great — shipping code and looking for my next role. How can I help you?",
  },
  {
    keys: ["kaise ho", "kaise hai", "kya haal", "aur batao", "kya chal raha"],
    reply:
      "Badia, ekdum! Code ship kar raha hu aur naye roles dekh raha hu. Aap batao — main aapki kaise help kar sakta hu?",
  },
  {
    keys: ["who made you", "who created you", "are you ai", "are you real", "is this a bot", "are you a bot"],
    reply:
      "I'm the text version of Deepak, built into his portfolio. The real Deepak writes better code and replies to email — deepakkandpal.tech@gmail.com.",
  },
  {
    keys: ["tell me a joke", "joke", "make me laugh", "funny"],
    reply: "Why do programmers prefer dark mode? Because light attracts bugs.",
  },
  {
    keys: ["how old", "your age", "old are you"],
    reply: "Old enough to ship production code, young enough to get excited about a green CI pipeline.",
  },
  {
    keys: ["what can you do", "help me", "your purpose"],
    reply:
      "I can tell you about Deepak's skills, projects, internship, education, availability and CTC expectations — or just chat. Try a suggestion below.",
  },
  {
    keys: ["bye", "goodbye", "see you", "good night"],
    reply: "See you! If you're hiring, email deepakkandpal.tech@gmail.com — he replies fast.",
  },
  {
    keys: ["coffee", "chai", "tea"],
    reply: "Chai, always. Coffee is for people whose code compiles on the first try.",
  },
  {
    keys: ["favorite project", "favourite project", "best project", "proud of"],
    reply:
      "CareerForge — the most complete thing I've built: AI resume parsing, ATS scoring, 7 templates. But Trim's auth system (scrypt + rotating refresh tokens, built from scratch) is my favorite piece of engineering.",
  },
  {
    keys: ["i love you", "love you", "marry me"],
    reply: "Flattering — but I'm saving myself for a good job offer. Speaking of which: deepakkandpal.tech@gmail.com.",
  },
  {
    keys: ["stupid", "dumb", "idiot", "useless", "suck"],
    reply: "Fair enough — but let the work speak. Check the projects on this page, then decide.",
  },
  {
    keys: ["hire deepak", "want to hire", "hire you"],
    reply:
      "Great choice. Email deepakkandpal.tech@gmail.com or book a 30-min intro call from the contact section — he can join immediately.",
  },
];

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  let cur: number[] = new Array(n + 1);
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    const tmp = prev;
    prev = cur;
    cur = tmp;
  }
  return prev[n];
}

function answer(q: string): string {
  const s = q.toLowerCase();
  const tokens = s.split(/[^a-z0-9+]+/).filter(Boolean);
  let best: string | null = null;
  let bestScore = 0;
  for (const item of KB) {
    let score = 0;
    for (const key of item.keys) {
      const k = key.toLowerCase();
      // very short keys (e.g. "hi") only match whole words, not substrings
      const hit = k.length <= 2 ? tokens.includes(k) : s.includes(k);
      if (hit) {
        score += k.includes(" ") ? 4 : 3;
        continue;
      }
      if (k.includes(" ")) continue; // phrases only count on exact match
      for (const kt of k.split(/[^a-z0-9+]+/).filter(Boolean)) {
        if (kt.length < 5) continue;
        for (const t of tokens) {
          if (t.length < 5) continue;
          if (levenshtein(kt, t) <= 2) {
            score += 2;
            break;
          }
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = item.reply;
    }
  }
  return bestScore > 0 && best ? best : FALLBACK;
}

const CHIPS = [
  "what are your skills?",
  "tell me about finora",
  "where have you worked?",
  "how do I contact you?",
];

const AskDeepak = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hey, I'm Deepak — well, the text version.\nAsk me about my work, skills, or how to reach me.",
    },
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
    }, 450);
  };

  return (
    <div className="ask-wrap">
      {open && (
        <div className="ask-panel">
          <div className="ask-head">
            <div className="ask-head-id">
              <span className="ask-head-avatar">
                <FiMessageCircle size={17} />
                <span className="ask-online-dot" />
              </span>
              <span>
                <span className="ask-title">Deepak</span>
                <span className="ask-status">Online · replies instantly</span>
              </span>
            </div>
            <button className="ask-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <FiX size={15} />
            </button>
          </div>

          <div ref={bodyRef} className="ask-body">
            {msgs.map((m, i) => (
              m.from === "user" ? (
                <div key={i} className="ask-msg ask-user">
                  <p>{m.text}</p>
                </div>
              ) : (
                <div key={i} className="ask-msg ask-bot">
                  <span className="ask-avatar">
                    <FiMessageCircle size={13} />
                  </span>
                  <p>{m.text}</p>
                </div>
              )
            ))}
            {typing && (
              <div className="ask-msg ask-bot">
                <span className="ask-avatar">
                  <FiMessageCircle size={13} />
                </span>
                <span className="ask-dots"><span /><span /><span /></span>
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
              placeholder="Ask anything…"
              aria-label="Ask about Deepak"
              autoComplete="off"
              spellCheck={false}
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
        aria-label={open ? "Close chat" : "Ask Deepak"}
      >
        {open ? <FiX size={20} /> : (
          <span className="ask-fab-label">
            <FiMessageCircle size={17} />
            <span>Ask Deepak</span>
          </span>
        )}
      </button>

      <style>{`
        .ask-wrap {
          position: fixed; right: 24px; bottom: 24px; z-index: 300;
          display: flex; flex-direction: column; align-items: flex-end; gap: 14px;
          font-family: var(--font-body);
        }
        .ask-fab {
          height: 52px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 100px;
          border: 1px solid var(--bdr2);
          background: var(--bg2);
          color: var(--fg);
          cursor: pointer;
          padding: 0 18px;
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.6);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .ask-fab:hover { border-color: var(--acc); transform: translateY(-1px); }
        .ask-fab-label { display: flex; align-items: center; gap: 9px; font-size: 13.5px; font-weight: 600; letter-spacing: -0.1px; }
        .ask-fab-label svg { color: var(--acc); }
        .ask-online-dot {
          position: absolute; right: 0; bottom: 0;
          width: 11px; height: 11px; border-radius: 50%;
          background: #4ade80; border: 2px solid var(--bg2);
        }
        .ask-panel {
          width: 380px;
          max-width: calc(100vw - 48px);
          height: 560px;
          max-height: calc(100vh - 140px);
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          border: 1px solid var(--bdr2);
          background: var(--bg2);
          overflow: hidden;
          box-shadow: 0 32px 80px -16px rgba(0, 0, 0, 0.7);
          transform-origin: bottom right;
          animation: ask-in 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes ask-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        .ask-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid var(--bdr);
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.015);
        }
        .ask-head-id { display: flex; align-items: center; gap: 12px; }
        .ask-head-avatar {
          position: relative; width: 38px; height: 38px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: var(--acc);
        }
        .ask-title {
          display: block;
          font-family: var(--font-head);
          font-size: 14.5px;
          font-weight: 650;
          letter-spacing: -0.2px;
          color: var(--fg);
        }
        .ask-status { display: block; font-size: 11.5px; color: #4ade80; margin-top: 2px; }
        .ask-close {
          background: none;
          border: none;
          color: var(--fg3);
          cursor: pointer;
          padding: 6px;
          display: flex;
          border-radius: 8px;
        }
        .ask-close:hover { color: var(--fg); background: rgba(255, 255, 255, 0.05); }
        .ask-body {
          flex: 1;
          overflow-y: auto;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ask-body::-webkit-scrollbar { width: 6px; }
        .ask-body::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 3px; }
        .ask-msg {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          animation: ask-msg-in 0.25s ease;
        }
        @keyframes ask-msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: none; }
        }
        .ask-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          flex-shrink: 0; margin-top: 2px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          color: var(--acc);
        }
        .ask-bot p {
          margin: 0;
          padding-top: 4px;
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--fg2);
          white-space: pre-line;
          overflow-wrap: anywhere;
        }
        .ask-user { justify-content: flex-end; }
        .ask-user p {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--fg);
          background: rgba(245, 158, 11, 0.13);
          border: 1px solid rgba(245, 158, 11, 0.22);
          padding: 9px 14px;
          border-radius: 16px 16px 4px 16px;
          max-width: 85%;
          white-space: pre-line;
          overflow-wrap: anywhere;
        }
        .ask-dots { display: inline-flex; gap: 5px; padding: 12px 4px 8px; }
        .ask-dots span {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--fg3);
          animation: ask-blink 1.2s infinite;
        }
        .ask-dots span:nth-child(2) { animation-delay: 0.15s; }
        .ask-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes ask-blink {
          0%, 60%, 100% { opacity: 0.25; transform: none; }
          30% { opacity: 1; transform: translateY(-3px); }
        }
        .ask-chips {
          display: flex;
          gap: 8px;
          padding: 4px 16px 12px;
          overflow-x: auto;
          flex-shrink: 0;
          scrollbar-width: none;
        }
        .ask-chips::-webkit-scrollbar { display: none; }
        .ask-chip {
          flex-shrink: 0;
          padding: 8px 14px;
          border-radius: 100px;
          border: 1px solid var(--bdr2);
          background: transparent;
          color: var(--fg2);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .ask-chip:hover { border-color: var(--acc); color: var(--fg); }
        .ask-inputrow {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px 14px;
          flex-shrink: 0;
        }
        .ask-input {
          flex: 1;
          background: var(--bg);
          border: 1px solid var(--bdr);
          border-radius: 100px;
          padding: 11px 16px;
          color: var(--fg);
          font-family: var(--font-body);
          font-size: 13.5px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .ask-input:focus { border-color: var(--bdr2); }
        .ask-input::placeholder { color: var(--fg3); }
        .ask-send {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--acc);
          border: none;
          color: #1a1206;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .ask-send:hover { background: var(--acc-light); }
        @media (max-width: 640px) {
          .ask-wrap { right: 16px; bottom: 16px; }
        }
      `}</style>
    </div>
  );
};

export default AskDeepak;
