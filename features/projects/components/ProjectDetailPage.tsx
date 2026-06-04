import ProjectContentSection from "../cases/music-player/components/ProjectExperience-music-player";
import ProjectHeroSection from "./ProjectHeroSection";

import { formatProjectTitle } from "@/features/projects/lib/project-format";

interface ProjectDetailPageProps {
  slug: string;
}

export default function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const formattedTitle = formatProjectTitle(slug);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-accent selection:text-black">
      <ProjectHeroSection slug={slug} formattedTitle={formattedTitle} />
      <ProjectContentSection />
    </main>
  );
}
