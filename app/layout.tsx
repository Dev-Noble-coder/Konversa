import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit', // Define a CSS variable name
});

export const metadata: Metadata = {
  title: "Konversa | The Business Command Center for Social Sellers",
  description: "Transform your social media into a professional storefront. Konversa uses AI to automate WhatsApp, Instagram, Telegram, and TikTok sales. Post once, sell everywhere, and never miss an order.",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/drhfrgahv/image/upload/v1776378749/K._1_u8f8km.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "https://res.cloudinary.com/drhfrgahv/image/upload/v1776378750/K._joq5xc.png",
        media: "(prefers-color-scheme: light)",
      },
    ],
    shortcut: "https://res.cloudinary.com/drhfrgahv/image/upload/v1776378749/K._1_u8f8km.png",
    apple: "https://res.cloudinary.com/drhfrgahv/image/upload/v1776378749/K._1_u8f8km.png",
  },
  openGraph: {
    title: "Konversa | AI-Powered Social Commerce",
    description: "The Business Command Center for modern social sellers. Centralize orders and automate sales seamlessly.",
    url: "https://konversa.co", // Replace with real domain when live
    siteName: "Konversa",
    images: [
      {
        url: "https://res.cloudinary.com/drhfrgahv/image/upload/v1776378579/Konversa._arxdtz.png",
        width: 1200,
        height: 630,
        alt: "Konversa Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
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
      className={`${outfit.className} antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#020617]">{children}</body>
    </html>
  );
}
