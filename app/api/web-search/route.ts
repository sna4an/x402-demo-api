import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const query = body.query;
  if (!query) return NextResponse.json({ error: "query required" }, { status: 400 });

  try {
    const res = await fetch(
      `https://api.duckduckgo.com/?q=\${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
    );
    const data = await res.json();

    const results = [];

    // Instant answer
    if (data.AbstractText) {
      results.push({ title: data.Heading || query, url: data.AbstractURL || "", snippet: data.AbstractText });
    }

    // Related topics
    for (const t of (data.RelatedTopics || []).slice(0, 5)) {
      if (t.Text && t.FirstURL) {
        results.push({ title: t.Text.substring(0, 100), url: t.FirstURL, snippet: t.Text });
      }
    }

    return NextResponse.json({ query, results: results.slice(0, 5) });
  } catch {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}