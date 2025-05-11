import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CourseGPT - AI-Powered Lesson Generation",
  description: "Generate engaging and effective educational content with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <Navbar />
          <main className="relative">{children}</main>
        </div>
      </body>
    </html>
  );
}
