import { NextResponse } from "next/server";
const quotes = [
  { text: "Stay hungry, stay foolish.", author: "Stewart Brand" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
];
export async function POST() {
  return NextResponse.json(quotes[Math.floor(Math.random() * quotes.length)]);
}