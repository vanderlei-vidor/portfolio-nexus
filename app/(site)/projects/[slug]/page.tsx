import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getCanonicalProjectSlug,
  getProjectBySlug,
  projectsList,
} from "@/features/projects/registry";
import JsonLd from "@/shared/seo/JsonLd";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const baseUrl = "https://portfolio-nexus-six.vercel.app";

export function generateStaticParams() {
  return projectsList.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const canonicalSlug = getCanonicalProjectSlug(slug);

  if (canonicalSlug !== slug) {
    redirect(`/projects/${canonicalSlug}`);
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    image: project.imageUrl.startsWith("http")
      ? project.imageUrl
      : `${baseUrl}${project.imageUrl}`,
    url: `${baseUrl}/projects/${project.slug}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web, iOS, Android",
    author: {
      "@type": "Person",
      name: "Vanderlei Vidor",
      url: "https://linkedin.com/in/vanderlei-vidor-979593410",
    },
  };

  const ProjectComponent = await project.loadComponent();

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <ProjectComponent />
    </>
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.description,
      images: [{ url: project.imageUrl, alt: project.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}
