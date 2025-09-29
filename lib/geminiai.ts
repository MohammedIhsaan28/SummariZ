import { GoogleGenAI } from "@google/genai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateSummaryFromGeminiAI = async (pdfText: string) => {
  try {
    const contents = [
      {
        role: "user",
        parts: [
          { text: SUMMARY_SYSTEM_PROMPT },
          {
            text:
              "Transform this document into an engaging easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n" +
              pdfText,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    if (!response.text) {
      throw new Error("No response from Gemini AI");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error", error);
    throw error;
  }
};
