import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          background: "#07080c",
          backgroundImage:
            "radial-gradient(circle at 75% 25%, rgba(245,158,11,0.16), transparent 55%), linear-gradient(rgba(245,158,11,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.05) 1px, transparent 1px)",
          backgroundSize: "auto, 44px 44px, 44px 44px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#4ade80",
            }}
          />
          <div style={{ color: "#94a3b8", fontSize: 26, letterSpacing: 2 }}>
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </div>

        <div
          style={{
            fontSize: 108,
            fontWeight: 800,
            color: "#f8fafc",
            letterSpacing: -4,
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          Deepak Kandpal
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 44 }}>
          <div style={{ fontSize: 40, color: "#f59e0b", fontWeight: 600 }}>
            Full-Stack Developer
          </div>
          <div style={{ fontSize: 40, color: "#475569" }}>•</div>
          <div style={{ fontSize: 40, color: "#94a3b8" }}>MERN Stack</div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"].map((t) => (
            <div
              key={t}
              style={{
                padding: "12px 26px",
                borderRadius: 999,
                border: "1px solid rgba(245,158,11,0.35)",
                background: "rgba(245,158,11,0.08)",
                color: "#fbbf24",
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 56,
            right: 90,
            fontSize: 28,
            color: "#64748b",
          }}
        >
          deepakkandpal.me
        </div>
      </div>
    ),
    { ...size }
  );
}
