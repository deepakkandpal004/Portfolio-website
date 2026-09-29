import { NextResponse } from "next/server";

const GITHUB_USER = "deepakkandpal004";

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };

    // Fetch repos and user first (fast, from GitHub API)
    const [reposRes, userRes] = await Promise.all([
      fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=owner`,
        { headers, next: { revalidate: 3600 } }
      ),
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!reposRes.ok || !userRes.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
    }

    const [reposData, userData] = await Promise.all([
      reposRes.json(),
      userRes.json(),
    ]);

    const owned = Array.isArray(reposData)
      ? reposData.filter((r: any) => !r.fork && !r.archived)
      : [];

    const top = [...owned]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        stargazers_count: r.stargazers_count,
        language: r.language,
        updated_at: r.updated_at,
      }));

    const totalStars = owned.reduce(
      (sum: number, r: any) => sum + (r.stargazers_count || 0),
      0
    );

    // Language breakdown across all owned repos (for the dashboard bar chart)
    const langCounts: Record<string, number> = {};
    owned.forEach((r: any) => {
      if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    });
    const languages = Object.entries(langCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // Fetch contribution data separately (don't block repos)
    // NOTE: the API returns years newest-first (2026, then 2025...), so we
    // filter by actual date to get the real last 365 days — NOT .slice(-365)
    // which would grab the oldest year.
    let contributions = 0;
    let contribLevels: number[] = [];
    let contribDays: { date: string; count: number; level: number }[] = [];

    try {
      const contribRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`,
        { next: { revalidate: 600 } }
      );
      if (contribRes.ok) {
        const contribData = await contribRes.json();
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 365);
        const today = new Date();
        const recent = (contribData.contributions || [])
          .filter((c: any) => {
            const dt = new Date(c.date);
            return dt >= cutoff && dt <= today;
          })
          // API returns years newest-first — sort chronologically for the grid
          .sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        contribDays = recent.map((c: any) => ({
          date: c.date,
          count: c.count || 0,
          level: c.level ?? 0,
        }));
        contributions = contribDays.reduce(
          (sum: number, d: { count: number }) => sum + d.count,
          0
        );
        contribLevels = contribDays.map((d) => d.level);
      }
    } catch { /* contribution API is optional */ }

    return NextResponse.json({
      repoCount: userData?.public_repos ?? null,
      followers: userData?.followers ?? null,
      totalStars,
      languages,
      contributions,
      contribLevels,
      contribDays,
      repos: top,
    });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}