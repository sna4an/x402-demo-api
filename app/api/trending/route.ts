import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const source = body.source || "all";

  const results: Record<string, any> = {};

  // Reddit trending
  if (source === "all" || source === "reddit") {
    try {
      const res = await fetch("https://www.reddit.com/r/popular.json?limit=5", {
        headers: { "User-Agent": "x402-demo-api/1.0" }
      });
      const data = await res.json();
      results.reddit = data.data?.children?.map((c: any) => ({
        title: c.data.title,
        subreddit: c.data.subreddit,
        score: c.data.score,
        url: "https://reddit.com" + c.data.permalink,
      })) || [];
    } catch { results.reddit = { error: "failed" }; }
  }

  // Hacker News
  if (source === "all" || source === "hn") {
    try {
      const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const ids = await res.json();
      const items = await Promise.all(
        ids.slice(0, 5).map(async (id: number) => {
          const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return r.json();
        })
      );
      results.hackernews = items.map((i: any) => ({
        title: i.title,
        url: i.url,
        score: i.score,
        comments: i.descendants,
      }));
    } catch { results.hackernews = { error: "failed" }; }
  }

  // GitHub trending
  if (source === "all" || source === "github") {
    try {
      const res = await fetch("https://api.github.com/search/repositories?q=created:>2026-06-15&sort=stars&order=desc&per_page=5");
      const data = await res.json();
      results.github = (data.items || []).map((r: any) => ({
        name: r.full_name,
        description: r.description?.substring(0, 100),
        stars: r.stargazers_count,
        url: r.html_url,
      }));
    } catch { results.github = { error: "failed" }; }
  }

  return NextResponse.json({ source, results, timestamp: new Date().toISOString() });
}