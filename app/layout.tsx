import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "wordy",
  description: "영어 아티클을 학습지로 변환해주는 서비스입니다.",
  metadataBase: new URL("https://wordy.r4bb1t.dev"),
  openGraph: {
    images: [
      {
        url: "https://wordy.r4bb1t.dev/cover.png",
        width: 1200,
        height: 630,
        alt: "wordy",
      },
    ],
  },
};

const getTheme = async () => {
  const theme = cookies().get("theme")?.value || "light";
  return theme as "light" | "dark";
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();

  return (
    <html
      lang="ko"
      data-theme={theme === "light" ? "lofi" : "ifol"}
      data-color-mode={theme}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6832330944407417"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="h-[100dvh] overflow-y-hidden pt-16 flex flex-col bg-base-100 text-base-content transition-colors">
        <Header />
        <div className="overflow-y-auto h-full">{children}</div>
      </body>
    </html>
  );
}
