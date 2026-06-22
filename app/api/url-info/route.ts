import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const url = body.url;
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return NextResponse.json({
      url,
      final_url: res.url,
      status: res.status,
      content_type: res.headers.get("content-type"),
      content_length: res.headers.get("content-length"),
      server: res.headers.get("server"),
      redirected: res.redirected,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Could not fetch URL info" }, { status: 500 });
  }
}