"use client"; // Move this to the first line

import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function AuthWrapper({ children }) {
  const pathname = usePathname(); // Get the current route

  if (pathname === "/") {
    return children; // Allow home page access without authentication
  }

  return (
    <>
      <SignedOut>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <SignIn routing="hash" />
        </div>
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  );
}
