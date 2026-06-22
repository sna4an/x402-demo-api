import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const city = body.city || "unknown";
  const data: Record<string, { weather: string; temp: number }> = {
    "new york": { weather: "cloudy", temp: 55 },
    london: { weather: "rainy", temp: 52 },
    tokyo: { weather: "clear", temp: 68 },
  };
  const d = data[city.toLowerCase()] || { weather: "sunny", temp: 72 };
  return NextResponse.json({ city, weather: d.weather, temperature: d.temp, unit: "fahrenheit", timestamp: new Date().toISOString() });
}