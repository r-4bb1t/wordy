import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/sidebar";

export const metadata: Metadata = {
  title: "영어공부",
  description: "ㄱㄱ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex w-full">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
