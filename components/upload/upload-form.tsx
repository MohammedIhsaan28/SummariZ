"use client";

import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import {
  generatePdfSummary,
  generatePdfText,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";
import { formatFileNameAsTitle } from "@/utils/format-utils";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, "File size must be less than 20MB")
    .refine((file) => file.type === "application/pdf", { message: "File must be a PDF" }),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {toast.success("Uploaded successfully!")},
    onUploadError: (err) => {
      toast.error("Error occurred while uploading.");
      console.error("Upload error:", err);
    },
    onUploadBegin: (file) => {
      toast(`Upload has begun for ${file}`);
      console.log("Uploading file:", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file");

      if (!file || !(file instanceof File)) {
        toast.error("Please select a PDF file to upload.");
        return;
      }

      const validated = schema.safeParse({ file });
      if (!validated.success) {
        toast.error(validated.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
        return;
      }

      // Start UploadThing upload
      const uploadResponse:any = await startUpload([file]);
      const uploadFileUrl =
        uploadResponse?.[0]?.serverData?.file?.ufsUrl ||
        uploadResponse?.[0]?.serverData?.fileUrl;

      if (!uploadFileUrl) {
        toast.error("Upload failed. No file URL returned.");
        return;
      }

      toast("Processing PDF summary...");

      const formattedFileName = formatFileNameAsTitle(file.name);
      const pdfTextResult = await generatePdfText({ fileUrl: uploadFileUrl });

      if (!pdfTextResult.success || !pdfTextResult.data?.pdfText) {
        toast.error("Failed to extract PDF text.");
        return;
      }

      const summaryResult = await generatePdfSummary({
        pdfText: pdfTextResult.data.pdfText,
        fileName: formattedFileName,
      });

      if (!summaryResult.success || !summaryResult.data?.summary) {
        toast.error(summaryResult.message || "Failed to generate summary.");
        return;
      }

      const storeResult = await storePdfSummaryAction({
        summary: summaryResult.data.summary,
        fileUrl: uploadFileUrl,
        title: formattedFileName,
        fileName: file.name,
      });

      if (storeResult?.success && storeResult.data?.id) {
        toast.success("PDF summary saved successfully!");
        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data.id}`);
      } else {
        toast.error(storeResult?.message || "Failed to save PDF summary.");
        console.error("storeResult:", storeResult);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">Upload PDF</span>
        </div>
      </div>

      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />

      {isLoading && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">Processing</span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
