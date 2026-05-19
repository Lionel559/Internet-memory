export async function generateMemorySummary(
  title: string,
  url: string
) {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You create short smart summaries for saved websites.",
            },
            {
              role: "user",
              content: `Summarize this website in under 20 words.

Title: ${title}
URL: ${url}`,
            },
          ],
          temperature: 0.4,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("GROQ ERROR:", data);

      return `${title} is a saved web memory for quick recall and search.`;
    }

    return (
      data.choices?.[0]?.message?.content?.trim() ||
      `${title} is a saved web memory for quick recall and search.`
    );
  } catch (error) {
    console.error("Groq summary error:", error);

    return `${title} is a saved web memory for quick recall and search.`;
  }
}