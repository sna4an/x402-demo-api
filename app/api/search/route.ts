import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const query = body.query;
  if (!query) return NextResponse.json({ error: "query required" }, { status: 400 });

  try {
    const res = await fetch(`https://api.duckduckgo.com/?q=\${encodeURIComponent(query)}&format=json&no_html=1`);
    const data = await res.json();
    const results = (data.RelatedTopics || [])
      .filter((t: any) => t.Text && t.FirstURL)
      .slice(0, 5)
      .map((t: any) => ({ title: t.Text.substring(0, 100), url: t.FirstURL, snippet: t.Text }));
    return NextResponse.json({ query, results });
  } catch {
    return NextResponse.json({ query, error: "Search failed" }, { status: 500 });
  }
}