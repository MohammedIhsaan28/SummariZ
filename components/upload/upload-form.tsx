"use client";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("Uploaded successfully!");
    },
    onUploadError: (err) => {
      toast.error("Error occurred while uploading.");
      console.error("error occured while uploading", err);
    },
    onUploadBegin: (file) => {
      toast("Upload has begun for " + file);
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const fromData = new FormData(e.currentTarget);
      const file = fromData.get("file");

      // Check if file exists and is a File object
      if (!file || !(file instanceof File)) {
        toast.error("Please select a PDF file to upload.");
        return;
      }

      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast.error(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );
        setIsLoading(false);
        return;
      }

      const resp:any = await startUpload([file]); // target 
      if (!resp) {
        toast.error("No response from server.");
        setIsLoading(false);
        return;
      }

      toast("File uploaded successfully. Generating summary...");



      const result = await generatePdfSummary(resp);
      console.log({ result });

      const { data = null, message = null } = result || {};
      if (data) {

        let storeResult:any; 
        toast("Saving PDF...");
      
        if (data.summary){
        storeResult = await storePdfSummaryAction({
          summary:data.summary,
          fileUrl:resp[0].serverData.file.url,
          title:data.title,
          fileName:file.name
        });

        toast('PDF summary saved successfully!');
        formRef.current?.reset();
        //ToDo:redirect to the summary page
        router.push(`/summaries/${storeResult.data.id}`);

      }
      }
      

    } catch (error) {
      setIsLoading(false);
      console.error("Error Occured", error);
      formRef.current?.reset();
      toast.error("An error occured. Please try again.");
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
