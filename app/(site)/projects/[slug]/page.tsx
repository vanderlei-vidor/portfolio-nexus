import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProjectDetailPage from "@/features/projects/components/ProjectDetailPage";
import {
  getCanonicalProjectSlug,
  getProjectBySlug,
  projectsList,
} from "@/features/projects/registry";
import {
  formatProjectTitle,
  getProjectDescription,
  getProjectImageUrl,
} from "@/features/projects/lib/project-format";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsList.map((project) => ({
    slug: project.slug,
  }));
}

import JsonLd from "@/shared/seo/JsonLd";

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const canonicalSlug = getCanonicalProjectSlug(slug);

  if (canonicalSlug !== slug) {
    redirect(`/projects/${canonicalSlug}`);
  }

  const project = getProjectBySlug(slug);

  const title = project?.title ?? formatProjectTitle(slug);
  const description = project?.description ?? getProjectDescription(title);
  const imageUrl = project?.imageUrl ?? getProjectImageUrl(slug);
  const baseUrl = "https://portfolio-nexus-six.vercel.app";

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    image: imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`,
    url: `${baseUrl}/projects/${slug}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web, iOS, Android",
    author: {
      "@type": "Person",
      name: "Vanderlei Vidor",
      url: "https://linkedin.com/in/vanderlei-vidor-979593410",
    },
  };

  if (project) {
    const ProjectComponent = await project.loadComponent();
    return (
      <>
        <JsonLd data={projectJsonLd} />
        <ProjectComponent />
      </>
    );
  }

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <ProjectDetailPage slug={slug} />
    </>
  );
}

// 🚀 METADATOS DINÂMICOS INTEGRADOS AO LAYOUT GLOBAL
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  const title = project?.title ?? formatProjectTitle(slug);
  const projectDescription = project?.description ?? getProjectDescription(title);
  const imageUrl = project?.imageUrl ?? getProjectImageUrl(slug);

  return {
    // Passando apenas o título puro, o Next.js aplica o "%s | Portfolio Nexus" do layout!
    title: title, 
    description: projectDescription,
    openGraph: {
      title: `${title} | Case Study`,
      description: projectDescription,
      images: [{ url: imageUrl, alt: title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Case Study`,
      description: projectDescription,
      images: [imageUrl],
    },
  };
}