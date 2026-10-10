import { withBasePath } from "@/shared/lib/public-path";

export interface ProjectCardMeta {
  slug: string;
  title: string;
  imageUrl: string;
}

export const projectsCardList: ProjectCardMeta[] = [
  {
    slug: "music-player",
    title: "Music Player",
    imageUrl: withBasePath("/projects/music-player/textures/card_home.webp"),
  },
  {
    slug: "saas-data-control",
    title: "SaaS Data Control",
    imageUrl: withBasePath("/projects/saas-data-control/textures/hero-dashboard.webp"),
  },
  {
    slug: "english-tutor",
    title: "English Tutor",
    imageUrl: withBasePath("/projects/english-tutor/textures/card_home.webp"),
  },
  {
    slug: "portfolio-nexus",
    title: "Portfolio Nexus",
    imageUrl: withBasePath("/projects/ecosystem/textures/site_card.webp"),
  },
];
