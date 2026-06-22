import { NextRequest, NextResponse } from "next/server";

const POSITIVE = ["good","great","awesome","amazing","love","excellent","happy","best","fantastic","wonderful","perfect","beautiful","brilliant","superb","outstanding","nice","cool","exciting","fun","enjoy","like","thanks","thank","congrats","congratulations"];
const NEGATIVE = ["bad","terrible","awful","hate","worst","ugly","boring","sad","angry","annoying","disappointing","horrible","disgusting","pathetic","useless","stupid","sucks","fail","failed","suck","garbage","trash","waste"];

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const text = body.text;
  if (!text) return NextResponse.json({ error: "text required" }, { status: 400 });

  const words = text.toLowerCase().split(/\W+/);
  let pos = 0, neg = 0;
  for (const w of words) {
    if (POSITIVE.includes(w)) pos++;
    if (NEGATIVE.includes(w)) neg++;
  }

  const total = pos + neg || 1;
  const score = (pos - neg) / total;
  const label = score > 0.2 ? "positive" : score < -0.2 ? "negative" : "neutral";

  return NextResponse.json({
    text: text.substring(0, 200),
    sentiment: label,
    score: parseFloat(score.toFixed(2)),
    positive_words: pos,
    negative_words: neg,
  });
}