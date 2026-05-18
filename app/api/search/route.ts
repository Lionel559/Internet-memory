import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const query = (body.query || "").toLowerCase().trim();

  if (!query) {
    return NextResponse.json({
      success: true,
      memories: [],
    });
  }

  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("saved_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  const queryWords = query.split(" ").filter(Boolean);

  const scoredMemories = data
    .map((memory) => {
      const title = memory.title?.toLowerCase() || "";
      const url = memory.url?.toLowerCase() || "";
      const summary = memory.summary?.toLowerCase() || "";
      const category = memory.category?.toLowerCase() || "";

      let score = 0;

      for (const word of queryWords) {
        if (title.includes(word)) score += 4;
        if (summary.includes(word)) score += 3;
        if (category.includes(word)) score += 3;
        if (url.includes(word)) score += 2;
      }

      return {
        id: memory.id,
        title: memory.title,
        url: memory.url,
        favicon: memory.favicon,
        summary: memory.summary,
        category: memory.category,
        isFavorite: memory.is_favorite,
        savedAt: memory.saved_at,
        similarity: Math.min(score / 10, 1),
        score,
      };
    })
    .filter((memory) => memory.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  return NextResponse.json({
    success: true,
    memories: scoredMemories,
  });
}