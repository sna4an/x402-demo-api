import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const query = body.query || "demo";
  return NextResponse.json({
    query,
    results: [
      { title: "x402 Protocol", url: "https://x402.org", snippet: "Open standard for internet native payments" },
      { title: "x402scan", url: "https://x402scan.com", snippet: "Explore the x402 ecosystem" },
    ],
  });
}