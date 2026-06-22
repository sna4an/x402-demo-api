import { NextRequest, NextResponse } from "next/server";

const GEMINI_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  if (!GEMINI_KEY) return NextResponse.json({ error: "LLM not configured" }, { status: 500 });

  const body = await request.json().catch(() => ({}));
  const prompt = body.prompt;
  if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: "Gemini API error", detail: err }, { status: 502 });
    }
    const data = await res.json();
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return NextResponse.json({ prompt, response: output, model: "gemini-2.0-flash" });
  } catch (e: any) {
    return NextResponse.json({ error: "LLM request failed", detail: e.message }, { status: 500 });
  }
}