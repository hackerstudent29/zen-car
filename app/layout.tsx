import type { Metadata, Viewport } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const viewport: Viewport = {
  themeColor: "#0d0d0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "ZEN CAR | The Art of Mindful Driving & High-Performance Sanctuary",
  description: "Zen Car - A study in automotive minimalism, whisper acoustics, and high-performance tranquility. Experience the electric GT hypercar designed for mindful drivers.",
  keywords: ["Zen Car", "ZEN GT", "electric hypercar", "minimalist automotive", "quiet luxury supercar", "high performance electric GT"],
  authors: [{ name: "ZEN Automotive Corporation" }],
  metadataBase: new URL("https://zen-car.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://zen-car.vercel.app/",
    title: "ZEN CAR | The Art of Mindful Driving",
    description: "A study in automotive minimalism and high-performance tranquility. Crafted with White Yellow palette and whisper acoustics.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ZEN GT Hypercar" }],
    siteName: "ZEN Automotive",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEN CAR | The Art of Mindful Driving",
    description: "A study in automotive minimalism and high-performance tranquility. Pure form. Pure mind.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0d0d0c] text-[#F6F3E9] selection:bg-[#A6865E]/30 selection:text-[#F6F3E9] antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
