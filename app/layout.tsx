import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Grain from "@/shared/effects/Grain";
import AppRuntime from "@/shared/effects/AppRuntime";
import JsonLd, { getPersonJsonLd, getWebSiteJsonLd } from "@/shared/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://portfolio-nexus-six.vercel.app";
const siteDescription =
  "Portfolio by Vanderlei Vidor, presenting digital products, case studies and engineering stories across web, mobile, AI and data-driven systems.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Portfolio Nexus | Product, Engineering & Case Studies",
    template: "%s | Portfolio Nexus",
  },
  description: siteDescription,
  keywords: [
    "Software Developer",
    "Next.js",
    "Flutter",
    "Spring Boot",
    "AI Tutor",
    "Case Studies",
    "Web Development",
  ],
  alternates: {
    canonical: baseUrl,
    languages: {
      en: baseUrl,
      "pt-BR": baseUrl,
      es: baseUrl,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES"],
    url: baseUrl,
    title: "Portfolio Nexus | Product, Engineering & Case Studies",
    description: siteDescription,
    siteName: "Portfolio Nexus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio Nexus Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Nexus | Product, Engineering & Case Studies",
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = getPersonJsonLd(baseUrl);
  const webSiteJsonLd = getWebSiteJsonLd(baseUrl);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={personJsonLd} />
        <JsonLd data={webSiteJsonLd} />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white" suppressHydrationWarning>
        <Grain />
        <AppRuntime>{children}</AppRuntime>
      </body>
    </html>
  );
}
