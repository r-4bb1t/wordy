import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "영어공부",
  description: "ㄱㄱ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
