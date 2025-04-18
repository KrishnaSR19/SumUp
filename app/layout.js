
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AuthWrapper from "./Authwrapper"; // Import the client component
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "SumUp",
  description: "Track Your Expense With Ease",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.variable} antialiased`}>
          <AuthWrapper>{children}</AuthWrapper>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
