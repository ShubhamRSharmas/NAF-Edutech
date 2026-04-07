const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY; // This pulls from your Netlify settings!

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      },
    );

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
