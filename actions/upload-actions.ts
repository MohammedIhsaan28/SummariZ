"use server";

import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langChain";
import { generateSummaryFromGeminiAI } from "@/lib/geminiai";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfText({ fileUrl }: { fileUrl: string }) {
  if (!fileUrl) return { success: false, message: "File URL is missing", data: null };

  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    if (!pdfText) return { success: false, message: "Failed to extract PDF text", data: null };

    return { success: true, message: "PDF text generated", data: { pdfText } };
  } catch (error) {
    return { success: false, message: "Error extracting PDF text", data: null };
  }
}

export async function generatePdfSummary({ pdfText, fileName }: { pdfText: string; fileName: string }) {
  try {
    const summary = await generateSummaryFromGeminiAI(pdfText);
    if (!summary) return { success: false, message: "Failed to generate summary", data: null };

    return { success: true, message: "Summary generated", data: { summary, title: fileName } };
  } catch (error) {
    return { success: false, message: "Error generating summary", data: null };
  }
}

async function savePdfSummary({ userId, fileUrl, summary, title, fileName }: PdfSummaryType) {
  const sql = await getDbConnection();
  const [savedSummary] = await sql`INSERT INTO pdf_summaries (
    user_id, original_file_url, summary_text, title, file_name
  ) VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName})
  RETURNING id, summary_text`;

  return savedSummary;
}

export async function storePdfSummaryAction({ fileUrl, summary, title, fileName }: PdfSummaryType) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "User not authenticated" };

    const savedSummary = await savePdfSummary({ userId, fileUrl, summary, title, fileName });
    if (!savedSummary?.id) return { success: false, message: "Failed to save summary" };

    revalidatePath(`/summaries/${savedSummary.id}`);
    return { success: true, message: "Summary saved", data: { id: savedSummary.id } };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error storing summary" };
  }
}
