import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.github.io"),
  title: "Ocean Trip V2 — 把兩天交給海",
  description: "新北到屏東海生館的親子兩日旅行：行程、打包清單、預算與地圖，一站整理。",
  openGraph: {
    title: "Family Ocean Trip — 把兩天交給海",
    description: "新北到屏東海生館的親子兩日小旅行。",
    images: [{ url: "/og.png", width: 1792, height: 936, alt: "Family Ocean Trip" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
