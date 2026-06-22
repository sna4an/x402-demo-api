import { NextResponse } from "next/server";

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Stewart Brand" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
];

export async function POST() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  return NextResponse.json(q);
}