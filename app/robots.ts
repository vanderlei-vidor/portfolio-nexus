import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://seu-dominio-real.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/_next/", // Bloqueia arquivos internos do Next.js
        "/static/", // Evita indexar arquivos estáticos duplicados
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}