// app/api/uploadthing/core.ts
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Initialize UploadThing
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      // Get the currently logged-in user
      const user = await currentUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }:any) => {
      console.log("Upload completed for user id:", metadata.userId);
      console.log("File URL:", file.ufsUrl);

      // You can trigger your AI or DB actions here
      // Example: await storePdfSummaryAction({ ... });

      return { userId: metadata.userId, file };
    }),
} satisfies FileRouter;

// Export TypeScript type for your router
export type OurFileRouter = typeof ourFileRouter;
