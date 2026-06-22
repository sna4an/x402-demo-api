import { NextResponse } from "next/server";
const jokes = [
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
  { setup: "Why do Java developers wear glasses?", punchline: "Because they don't C#." },
  { setup: "What's a programmer's favorite hangout?", punchline: "Foo Bar." },
];
export async function POST() {
  return NextResponse.json(jokes[Math.floor(Math.random() * jokes.length)]);
}