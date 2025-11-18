import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "食事区分求積法",
  description: "今自分が「何」飯を食べているか───知りたくないか？",
  openGraph: {
    title: "食事区分求積法",
    description: "今自分が「何」飯を食べているか───知りたくないか？",
    url: "https://current-meal.vercel.app",
    siteName: "current-meal",
    images: [
      {
        url: "/current-meal-og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "食事区分求積法",
    description:
      "今自分が「何」飯を食べているか───知りたくないか？",
    images: ["/current-meal-og.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
