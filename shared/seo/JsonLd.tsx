import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Componente seguro para injeção de dados estruturados JSON-LD (Schema.org)
 * Compatível com Server Components e otimizado para Google Rich Snippets.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Schema JSON-LD da pessoa / profissional (Vanderlei Vidor)
 * Vinculado ao LinkedIn oficial e às áreas de atuação técnica.
 */
export function getPersonJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Vanderlei Vidor",
    jobTitle: "Software Engineer",
    url: baseUrl,
    sameAs: [
      "https://linkedin.com/in/vanderlei-vidor-979593410",
    ],
    description:
      "Software Engineer building cross-platform applications, AI-powered products, and modern digital experiences with Next.js, TypeScript, Flutter, and Tailwind CSS.",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Flutter",
      "Tailwind CSS",
      "Software Architecture",
      "Full-Stack Development",
      "UI/UX Engineering",
      "GSAP Motion Design",
    ],
  };
}

/**
 * Schema JSON-LD do WebSite / Portfolio
 */
export function getWebSiteJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Portfolio Nexus",
    description: "Premium digital experiences, high-performance web applications & intelligent software systems.",
    inLanguage: ["en", "pt-BR", "es"],
    author: {
      "@id": `${baseUrl}/#person`,
    },
  };
}
