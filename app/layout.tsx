// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css"; // Ajustado para a pasta que você criou!
import { MagneticProvider } from "@/shared/components/magnetic/MagneticContext";
import Grain from "@/shared/components/effects/Grain";
import PageTransition from "@/shared/components/effects/PageTransition";
import SmoothScroll from "@/shared/components/effects/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://seusite.com'),
  title: "Portfolio AAA",
  description: "Portfolio de experiencias digitais premium com Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white"
        suppressHydrationWarning>

        {/* Adiciona a textura de granulação sobre todo o site */}
        <Grain />

        {/* 2. Envolve tudo que existe no site de uma vez por todas */}
        <MagneticProvider>
          <SmoothScroll>
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScroll>
        </MagneticProvider>






      </body>
    </html>
  );
}
