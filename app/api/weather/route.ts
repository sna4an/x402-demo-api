import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const city = body.city || "unknown";
  return NextResponse.json({ city, weather: "sunny", temperature: 72, unit: "fahrenheit", timestamp: new Date().toISOString() });
}