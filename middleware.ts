import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/summaries(.*)',
  '/upload(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect routes that are protected and NOT /api/uploadthing
  if (isProtectedRoute(req) && !req.nextUrl.pathname.startsWith('/api/uploadthing')) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
