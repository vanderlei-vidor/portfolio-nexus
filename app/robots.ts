import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPage = repositoryName.endsWith(".github.io");
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_PAGES === "true" && repositoryName && !isUserOrOrgPage ? `/${repositoryName}` : "");
const owner = process.env.GITHUB_REPOSITORY?.split("/")[0] ?? "vanderlei-vidor";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${owner}.github.io${basePath}/`;

export default function robots(): MetadataRoute.Robots {

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