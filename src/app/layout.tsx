import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "포스코사랑공인중개사 | 대시보드",
  description: "포스코사랑공인중개사 부동산 업무 관리 시스템",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
