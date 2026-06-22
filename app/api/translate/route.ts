import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const text = body.text;
  const target = body.target || "en";

  if (!text) return NextResponse.json({ error: "text required" }, { status: 400 });

  try {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source: "auto", target, format: "text" }),
    });
    if (!res.ok) throw new Error("Translate API failed");
    const data = await res.json();
    return NextResponse.json({
      original: text,
      translated: data.translatedText,
      source: data.detectedLanguage?.language || "auto",
      target,
    });
  } catch {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}