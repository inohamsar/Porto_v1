import type { Metadata, Viewport } from "next";
import { Syne, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "InoHamsar | Software Developer & AI Solution Architect",
  description: "High-end scrollytelling portfolio showcasing expertise in AI Engineering, Cloud Architecture, and Digital Advertising.",
  keywords: ["Software Developer", "AI Solution Architect", "Digital Advertising", "Cloud Infrastructure", "InoHamsar", "Portfolio"],
  authors: [{ name: "InoHamsar" }],
  openGraph: {
    title: "InoHamsar | Software Developer & AI Solution Architect",
    description: "High-end scrollytelling portfolio showcasing expertise in AI Engineering, Cloud Architecture, and Digital Advertising.",
    type: "website",
    locale: "id_ID",
    url: "https://inohamsar.com",
    siteName: "InoHamsar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "InoHamsar | Software Developer & AI Solution Architect",
    description: "High-end scrollytelling portfolio showcasing expertise in AI Engineering, Cloud Architecture, and Digital Advertising.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#000000]">
      <body
        className={`${syne.variable} ${manrope.variable} ${plusJakartaSans.variable} antialiased bg-[#000000] text-white selection:bg-white selection:text-black`}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
