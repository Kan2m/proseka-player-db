import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}