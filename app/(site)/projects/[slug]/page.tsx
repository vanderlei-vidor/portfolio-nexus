import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProjectDetailPage from "@/features/projects/components/ProjectDetailPage";
import { getCanonicalProjectSlug, getProjectBySlug } from "@/features/projects/registry";
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
  const canonicalSlug = getCanonicalProjectSlug(slug);

  if (canonicalSlug !== slug) {
    redirect(`/projects/${canonicalSlug}`);
  }

  const project = getProjectBySlug(slug);

  if (project) {
    const ProjectComponent = await project.loadComponent();
    return <ProjectComponent />;
  }

  return <ProjectDetailPage slug={slug} />;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? formatProjectTitle(slug);
  const projectDescription = project?.description ?? getProjectDescription(title);
  const imageUrl = project?.imageUrl ?? getProjectImageUrl(slug);

  return {
    title: `${title} | Meu Portfolio AAA`,
    description: projectDescription,
    openGraph: {
      title: `${title} | Meu Portfolio AAA`,
      description: projectDescription,
      images: [{ url: imageUrl, alt: title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Meu Portfolio AAA`,
      description: projectDescription,
      images: [imageUrl],
    },
  };

}
