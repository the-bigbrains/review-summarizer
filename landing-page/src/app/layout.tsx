import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review Generator 9000",
  description: "Tired of reading dozens of reviews shopping? We are too. That's why we created Review Generator 9000; a tool that takes reviews and processes them into short, concise summaries!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-serif">{children}</body>
    </html>
  );
}
