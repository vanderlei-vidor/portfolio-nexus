import type { Metadata } from "next";
import ProjectDetailPage from "@/features/projects/components/ProjectDetailPage";
import SaaSProjectLayout from "@/features/projects/components/SaaSProjectLayout";
import EnglishTutorProjectLayout from "@/features/projects/components/EnglishTutorProjectLayout";
import PortfolioNexusLayout from "@/features/projects/components/PortfolioNexusLayout";
import {
  formatProjectTitle,
  getProjectDescription,
  getProjectImageUrl,
} from "@/features/projects/lib/project-format";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  // Render a custom layout for the SaaS demo project
  if (slug === "project-two") {
    return <SaaSProjectLayout />;
  }

  // Render the English Tutor project layout
  if (slug === "project-three") {
    return <EnglishTutorProjectLayout />;
  }

  // Render the Portfolio Nexus project layout
  if (slug === "project-four") {
    return <PortfolioNexusLayout />;
  }

  return <ProjectDetailPage slug={slug} />;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = formatProjectTitle(slug);
  const projectDescription = getProjectDescription(formattedTitle);
  const imageUrl = getProjectImageUrl(slug);

  return {
    title: `${formattedTitle} | Meu Portfolio AAA`,
    description: projectDescription,
    openGraph: {
      title: `${formattedTitle} | Meu Portfolio AAA`,
      description: projectDescription,
      images: [{ url: imageUrl, alt: formattedTitle }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedTitle} | Meu Portfolio AAA`,
      description: projectDescription,
      images: [imageUrl],
    },
  };

}
