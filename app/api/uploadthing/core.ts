import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }:any) => {
      console.log("Upload completed for user id", metadata.userId);
      console.log("File url", file.url);
      return { userId: metadata.userId, file };
    }),
} satisfies FileRouter;

// Rename your local type to avoid conflict
export type OurFileRouter = typeof ourFileRouter;