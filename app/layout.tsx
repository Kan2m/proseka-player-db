import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// 英字・数字用。日本語は OS のフォント(globals.css)にフォールバックする
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// 見出し・数字などのディスプレイ用
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Project SEKAI Player Database",
  description: "Project SEKAI 競技選手データベース",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
