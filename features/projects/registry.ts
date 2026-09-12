import type { ComponentType } from "react";

export interface ProjectRegistryEntry {
  slug: string;
  title: string;
  cardDescription: string;
  description: string;
  imageUrl: string;
  loadComponent: () => Promise<ComponentType>;
}

export const projectsRegistry = {
  "music-player": {
    slug: "music-player",
    title: "Music Player",
    cardDescription: "Local-first audio player",
    description:
      "Explore the Music Player case study: a local-first Flutter audio player shaped around resilient playback, library ownership, native integrations and disciplined release engineering.",
    imageUrl: "/projects/music-player/textures/card_home.webp",
    loadComponent: async () => (await import("./cases/music-player")).default,
  },
  "saas-data-control": {
    slug: "saas-data-control",
    title: "SaaS Data Control",
    cardDescription: "Enterprise task platform",
    description:
      "Explore the SaaS Data Control case study: a Java and Spring Boot productivity platform built around secure sessions, tenant-aware data access, reports and operational clarity.",
    imageUrl: "/projects/saas-data-control/textures/hero-dashboard.webp",
    loadComponent: async () => (await import("./cases/saas-data-control")).default,
  },
  "english-tutor": {
    slug: "english-tutor",
    title: "English Tutor",
    cardDescription: "AI language tutor",
    description:
      "Explore the English Tutor case study: a Flutter and FastAPI language tutor where a deterministic Teacher Brain guides learning before the local LLM writes the response.",
    imageUrl: "/projects/english-tutor/textures/english-tutor-screen.webp",
    loadComponent: async () => (await import("./cases/english-tutor")).default,
  },
  "portfolio-nexus": {
    slug: "portfolio-nexus",
    title: "Portfolio Nexus",
    cardDescription: "Case-study ecosystem",
    description:
      "Explore the Portfolio Nexus case study: a multilingual Next.js portfolio built as a modular case-study system with static generation, motion and a clear engineering narrative.",
    imageUrl: "/projects/ecosystem/textures/site_card.webp",
    loadComponent: async () => (await import("./cases/ecosystem")).default,
  },
} satisfies Record<string, ProjectRegistryEntry>;

export type ProjectSlug = keyof typeof projectsRegistry;

export const legacyProjectSlugMap: Record<string, ProjectSlug> = {
  "project-one": "music-player",
  "project-two": "saas-data-control",
  "project-three": "english-tutor",
  "project-four": "portfolio-nexus",
};

export const projectsList = Object.values(projectsRegistry);

export function getCanonicalProjectSlug(slug: string) {
  return legacyProjectSlugMap[slug] ?? slug;
}

export function getProjectBySlug(slug: string) {
  const canonicalSlug = getCanonicalProjectSlug(slug);

  return projectsRegistry[canonicalSlug as ProjectSlug];
}
