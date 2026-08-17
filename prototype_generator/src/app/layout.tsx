import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FastPrototype by Feux Labs",
  description: "Generate a concept landing page prototype for any business in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
