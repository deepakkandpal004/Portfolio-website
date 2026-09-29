"use client";

import { useEffect, useRef, useState } from "react";
import { FiStar, FiGitBranch, FiExternalLink, FiGitPullRequest, FiUsers, FiActivity, FiCode } from "react-icons/fi";
import { motion } from "framer-motion";

interface Repo { id: number; name: string; description: string; html_url: string; stargazers_count: number; language: string; }
interface ContribDay { date: string; count: number; level: number; pad?: boolean }

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Parse YYYY-MM-DD as a local date (avoids UTC-midnight timezone shifts)
const parseDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const GITHUB = "deepakkandpal004";
const langColors: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  CSS:        "#563d7c",
  HTML:       "#e34f26",
  Python:     "#3572a5",
  EJS:        "#a91e50",
  SCSS:       "#c6538c",
  Shell:      "#89e051",
  Dockerfile: "#384d54",
  Vue:        "#41b883",
};

const Skel = () => (
  <div className="gh-skel">
    <div className="skeleton" style={{ height: 13, width: "55%", marginBottom: 12 }} />
    <div className="skeleton" style={{ height: 11, width: "88%", marginBottom: 8 }} />
    <div className="skeleton" style={{ height: 11, width: "60%", marginBottom: 16 }} />
    <div className="skeleton" style={{ height: 10, width: "35%" }} />
  </div>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const statVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const GitHubDashboard = () => {
  const [repos,   setRepos]   = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [prs,     setPrs]     = useState<number | null>(null);
  const [contributions, setContributions] = useState(0);
  const [contribDays, setContribDays] = useState<ContribDay[]>([]);
  const [languages, setLanguages] = useState<{ name: string; count: number }[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const [ghRes, prRes] = await Promise.all([
          fetch("/api/github"),
          fetch(`https://api.github.com/search/issues?q=author:${GITHUB}+type:pr&per_page=1`),
        ]);
        const ghData = await ghRes.json();
        const prData = await prRes.json();

        if (ghData.repos) setRepos(ghData.repos);
        if (ghData.repoCount !== undefined) setRepoCount(ghData.repoCount);
        if (ghData.followers !== undefined) setFollowers(ghData.followers);
        if (ghData.totalStars !== undefined) setTotalStars(ghData.totalStars);
        if (ghData.contributions !== undefined) setContributions(ghData.contributions);
        if (ghData.contribDays) setContribDays(ghData.contribDays);
        if (ghData.languages) setLanguages(ghData.languages);
        if (prData?.total_count !== undefined) setPrs(prData.total_count);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const stats = [
    { label: "Repositories",  value: repoCount, icon: FiGitBranch },
    { label: "Stars",          value: totalStars,          icon: FiStar },
    { label: "Followers",      value: followers,     icon: FiUsers },
    { label: "Pull requests",  value: prs,                 icon: FiGitPullRequest },
  ];

  // Contribution calendar: weeks as columns (GitHub-style), starting on Sunday.
  // Month labels are derived from the actual dates, so they're always correct.
  const weeks: ContribDay[][] = [];
  const weekLabels: string[] = [];
  if (contribDays.length > 0) {
    const days: ContribDay[] = [...contribDays];
    const padCount = parseDay(days[0].date).getDay(); // 0 = Sunday
    for (let i = 0; i < padCount; i++) {
      days.unshift({ date: "", count: 0, level: 0, pad: true });
    }
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    weeks.forEach((w) => {
      const first = w.find((d) => !d.pad && parseDay(d.date).getDate() === 1);
      weekLabels.push(first ? MONTHS[parseDay(first.date).getMonth()] : "");
    });
  }

  const maxLang = languages.length > 0 ? languages[0].count : 1;

  return (
    <section id="github" style={{ background: "transparent", position: "relative", overflow: "hidden" }}>
      <div className="gh-bg-glow" />

      <div className="container reveal" ref={ref} style={{ position: "relative", zIndex: 10 }}>

        <motion.div
          className="gh-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="gh-badge">Open Source</span>
          <h2 className="t-h2 gh-title">GitHub presence.</h2>
          <p className="t-body" style={{ maxWidth: 640, margin: "32px auto 0" }}>
            My open source contributions and public repositories.
          </p>
        </motion.div>

        <motion.div
          className="gh-stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} className="gh-stat-card" variants={statVariants}>
              <div className="gh-stat-icon-wrap">
                <s.icon size={18} style={{ color: "var(--acc)" }} />
              </div>
              <div className="gh-stat-value">
                {loading ? "—" : (s.value ?? "0")}
              </div>
              <div className="gh-stat-label">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="gh-chart-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="gh-chart-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="gh-chart-icon">
                <FiActivity size={16} style={{ color: "var(--acc)" }} />
              </div>
              <div>
                <span className="gh-chart-title">Contribution Activity</span>
                <span className="gh-chart-sub">
                  {loading ? "Loading contributions..." : `${contributions} contributions`} in the last year
                </span>
              </div>
            </div>
            <a href={`https://github.com/${GITHUB}`} target="_blank" rel="noopener noreferrer" className="gh-chart-link">
              @{GITHUB}
            </a>
          </div>

          {/* Contribution calendar — month labels + grid scroll together */}
          <div className="gh-cal-scroll">
            <div className="gh-months">
              {weeks.length > 0 ? (
                weekLabels.map((lbl, i) => <span key={i}>{lbl}</span>)
              ) : (
                Array.from({ length: 12 }).map((_, i) => <span key={i} />)
              )}
            </div>

            <div className="gh-contrib-grid">
              {weeks.length > 0 ? (
                weeks.map((week, wi) => (
                  <div key={wi} className="gh-contrib-week">
                    {week.map((d, di) => (
                      <div
                        key={di}
                        className={`gh-contrib-cell gh-level-${d.level}`}
                        title={d.pad ? undefined : `${d.count} contribution${d.count !== 1 ? "s" : ""} on ${parseDay(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                      />
                    ))}
                  </div>
                ))
              ) : (
                Array.from({ length: 52 }).map((_, wi) => (
                  <div key={wi} className="gh-contrib-week">
                    {Array.from({ length: 7 }).map((_, di) => (
                      <div key={di} className="gh-contrib-cell gh-level-0" />
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="gh-chart-footer">
            <span className="gh-contrib-count">
              {loading ? "Loading..." : `${contributions} contributions in the last year`}
            </span>
            <div className="gh-legend">
              <span>Less</span>
              <div className="gh-contrib-cell gh-level-0" />
              <div className="gh-contrib-cell gh-level-1" />
              <div className="gh-contrib-cell gh-level-2" />
              <div className="gh-contrib-cell gh-level-3" />
              <div className="gh-contrib-cell gh-level-4" />
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {languages.length > 0 && (
          <motion.div
            className="gh-lang-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="gh-chart-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="gh-chart-icon">
                  <FiCode size={16} style={{ color: "var(--acc)" }} />
                </div>
                <div>
                  <span className="gh-chart-title">Top languages</span>
                  <span className="gh-chart-sub">Most used across public repositories</span>
                </div>
              </div>
            </div>
            <div className="gh-lang-bars">
              {languages.map((l) => (
                <div key={l.name} className="gh-lang-row">
                  <span className="gh-lang-name">
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: langColors[l.name] || "#888", flexShrink: 0 }} />
                    {l.name}
                  </span>
                  <div className="gh-lang-bar">
                    <motion.div
                      className="gh-lang-fill"
                      style={{ background: langColors[l.name] || "var(--acc)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(l.count / maxLang) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    />
                  </div>
                  <span className="gh-lang-count">{l.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="gh-repo-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <Skel key={i} />)
            : repos.map((r) => (
              <motion.a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer"
                className="gh-repo-card"
                variants={itemVariants}
              >
                <div className="gh-repo-card-shine" />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div className="gh-repo-icon-wrap">
                      <FiGitBranch size={13} style={{ color: "var(--acc)" }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>
                      {r.name}
                    </span>
                  </div>
                  <p className="gh-repo-desc">
                    {r.description || "No description provided."}
                  </p>
                  <div style={{ display: "flex", gap: 14, fontSize: 11.5, color: "var(--fg3)", marginTop: "auto", paddingTop: 10 }}>
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
                </div>
              </motion.a>
            ))
          }
        </motion.div>
      </div>

      <style>{`
        .gh-bg-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 30%, var(--violet-glow), transparent 70%);
          filter: blur(100px);
        }
        .gh-header {
          max-width: 760px;
          margin: 0 auto 72px;
          text-align: center;
        }
        .gh-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 999px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          color: var(--acc-light);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .gh-title {
          font-size: clamp(2.25rem, 4.5vw, 3.5rem) !important;
          line-height: 1.1 !important;
          letter-spacing: -0.04em !important;
          margin-bottom: 0 !important;
        }
        .gh-skel {
          border-radius: var(--r-md);
          padding: 20px;
          background: var(--bg2);
          border: 1px solid var(--bdr);
        }
        .gh-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }
        .gh-stat-card {
          text-align: center;
          padding: 28px 20px;
          border-radius: 20px;
          border: 1px solid var(--bdr);
          background: var(--bg2);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .gh-stat-card:hover {
          border-color: var(--bdr2);
          box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5);
          transform: translateY(-4px);
        }
        .gh-stat-icon-wrap {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
          border-radius: 14px;
          background: var(--acc-glow2);
          border: 1px solid color-mix(in srgb, var(--acc) 20%, transparent);
        }
        .gh-stat-card:hover .gh-stat-icon-wrap {
          transform: scale(1.1);
        }
        .gh-stat-icon-wrap svg {
          transition: transform 0.3s ease;
        }
        .gh-stat-card:hover .gh-stat-icon-wrap svg {
          transform: scale(1.15) rotate(4deg);
        }
        .gh-stat-value {
          font-family: var(--font-head);
          font-size: 2rem;
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 6px;
        }
        .gh-stat-label {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          color: var(--fg3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .gh-chart-card {
          border-radius: var(--r-md);
          background: var(--bg2);
          border: 1px solid var(--bdr);
          padding: 28px 28px 24px;
          margin-bottom: 32px;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .gh-chart-card:hover {
          border-color: var(--bdr2);
          box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5);
        }
        .gh-chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .gh-chart-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: var(--acc-glow2);
          border: 1px solid color-mix(in srgb, var(--acc) 20%, transparent);
          flex-shrink: 0;
        }
        .gh-chart-title {
          display: block;
          font-family: var(--font-head);
          font-size: 15px;
          font-weight: 600;
          color: var(--fg);
        }
        .gh-chart-sub {
          display: block;
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--fg3);
          margin-top: 2px;
        }
        .gh-chart-link {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          color: var(--fg3);
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 8px;
          border: 1px solid var(--bdr);
          transition: all 0.2s;
        }
        .gh-chart-link:hover {
          color: var(--acc-light);
          border-color: color-mix(in srgb, var(--acc) 45%, transparent);
        }
        .gh-cal-scroll {
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .gh-months {
          display: flex;
          gap: 3px;
          margin-bottom: 8px;
          min-width: max-content;
        }
        .gh-months span {
          width: 13px;
          flex: none;
          overflow: visible;
          white-space: nowrap;
          font-family: var(--font-body);
          font-size: 11px;
          color: var(--fg3);
          font-weight: 500;
        }
        .gh-contrib-grid {
          display: flex;
          gap: 3px;
          min-width: max-content;
        }
        .gh-contrib-week {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .gh-contrib-cell {
          width: 13px;
          height: 13px;
          border-radius: 3px;
          transition: background 0.2s;
        }
        .gh-level-0 { background: var(--bdr); }
        .gh-level-1 { background: #0e4429; }
        .gh-level-2 { background: #006d32; }
        .gh-level-3 { background: #26a641; }
        .gh-level-4 { background: #39d353; }
        .gh-chart-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--bdr);
        }
        .gh-contrib-count {
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--fg3);
        }
        .gh-legend {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .gh-legend span {
          font-family: var(--font-body);
          font-size: 11px;
          color: var(--fg3);
          margin: 0 4px;
        }
        .gh-lang-card {
          border-radius: var(--r-md);
          background: var(--bg2);
          border: 1px solid var(--bdr);
          padding: 28px;
          margin-bottom: 32px;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .gh-lang-card:hover {
          border-color: var(--bdr2);
          box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5);
        }
        .gh-lang-bars { display: grid; gap: 14px; margin-top: 6px; }
        .gh-lang-row { display: grid; grid-template-columns: 130px 1fr 32px; align-items: center; gap: 14px; }
        .gh-lang-name { display: flex; align-items: center; gap: 8px; font-family: var(--font-body); font-size: 13px; font-weight: 500; color: var(--fg2); }
        .gh-lang-bar { height: 8px; border-radius: 999px; background: var(--bdr); overflow: hidden; }
        .gh-lang-fill { height: 100%; border-radius: 999px; }
        .gh-lang-count { font-family: var(--font-body); font-size: 12px; color: var(--fg3); text-align: right; }
        @media (max-width: 560px) {
          .gh-lang-row { grid-template-columns: 100px 1fr 28px; gap: 10px; }
        }
        .gh-repo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 18px;
        }
        .gh-repo-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          background: var(--bg2);
          border: 1px solid var(--bdr);
          border-radius: var(--r-md);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease,
                      background-color 0.35s ease;
        }
        .gh-repo-card:hover {
          background: var(--bg3);
          transform: translateY(-4px);
          border-color: var(--bdr2);
          box-shadow: 0 24px 64px -16px var(--acc-glow), 0 8px 24px -8px rgba(0, 0, 0, 0.5);
        }
        /* Signature top-line glow reveal on hover (replaces the old shine sweep) */
        .gh-repo-card-shine {
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, var(--acc), transparent);
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .gh-repo-card:hover .gh-repo-card-shine { opacity: 1; }
        .gh-repo-icon-wrap {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: var(--acc-glow2);
          border: 1px solid color-mix(in srgb, var(--acc) 20%, transparent);
          flex-shrink: 0;
        }
        .gh-repo-desc {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--fg2);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default GitHubDashboard;
