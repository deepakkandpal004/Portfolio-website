"use client";

import { useEffect, useState } from "react";
import { FiFolder, FiStar, FiUsers, FiGitPullRequest, FiActivity } from "react-icons/fi";

interface ContribDay { date: string; count: number; level: number; pad?: boolean }

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Parse YYYY-MM-DD as a local date (avoids UTC-midnight timezone shifts)
const parseDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const GITHUB = "deepakkandpal004";

const GitHubDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [prs,     setPrs]     = useState<number | null>(null);
  const [contributions, setContributions] = useState(0);
  const [contribDays, setContribDays] = useState<ContribDay[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [ghRes, prRes] = await Promise.all([
          fetch("/api/github"),
          fetch(`https://api.github.com/search/issues?q=author:${GITHUB}+type:pr&per_page=1`),
        ]);
        const ghData = await ghRes.json();
        const prData = await prRes.json();

        if (ghData.repoCount !== undefined) setRepoCount(ghData.repoCount);
        if (ghData.followers !== undefined) setFollowers(ghData.followers);
        if (ghData.totalStars !== undefined) setTotalStars(ghData.totalStars);
        if (ghData.contributions !== undefined) setContributions(ghData.contributions);
        if (ghData.contribDays) setContribDays(ghData.contribDays);
        if (prData?.total_count !== undefined) setPrs(prData.total_count);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const stats = [
    { label: "Repositories",  value: repoCount,  icon: FiFolder },
    { label: "Stars",          value: totalStars, icon: FiStar },
    { label: "Followers",      value: followers,  icon: FiUsers },
    { label: "Pull Requests",  value: prs,        icon: FiGitPullRequest },
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

  const sub = loading
    ? "Loading contributions\u2026"
    : `${contributions} contributions in the last year`;

  return (
    <section id="github" className="gh-section">
      <div className="container">
        <div className="gh-head">
          <p className="t-label" style={{ marginBottom: 20 }}>Open Source</p>
          <h2 className="t-h2" style={{ margin: "20px 0 14px" }}>GitHub <span className="gold">presence.</span></h2>
          <p className="gh-sub">My open source contributions and public repositories.</p>
        </div>

        {/* Stats row */}
        <div className="gh-stats">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="gh-stat glass-card">
                <span className="gh-stat-icon">
                  <Icon size={18} />
                </span>
                <span className="gh-stat-num">
                  {loading ? "\u2014" : (s.value ?? "0")}
                </span>
                <span className="gh-stat-label">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Contribution graph */}
        <div className="gh-cal glass-card">
          <div className="gh-cal-head">
            <div className="gh-cal-titlewrap">
              <span className="gh-cal-icon">
                <FiActivity size={15} />
              </span>
              <div>
                <span className="gh-cal-title">Contribution Activity</span>
                <p className="gh-cal-sub">{sub}</p>
              </div>
            </div>
            <a
              href={`https://github.com/${GITHUB}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-handle"
            >
              @{GITHUB}
            </a>
          </div>

          {/* Month labels + grid scroll together */}
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

          {/* Footer */}
          <div className="gh-cal-foot">
            <span className="gh-foot-sub">{sub}</span>
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
        </div>
      </div>

      <style>{`
        .gh-section { background: transparent; padding: var(--sec-pad) 0; }
        .gh-head {
          text-align: center;
          margin-bottom: 40px;
        }
        .gh-sub {
          margin: 0;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--fg3);
        }
        .gh-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .gh-stat {
          padding: 28px 20px;
          text-align: center;
        }
        .gh-stat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: color-mix(in srgb, var(--acc) 12%, transparent);
          color: var(--acc);
          margin-bottom: 16px;
        }
        .gh-stat-num {
          display: block;
          font-family: var(--font-term);
          font-size: 32px;
          font-weight: 700;
          color: var(--fg);
          line-height: 1;
          margin-bottom: 10px;
        }
        .gh-stat-label {
          display: block;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--fg3);
        }
        .gh-cal.glass-card {
          padding: 28px;
          box-shadow:
            0 0 36px rgba(57, 211, 83, 0.10),
            0 32px 64px -16px rgba(0, 0, 0, 0.65),
            0 8px 24px -8px rgba(0, 0, 0, 0.40),
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            inset 0 -1px 1px rgba(0, 0, 0, 0.25);
        }
        .gh-cal.glass-card:hover {
          box-shadow:
            0 0 56px rgba(57, 211, 83, 0.16),
            0 40px 80px -16px rgba(0, 0, 0, 0.75),
            0 12px 32px -8px rgba(0, 0, 0, 0.50),
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            inset 0 -1px 1px rgba(0, 0, 0, 0.25);
        }
        .gh-cal-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 26px;
        }
        .gh-cal-titlewrap {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .gh-cal-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          flex: none;
          border-radius: 10px;
          background: color-mix(in srgb, var(--acc) 12%, transparent);
          color: var(--acc);
        }
        .gh-cal-title {
          display: block;
          font-family: var(--font-head);
          font-size: 15px;
          font-weight: 600;
          color: var(--fg);
        }
        .gh-cal-sub {
          margin: 4px 0 0;
          font-family: var(--font-body);
          font-size: 12.5px;
          color: var(--fg3);
        }
        .gh-handle {
          flex: none;
          padding: 9px 16px;
          border: 1px solid var(--bdr);
          border-radius: 8px;
          background: var(--bg);
          font-family: var(--font-term);
          font-size: 12.5px;
          color: var(--fg2);
          text-decoration: none;
        }
        .gh-cal-scroll {
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .gh-months {
          display: flex;
          gap: 4px;
          margin-bottom: 8px;
          min-width: max-content;
          justify-content: safe center;
        }
        .gh-months span {
          width: 18px;
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
          gap: 4px;
          min-width: max-content;
          justify-content: safe center;
        }
        .gh-contrib-week {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .gh-contrib-cell {
          width: 18px;
          height: 18px;
          border-radius: 5px;
        }
        .gh-contrib-grid .gh-contrib-cell {
          transition: transform 0.12s ease, filter 0.12s ease, box-shadow 0.12s ease;
        }
        .gh-contrib-grid .gh-contrib-cell:hover {
          filter: brightness(1.6) saturate(1.3);
          transform: scale(1.35);
          box-shadow: 0 0 0 2px var(--bg), 0 0 0 5px #ff8a1a, 0 0 22px rgba(255, 138, 26, 0.65);
          position: relative;
          z-index: 2;
        }
        .gh-contrib-grid .gh-contrib-cell:active {
          transform: scale(1.12);
          filter: brightness(1.7) saturate(1.35);
          box-shadow: 0 0 0 2px var(--bg), 0 0 0 5px #ff8a1a, 0 0 30px rgba(255, 138, 26, 0.8);
        }
        .gh-level-0 { background: var(--bdr); }
        .gh-level-1 { background: #0e4429; }
        .gh-level-2 { background: #006d32; }
        .gh-level-3 { background: #26a641; }
        .gh-level-4 { background: #39d353; }
        .gh-cal-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 18px;
        }
        .gh-foot-sub {
          font-family: var(--font-body);
          font-size: 12.5px;
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
        @media (max-width: 640px) {
          .gh-section { padding: var(--sec-pad-sm) 0; }
          .gh-stats { grid-template-columns: repeat(2, 1fr); }
          .gh-cal { padding: 20px 16px; }
          .gh-cal-head { flex-direction: column; }
        }
      `}</style>
    </section>
  );
};

export default GitHubDashboard;
