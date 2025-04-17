import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Middleware configuration
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|$).*)", // Ignore Next.js internals + Home `/`
    "/(api|trpc)(.*)", // Always apply to API routes
  ],
};
