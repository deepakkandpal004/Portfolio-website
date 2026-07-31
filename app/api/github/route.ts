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

    // Fetch contribution data separately (don't block repos)
    let contributions = 0;
    let contribLevels: number[] = [];

    try {
      const contribRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`,
        { next: { revalidate: 3600 } }
      );
      if (contribRes.ok) {
        const contribData = await contribRes.json();
        const currentYear = new Date().getFullYear();
        contributions = contribData.total?.[currentYear] ?? 0;
        contribLevels = (contribData.contributions || [])
          .slice(-365)
          .map((c: any) => c.level);
      }
    } catch { /* contribution API is optional */ }

    return NextResponse.json({
      repoCount: userData?.public_repos ?? null,
      followers: userData?.followers ?? null,
      totalStars,
      contributions,
      contribLevels,
      repos: top,
    });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}