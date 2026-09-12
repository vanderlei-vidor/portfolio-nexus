import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isUserOrOrgPage = repositoryName.endsWith(".github.io");
const githubPagesBasePath = isGitHubPages && repositoryName && !isUserOrOrgPage ? `/${repositoryName}` : "";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? githubPagesBasePath).replace(/\/$/, "");

if (basePath) {
  process.env.NEXT_PUBLIC_BASE_PATH = basePath;
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;