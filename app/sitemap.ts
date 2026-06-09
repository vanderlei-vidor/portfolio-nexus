import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio-nexus-six.vercel.app/";
  const currentDate = new Date();

  // 1. Rotas estáticas principais do ecossistema
  const staticRoutes = ["", "/contact", "/process"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8, // Home tem prioridade máxima (1.0)
  }));

  // 2. Rotas estáticas dos cases de projetos premium
  const projectSlugs = [
    "music-player",
    "saas-data-control",
    "english-tutor",
    "portfolio-nexus",
  ];

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7, // Projetos têm peso relevante para busca indexada
  }));

  return [...staticRoutes, ...projectRoutes];
}