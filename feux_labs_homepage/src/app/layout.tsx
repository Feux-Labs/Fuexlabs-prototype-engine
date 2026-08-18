import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Feux Labs — Software, AI & Automation",
  description: "Feux Labs builds software, designs automation systems, and ships AI-powered tools that do real work.",
};

// Dark is the default theme. This runs before paint so a stored "light"
// preference doesn't flash dark first — no user input involved, so it's
// safe to inline directly.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    if (localStorage.getItem('feuxlabs-theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
