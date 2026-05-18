import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Internet Memory",
  description:
    "AI-powered browser memory platform that helps you save, organize, and rediscover websites using smart search.",

  keywords: [
    "AI memory",
    "browser memory",
    "semantic search",
    "AI bookmarks",
    "internet memory",
    "Chrome extension",
    "AI productivity",
  ],

  authors: [
    {
      name: "Elijah Amao",
    },
  ],

  creator: "Elijah Amao",

  metadataBase: new URL(
    "https://internet-memory-phi.vercel.app"
  ),

  openGraph: {
    title: "Internet Memory",
    description:
      "Save and rediscover websites with AI-powered browser memory.",

    url: "https://internet-memory-phi.vercel.app",

    siteName: "Internet Memory",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Internet Memory",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Internet Memory",
    description:
      "AI-powered browser memory platform.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}