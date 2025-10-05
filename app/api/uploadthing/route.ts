import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

// src/app/api/uploadthing/route.ts
export const runtime = "nodejs";
