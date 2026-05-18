import { NextResponse } from "next/server";

type Memory = {
  id: string;
  title: string;
  url: string;
  savedAt: string;
};

let memories: Memory[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    memories,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const memory: Memory = {
    id: crypto.randomUUID(),
    title: body.title || "Untitled Page",
    url: body.url || "",
    savedAt: body.savedAt || new Date().toISOString(),
  };

  memories.unshift(memory);

  return NextResponse.json({
    success: true,
    memory,
  });
}