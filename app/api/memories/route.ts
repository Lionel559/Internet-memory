import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateMemorySummary } from "@/lib/gemini";
import { generateEmbedding } from "@/lib/embeddings";

export async function GET() {
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

  const memories = data.map((memory) => ({
    id: memory.id,
    title: memory.title,
    url: memory.url,
    favicon: memory.favicon,
    summary: memory.summary,
    category: memory.category,
    isFavorite: memory.is_favorite,
    savedAt: memory.saved_at,
  }));

  return NextResponse.json({
    success: true,
    memories,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const title = body.title || "Untitled Page";
  const originalUrl = body.url || "";
  const url = originalUrl.toLowerCase();

 let category = "Website";

if (
  url.includes("youtube") ||
  url.includes("tiktok") ||
  url.includes("vimeo") ||
  url.includes("netflix") ||
  url.includes("primevideo") ||
  url.includes("twitch")
)
  category = "Video";

if (
  url.includes("github") ||
  url.includes("gitlab") ||
  url.includes("stackoverflow") ||
  url.includes("vercel") ||
  url.includes("netlify") ||
  url.includes("npmjs") ||
  url.includes("codepen") ||
  url.includes("replit")
)
  category = "Development";

if (
  url.includes("dribbble") ||
  url.includes("figma") ||
  url.includes("behance") ||
  url.includes("awwwards") ||
  url.includes("mobbin")
)
  category = "Design";

if (
  url.includes("medium") ||
  url.includes("dev.to") ||
  url.includes("hashnode") ||
  url.includes("substack")
)
  category = "Article";

if (
  url.includes("docs") ||
  url.includes("notion") ||
  url.includes("readme") ||
  url.includes("developer.mozilla") ||
  url.includes("mdn")
)
  category = "Documentation";

if (
  url.includes("twitter") ||
  url.includes("x.com") ||
  url.includes("instagram") ||
  url.includes("facebook") ||
  url.includes("linkedin") ||
  url.includes("reddit") ||
  url.includes("discord")
)
  category = "Social";

if (
  url.includes("amazon") ||
  url.includes("ebay") ||
  url.includes("aliexpress") ||
  url.includes("shopify") ||
  url.includes("etsy")
)
  category = "Shopping";

if (
  url.includes("openai") ||
  url.includes("chatgpt") ||
  url.includes("claude") ||
  url.includes("anthropic") ||
  url.includes("gemini") ||
  url.includes("deepseek") ||
  url.includes("perplexity") ||
  url.includes("huggingface") ||
  url.includes("groq") ||
  url.includes("stability.ai") ||
  url.includes("replicate")
)
  category = "AI";

if (
  url.includes("spotify") ||
  url.includes("soundcloud") ||
  url.includes("apple.com/music")
)
  category = "Music";

if (
  url.includes("coursera") ||
  url.includes("udemy") ||
  url.includes("edx") ||
  url.includes("skillshare")
)
  category = "Learning";

if (
  url.includes("cnn") ||
  url.includes("bbc") ||
  url.includes("nytimes") ||
  url.includes("techcrunch") ||
  url.includes("theverge")
)
  category = "News";

  const generatedSummary = await generateMemorySummary(title, originalUrl);

  const embedding = await generateEmbedding(
    `${title} ${generatedSummary} ${originalUrl}`
  );

  const { data, error } = await supabase
    .from("memories")
    .insert({
      title,
      url: originalUrl,
      favicon: body.favicon || "",
      summary: generatedSummary,
      category,
      is_favorite: false,
      embedding,
      saved_at: body.savedAt || new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    memory: {
      id: data.id,
      title: data.title,
      url: data.url,
      favicon: data.favicon,
      summary: data.summary,
      category: data.category,
      isFavorite: data.is_favorite,
      savedAt: data.saved_at,
    },
  });
}