"use client";

import { useState, FormEvent } from "react";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

const ContactForm = () => {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<"idle"|"loading"|"success"|"error">("idle");
  const [toasts,  setToasts]  = useState<Toast[]>([]);

  const can = name.trim() && email.trim() && message.trim() && status !== "loading";

  const addToast = (msg: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message: msg, type }]);

    // Trigger slide-out fade before actual DOM removal
    setTimeout(() => {
      const el = document.getElementById(`toast-${id}`);
      if (el) el.classList.add("toast-hiding");

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, 4200);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault(); if (!can) return;
    setStatus("loading");
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (!r.ok) {
        let errMsg = "Something went wrong.";
        try {
          const contentType = r.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const d = await r.json();
            errMsg = d.error || errMsg;
          } else {
            const txt = await r.text();
            errMsg = txt.trim() || `Error ${r.status}: ${r.statusText}`;
          }
        } catch {
          errMsg = `Error ${r.status}: ${r.statusText}`;
        }
        throw new Error(errMsg);
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      addToast("Your message has been sent successfully!", "success");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (e: unknown) {
      setStatus("error");
      const errText = e instanceof Error ? e.message : "Failed to send message.";
      addToast(errText, "error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <>
      {/* Toast Notification Stack */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} id={`toast-${t.id}`} className="toast-item">
            {t.type === "success" ? (
              <FiCheck size={18} style={{ color: "var(--ok)", flexShrink: 0, marginTop: 2 }} />
            ) : (
              <FiAlertCircle size={18} style={{ color: "var(--err)", flexShrink: 0, marginTop: 2 }} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "var(--font-head)", fontSize: 14.5,
                fontWeight: 600, color: "var(--fg)", lineHeight: 1.2,
              }}>
                {t.type === "success" ? "Message Sent" : "Sending Failed"}
              </div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: 13,
                color: "var(--fg2)", marginTop: 4, lineHeight: 1.4,
              }}>
                {t.message}
              </div>
            </div>
            <div className="toast-progress" />
          </div>
        ))}
      </div>

      <form onSubmit={submit} style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={status === "loading"}
            aria-label="Name"
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            aria-label="Email"
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            disabled={status === "loading"}
            rows={5}
            style={{ resize: "vertical", minHeight: 130 }}
            aria-label="Message"
          />
        </div>

        <button
          type="submit"
          disabled={!can}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px",
            background: status === "success" ? "#16a34a" : "var(--acc)",
            color: "#fff",
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600,
            letterSpacing: "0.2px",
            border: "none", borderRadius: "var(--r-md)",
            cursor: can ? "pointer" : "not-allowed",
            opacity: can ? 1 : 0.45,
            transition: "background 0.25s, transform 0.2s, opacity 0.2s, box-shadow 0.2s",
            boxShadow: can ? "0 4px 20px var(--acc-glow), 0 0 0 1px rgba(245, 158, 11, 0.15)" : "none",
          }}
          onMouseEnter={e => { if (can && status !== "success") { e.currentTarget.style.background = "var(--acc-light)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px var(--acc-glow), 0 0 0 1px rgba(245, 158, 11, 0.2)"; } }}
          onMouseLeave={e => { e.currentTarget.style.background = status === "success" ? "#16a34a" : "var(--acc)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = can ? "0 4px 20px var(--acc-glow), 0 0 0 1px rgba(245, 158, 11, 0.15)" : "none"; }}
        >
          {status === "loading"
            ? "Sending…"
            : status === "success"
              ? <><FiCheck size={14} /> Sent!</>
              : <><FiSend size={13} /> Send message</>
          }
        </button>
      </form>
    </>
  );
};

export default ContactForm;
