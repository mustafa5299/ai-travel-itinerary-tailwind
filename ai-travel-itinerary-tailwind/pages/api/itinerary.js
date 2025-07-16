export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { city, interests } = req.body;

  const prompt = `Create a one-day travel itinerary for ${city} based on these interests: ${interests}. Include morning, afternoon, and evening activities, with unique local suggestions.`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await openaiRes.json();
    const itinerary = data.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({ itinerary });
  } catch (err) {
    console.error("OpenAI error:", err);
    return res.status(500).json({ message: "Failed to generate itinerary." });
  }
}
