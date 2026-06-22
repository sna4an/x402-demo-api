import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const queries = body.queries || ["bitcoin", "new york"];

  const results: Record<string, any> = {};

  // Crypto price
  try {
    const coin = queries[0] || "bitcoin";
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_24hr_change=true`);
    const data = await res.json();
    if (data[coin]) results.crypto = { coin, price_usd: data[coin].usd, change_24h: data[coin].usd_24h_change?.toFixed(2) + "%" };
  } catch { results.crypto = { error: "failed" }; }

  // Weather
  try {
    const city = queries[1] || "new york";
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const data = await res.json();
    const c = data.current_condition?.[0];
    results.weather = { city, weather: c?.weatherDesc?.[0]?.value, temp: c?.temp_C + "°C" };
  } catch { results.weather = { error: "failed" }; }

  // News (from HN)
  try {
    const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
    const ids = await res.json();
    const items = await Promise.all(
      ids.slice(0, 3).map(async (id: number) => {
        const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return r.json();
      })
    );
    results.news = items.map((i: any) => ({ title: i.title, url: i.url, score: i.score }));
  } catch { results.news = { error: "failed" }; }

  return NextResponse.json({ queries, results, timestamp: new Date().toISOString() });
}