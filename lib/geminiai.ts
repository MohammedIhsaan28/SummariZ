import { GoogleAIFileManager, GoogleGenAI } from "@google/genai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSummaryFromGeminiAI = async (pdfText: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error: any) {
        if (error?.status === 429) {
            throw new Error("RATE_LIMIT_EXCEEDED");
        }
        console.error("Gemini API Error", error);
        throw error;
    }
};
