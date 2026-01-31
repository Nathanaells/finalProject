const MainRepository = require("../repositories/mainRepository");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const genAI = process.env.GOOGLE_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })
  : null;

class MainService {
  static async chat({ userID, prompt }) {
    try {
      if (!userID) {
        throw {
          name: "AuthenticationError",
          message: "User not authenticated",
        };
      }

      if (!prompt || !prompt.trim()) {
        throw {
          name: "ValidationError",
          message: "Prompt is required",
        };
      }

      // If SDK not configured, fallback to echo
      if (!genAI) {
        const fallback = `Echo: ${prompt}`;
        const title = prompt.slice(0, 50) + (prompt.length > 50 ? "..." : "");
        const saved = await MainRepository.createHistory({
          title,
          description: fallback,
          userID,
        });
        return { result: fallback, saved };
      }

      const model = process.env.GOOGLE_GENAI_MODEL || "gemini-2.5-flash";

      const result = await genAI.models.generateContent({
        model,
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      // parse result similar to frontend logic
      let text = "";
      if (result?.response?.candidates?.length) {
        text =
          result.response.candidates[0]?.content?.parts?.[0]?.text ||
          "Tidak ada respons dari model.";
      } else if (typeof result?.text === "string") {
        text = result.text;
      } else {
        text = JSON.stringify(result);
      }

      // Trim whitespace dan hilangkan newline/tab characters
      text = text
        .trim()
        .replace(/\\n/g, " ")
        .replace(/\\t/g, " ")
        .replace(/\s+/g, " ");

      // Generate title from prompt (first 50 chars)
      const title = prompt.slice(0, 50) + (prompt.length > 50 ? "..." : "");

      await MainRepository.createHistory({
        title,
        description: text,
        userID,
      });
      return { result: text };
    } catch (error) {
      throw error;
    }
  }

  static async getHistories(userID) {
    try {
      const records = await MainRepository.getHistoriesByUser(userID);
      return records;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MainService;
