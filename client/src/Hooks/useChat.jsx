import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useChat = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("menstalk-messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  // Save messages in localStorage for persistence
  useEffect(() => {
    localStorage.setItem("menstalk-messages", JSON.stringify(messages));
  }, [messages]);

  // 🧹 Helper to clean Gemini's raw text (no messy symbols)
  const cleanText = (text) => {
    if (!text) return "Hmm... couldn't understand that 🤔";
    return text
      .replace(/[*#_`]/g, "") // remove markdown symbols
      .replace(/<[^>]*>/g, "") // remove <tags>
      .replace(/\n{2,}/g, "\n") // reduce multiple newlines
      .replace(/\n/g, " ") // make single line
      .trim();
  };

  // Send message and get Gemini response
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file."
        );
      }

      // Initialize Gemini client
      const genAI = new GoogleGenerativeAI(apiKey);

      // Use current model (gemini-1.5-flash retired; 2.5 is active)
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          maxOutputTokens: 8192,
          temperature: 0.7,
        },
      });

      // 🧠 Add contextual prompt for Menstalk AI
          const prompt = `
        You are Menstalk AI — an empathetic, knowledgeable, and grounded companion
        designed to help men talk about their mental health, emotions, motivation,
        relationships, and lifestyle in a safe, judgment-free space.

        Your role:
        - Listen first, then respond calmly and conversationally.
        - Offer thoughtful insights, emotional understanding, and practical guidance.
        - If the user expresses sadness, anxiety, loneliness, or anger, respond with genuine empathy
          and give simple actions they can try right now (like journaling, breathing, or talking to someone they trust).
        - When the topic is fitness, relationships, career, habits, or confidence,
          give detailed, constructive advice, steps, or mindset shifts — be informative and encouraging.
        - Mention professional help only when the user seems in crisis (never as a default line).
        - Never sound robotic or generic. Speak like a supportive friend who reads psychology, fitness, and motivation books.
        - Avoid medical prescriptions or diagnosis. Stay conversational, positive, and human.

        Tone:
        - Calm, supportive, slightly informal.
        - 2–4 sentences per reply.
        - No emojis unless the user uses one first.

        
        Now, reply to this message in deatil  as Menstalk AI:
        "${text}"
        `;


      // Generate AI response
      const result = await model.generateContent(prompt);
      const response = result.response;

      // Safely extract text (response.text() throws if blocked or no candidates)
      let botText = "";
      if (response.candidates?.length > 0) {
        const parts = response.candidates[0].content?.parts;
        if (parts?.length) {
          botText = parts.map((p) => p.text || "").join("");
        }
      }
      if (response.promptFeedback?.blockReason) {
        botText = "Your message was blocked by safety filters. Try rephrasing.";
      }

      botText = cleanText(botText) || "I couldn't generate a response. Try again?";

      const botMsg = {
        text: botText || "Hmm... I’m thinking 🤔. Try rephrasing that?",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
    }
     catch (error) {
      console.error("Gemini Error:", error);

      const errorMsg = {
        text:
          "⚠️ Oops, something went wrong while connecting to Gemini.\n" +
          (error.message || "Please try again later."),
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => setMessages([]);

  return { messages, sendMessage, clearChat, isLoading };
};