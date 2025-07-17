export async function POST(req) {
  const body = await req.json();
  const { city, interests } = body;

  console.log("API HIT ✅", city, interests);

  const prompt = `Create a one-day travel itinerary for ${city} based on these interests: ${interests}. Include morning, afternoon, and evening recommendations with specific locations.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("OpenAI Response ✅", data);

    const itinerary = data.choices?.[0]?.message?.content?.trim();
    return new Response(JSON.stringify({ itinerary }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API ERROR ❌", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

