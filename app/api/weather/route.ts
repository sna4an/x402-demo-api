import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const city = body.city || "unknown";

  try {
    const res = await fetch(`https://wttr.in/\${encodeURIComponent(city)}?format=j1`);
    if (!res.ok) throw new Error("Weather API failed");
    const data = await res.json();
    const current = data.current_condition?.[0];
    return NextResponse.json({
      city,
      weather: current?.weatherDesc?.[0]?.value || "unknown",
      temperature: current?.temp_C ? parseFloat(current.temp_C) : null,
      unit: "celsius",
      humidity: current?.humidity || null,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ city, error: "Could not fetch weather data" }, { status: 500 });
  }
}