//layout.tsx  
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// Define the Inter font with the desired settings
const inter = Inter({
  variable: "--font-inter",  // Create a CSS variable for the font
  subsets: ["latin"],        // You can add more subsets if needed
  weight: ["400", "600", "700"], // Regular, Medium, and Bold font weights
  display: "swap",           // Ensures optimized font rendering
});

export const metadata: Metadata = {
  title: "Pamas Ai",
  description: "Your EduCopilot for effortless learning and productivity.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased overflow-x-hidden w-full`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden w-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}