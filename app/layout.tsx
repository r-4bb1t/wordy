import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";

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
      <body className="h-[100dvh] overflow-y-hidden pt-14">
        <Header />
        <div className="overflow-y-auto h-full">{children}</div>
      </body>
    </html>
  );
}
