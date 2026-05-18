export async function generateEmbedding(text: string) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "models/gemini-embedding-001",
          content: {
            parts: [
              {
                text,
              },
            ],
          },
          outputDimensionality: 384,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("GEMINI EMBEDDING ERROR:", data);
      return null;
    }

    return data.embedding?.values || null;
  } catch (error) {
    console.error("Embedding error:", error);
    return null;
  }
}