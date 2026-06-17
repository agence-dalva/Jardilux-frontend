import type { Metadata } from "next";
import { EB_Garamond, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Titres : EB Garamond (serif)
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Texte : IBM Plex Sans (sans-serif)
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Jardilux — Mobilier & Décoration de Jardin",
    template: "%s | Jardilux",
  },
  description:
    "Découvrez notre sélection de mobilier et décorations extérieures, alliant élégance et fonctionnalité pour embellir votre jardin.",
  keywords: [
    "mobilier de jardin",
    "décoration extérieure",
    "luminaires extérieurs",
    "jardilux",
  ],
  openGraph: {
    siteName: "Jardilux",
    locale: "fr_FR",
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
      lang="fr"
      className={`${garamond.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-creme text-sombre">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
