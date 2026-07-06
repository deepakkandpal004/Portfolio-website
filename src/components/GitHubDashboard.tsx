"use client";

import { useEffect, useRef, useState } from "react";
import { FiStar, FiGitBranch, FiExternalLink, FiGitPullRequest, FiUsers, FiActivity } from "react-icons/fi";

interface Repo { id: number; name: string; description: string; html_url: string; stargazers_count: number; language: string; }

const GITHUB = "deepakkandpal004";
const langColors: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  CSS:        "#563d7c",
  HTML:       "#e34f26",
  Python:     "#3572a5",
};

const Skel = () => (
  <div style={{ borderRadius: "var(--r-md)", padding: "20px", background: "var(--bg2)", border: "1px solid var(--bdr)" }}>
    <div className="skeleton" style={{ height: 13, width: "55%", marginBottom: 12 }} />
    <div className="skeleton" style={{ height: 11, width: "88%", marginBottom: 8 }} />
    <div className="skeleton" style={{ height: 11, width: "60%", marginBottom: 16 }} />
    <div className="skeleton" style={{ height: 10, width: "35%" }} />
  </div>
);

const GitHubDashboard = () => {
  const [repos,   setRepos]   = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [user,    setUser]    = useState<{ public_repos?: number; followers?: number } | null>(null);
  const [prs,     setPrs]     = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const [rr, ur, pr] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB}/repos?sort=updated&per_page=6&type=owner`),
          fetch(`https://api.github.com/users/${GITHUB}`),
          fetch(`https://api.github.com/search/issues?q=author:${GITHUB}+type:pr&per_page=1`),
        ]);
        const [rd, ud, pd] = await Promise.all([rr.json(), ur.json(), pr.json()]);
        if (Array.isArray(rd)) setRepos(rd.sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count));
        if (ud?.public_repos !== undefined) setUser(ud);
        if (pd?.total_count  !== undefined) setPrs(pd.total_count);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const stats = [
    { label: "Repositories",  value: user?.public_repos, icon: FiGitBranch },
    { label: "Stars",          value: totalStars,          icon: FiStar },
    { label: "Followers",      value: user?.followers,     icon: FiUsers },
    { label: "Pull requests",  value: prs,                 icon: FiGitPullRequest },
  ];

  return (
    <section id="github">
      <div className="container reveal" ref={ref}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p className="t-label" style={{ marginBottom: 18 }}>Open source</p>
            <h2 className="t-h2">GitHub presence.</h2>
          </div>
          <a
            href={`https://github.com/${GITHUB}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-body)", fontSize: 13.5,
              fontWeight: 500, color: "var(--fg2)",
              padding: "8px 16px",
              border: "1px solid var(--bdr)",
              borderRadius: "var(--r-md)",
              transition: "color 0.2s, border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--fg)";
              e.currentTarget.style.borderColor = "var(--acc)";
              e.currentTarget.style.background = "var(--acc-glow2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "var(--fg2)";
              e.currentTarget.style.borderColor = "var(--bdr)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            View profile <FiExternalLink size={12} />
          </a>
        </div>

        {/* Stats — clean number grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 24, marginBottom: 48 }} className="github-stats-grid">
          {stats.map((s, idx) => (
            <div key={s.label} className="github-stat-card animate-pills" style={{ animationDelay: `${idx * 0.04}s` }}>
              <div style={{
                fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 700,
                color: "var(--fg)", letterSpacing: "-0.5px", lineHeight: 1,
              }}>
                {loading ? "—" : (s.value ?? "0")}
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg3)", fontWeight: 500,
                textTransform: "uppercase", letterSpacing: "0.5px",
              }}>
                <s.icon size={11} style={{ color: "var(--acc)" }} /> {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Contribution graph */}
        <div className="github-chart-card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <FiActivity size={13} style={{ color: "var(--acc)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "var(--fg2)" }}>
              Contribution activity
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg3)", marginLeft: "auto" }}>
              Last year
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/39d353/${GITHUB}`}
            alt="GitHub contribution chart"
            className="contribution-graph"
            loading="lazy"
            style={{ width: "100%", minHeight: 140, height: "auto", display: "block" }}
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Repo cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 18 }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <Skel key={i} />)
            : repos.map((r, idx) => (
              <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer"
                className="github-repo-card animate-pills"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FiGitBranch size={13} style={{ color: "var(--acc)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>
                    {r.name}
                  </span>
                </div>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: 13,
                  color: "var(--fg2)", lineHeight: 1.6,
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {r.description || "No description provided."}
                </p>
                <div style={{ display: "flex", gap: 14, fontSize: 11.5, color: "var(--fg3)", marginTop: "auto", paddingTop: 8 }}>
                  {r.language && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: langColors[r.language] || "#888", flexShrink: 0 }} />
                      {r.language}
                    </span>
                  )}
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <FiStar size={11} style={{ color: "var(--acc)" }} /> {r.stargazers_count}
                  </span>
                </div>
              </a>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default GitHubDashboard;
