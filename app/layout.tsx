import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "wordy",
  description: "영어 아티클을 학습지로 변환해주는 서비스입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
