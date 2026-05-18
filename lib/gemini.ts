export async function generateMemorySummary(title: string, url: string) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Write a short useful summary under 25 words for this saved browser memory.

Title: ${title}
URL: ${url}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("GEMINI SUMMARY ERROR:", data);
      return `Saved memory from ${title}`;
    }

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      `Saved memory from ${title}`
    );
  } catch (error) {
    console.error("Gemini summary error:", error);
    return `Saved memory from ${title}`;
  }
}