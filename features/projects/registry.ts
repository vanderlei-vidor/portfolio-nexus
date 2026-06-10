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
    cardDescription: "Offline audio experience",
    description:
      "Explore o case Music Player: uma experiencia offline de audio com interface imersiva, motion refinado e foco em performance.",
    imageUrl: "/projects/music-player/textures/card_home.webp",
    loadComponent: async () => (await import("./cases/music-player")).default,
  },
  "saas-data-control": {
    slug: "saas-data-control",
    title: "SaaS Data Control",
    cardDescription: "Native data platform",
    description:
      "Explore o case SaaS Data Control: uma experiencia SaaS orientada a dados, controle e clareza operacional.",
    imageUrl: "/projects/saas-data-control/textures/hero-dashboard.webp",
    loadComponent: async () => (await import("./cases/saas-data-control")).default,
  },
  "english-tutor": {
    slug: "english-tutor",
    title: "English Tutor",
    cardDescription: "AI learning interface",
    description:
      "Explore o case English Tutor: um sistema moderno de aprendizado com hierarquia visual forte e interacoes fluidas.",
    imageUrl: "/projects/english-tutor/textures/english-tutor-screen.webp",
    loadComponent: async () => (await import("./cases/english-tutor")).default,
  },
  "portfolio-nexus": {
    slug: "portfolio-nexus",
    title: "Portfolio Nexus",
    cardDescription: "Premium portfolio ecosystem",
    description:
      "Explore o case Portfolio Nexus: uma experiencia digital com base escalavel, narrativa visual e acabamento premium.",
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
