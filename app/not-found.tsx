import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", flexDirection: "column", gap: 20,
      textAlign: "center", padding: "0 24px",
    }}>
      <h1 style={{
        fontFamily: "var(--font-head)", fontSize: "clamp(60px, 12vw, 120px)",
        fontWeight: 800, color: "var(--fg)", letterSpacing: "-4px", lineHeight: 1,
      }}>404</h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--fg2)" }}>
        Page not found.
      </p>
      <Link href="/" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "12px 28px", background: "var(--acc)", color: "#07100e",
        fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600,
        borderRadius: "var(--r-md)", transition: "background 0.2s",
      }}>
        Back to home
      </Link>
    </section>
  );
}
