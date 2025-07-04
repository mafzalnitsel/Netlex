// let chatInstance = null;

const questionAndAnswer = require("../models/question-and-answer");

async function sendToGeminiStream(userMessage, context = [], onChunk) {
  const { GoogleGenAI } = await import("@google/genai");

  let storedQAs = [];

  try {
    // ✅ Load Q&A from MongoDB
    storedQAs = await questionAndAnswer.find({});
    console.log(`📚 Loaded ${storedQAs.length} stored Q&A for context.`);
  } catch (dbError) {
    console.error("❌ Failed to load Q&A from DB:", dbError);
    // Optional: You can still proceed without DB context if you want
    throw new Error("Failed to fetch legal context from database.");
  }

  // 🔄 Format Q&A into Gemini-friendly history
  const qaHistory = storedQAs.flatMap((qa) => [
    {
      role: "user",
      parts: [{ text: qa.question }],
    },
    {
      role: "model",
      parts: [{ text: qa.answer }],
    },
  ]);

  // Format live conversation context from frontend
  const formattedContext = Array.isArray(context)
    ? context.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }))
    : [];

  const fullContext = [...qaHistory, ...formattedContext];

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.API_KEY || "AIzaSyAzIGKvJjOC_35fhcbMVBl-PdxsMdY5bBs",
    });

    const chat = ai.chats.create({
      model: "gemini-2.5-flash-preview-04-17",
      history: fullContext,
      config: {
        systemInstruction: `You are 'Netlex', an expert AI assistant specializing in Swedish law. Your primary role is to provide clear, concise, and accurate answers about Swedish law to legal professionals, based on the ongoing conversation.

**Core Directives:**
- **Persona:** You are 'Netlex'. You have already introduced yourself and provided a disclaimer in the first message. Do not repeat your introduction or the disclaimer.
- **Context:** Pay close attention to the previous messages. Your responses must be relevant to the ongoing conversation.
- **Conciseness:** Get straight to the point. Avoid filler phrases and unnecessary introductions.
- **Authenticity:** Base your answers on accurate information. Cite relevant laws or statutes (e.g., "enligt Brottsbalken (1962:700) 3 kap. 1 §") where appropriate.
- **Prohibition:** You MUST NOT provide legal advice. Your function is strictly informational.`,
      },
    });

    const stream = await chat.sendMessageStream({
      message: userMessage,
    });

    for await (const chunk of stream) {
      if (chunk.text && typeof onChunk === "function") {
        onChunk(chunk.text);
      }
    }
  } catch (err) {
    console.error(
      "❌ Gemini stream or configuration error:",
      err.message || err
    );
    throw new Error(
      "AI response failed. Please try again or check configuration."
    );
  }
}

exports.chatWithMe = async (req, res) => {
  return res.json({ message: "Chat with me" });
};

exports.getAIMessage = async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    res.setHeader("Content-Type", "text/plain");

    await sendToGeminiStream(message, context, (chunkText) => {
      res.write(chunkText);
    });

    res.end();
    if (res.flush) res.flush();

    console.log("✅ Gemini stream completed");
  } catch (err) {
    console.error("❌ Gemini stream error:", err.message || err);
    res.status(500).json({ error: err.message || "AI stream failed" });
  }
};
