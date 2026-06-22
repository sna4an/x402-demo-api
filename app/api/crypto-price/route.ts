import { NextRequest, NextResponse } from "next/server";

const COINS: Record<string, string> = {
  bitcoin: "bitcoin", btc: "bitcoin",
  ethereum: "ethereum", eth: "ethereum",
  solana: "solana", sol: "solana",
  dogecoin: "dogecoin", doge: "dogecoin",
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const coin = (body.coin || "bitcoin").toLowerCase();
  const id = COINS[coin] || coin;

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=\${id}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`,
      { headers: { "Accept": "application/json" } }
    );
    if (!res.ok) throw new Error("CoinGecko failed");
    const data = await res.json();
    if (!data[id]) return NextResponse.json({ error: `Coin "${coin}" not found` }, { status: 404 });
    return NextResponse.json({
      coin: id,
      price_usd: data[id].usd,
      change_24h: data[id].usd_24h_change?.toFixed(2) + "%",
      market_cap: data[id].usd_market_cap,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch crypto price" }, { status: 500 });
  }
}