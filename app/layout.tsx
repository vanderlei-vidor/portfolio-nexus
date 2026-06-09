import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { MagneticProvider } from "@/shared/effects/magnetic/MagneticContext";
import { MouseProvider } from "@/shared/context/MouseContext"; 
import Cursor from "@/shared/effects/Cursor"; 
import Grain from "@/shared/effects/Grain";
import PageTransition from "@/shared/effects/PageTransition";
import SmoothScroll from "@/shared/effects/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🌐 SEU LINK OFICIAL DA VERCEL CONFIGURADO!
const baseUrl = "https://portfolio-nexus-six.vercel.app"; 

export const metadata: Metadata = {
  // 🎯 O Next.js usa essa base para resolver caminhos de sitemap e imagens do OG de forma absoluta
  metadataBase: new URL(baseUrl), 
  title: {
    default: "Portfolio Nexus | Premium Digital Experiences",
    template: "%s | Portfolio Nexus",
  },
  description: "Software developer and digital content creator crafting high-performance multi-platform applications, immersive audio experiences, and premium web systems.",
  keywords: ["Software Developer", "Flutter", "Next.js", "Tailwind CSS", "Audio Engineering", "Premium Portfolio", "Web Development"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    title: "Portfolio Nexus | Premium Digital Experiences",
    description: "Exploração de cases de alta performance, design imersivo and arquitetura de software refinada.",
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
    title: "Portfolio Nexus | Premium Digital Experiences",
    description: "Exploração de cases de alta performance e design imersivo.",
    images: ["/og-image.jpg"],
  },
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
      <body className="min-h-full flex flex-col bg-black text-white" suppressHydrationWarning>

        {/* Adiciona a textura de granulação sobre todo o site */}
        <Grain />

        {/* Envolve a árvore com o MouseProvider junto com o MagneticProvider */}
        <MouseProvider>
          <MagneticProvider>
            <SmoothScroll>
              <PageTransition>
                <Cursor /> 
                
                {children}

                {/* 📊 Real User Monitoring ativo! Medindo performance de dispositivos reais */}
                <SpeedInsights />
              </PageTransition>
            </SmoothScroll>
          </MagneticProvider>
        </MouseProvider>

      </body>
    </html>
  );
}