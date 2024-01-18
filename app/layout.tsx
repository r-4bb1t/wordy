import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "wordy",
  description: "영어 아티클을 학습지로 변환해주는 서비스입니다.",
};

const getTheme = async () => {
  const theme = cookies().get("theme")?.value || "light";
  if (theme === "light") return "lofi";
  return "ifol";
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();

  return (
    <html lang="ko" data-theme={theme}>
      <body className="h-[100dvh] overflow-y-hidden pt-16 flex flex-col bg-base-100 text-base-content transition-colors">
        <Header />
        <div className="overflow-y-auto h-full">{children}</div>
      </body>
    </html>
  );
}
