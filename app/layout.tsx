import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "泡泡爪宠物洗护",
  description: "宠物洗护预约页面",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
