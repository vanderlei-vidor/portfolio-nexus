import CinematicHero from "../section/CinematicHero/CinematicHero";
import DeviceReveal from "../section/DeviceReveal/DeviceReveal";
import StorytellingSection from "../section/StorytellingSection/StorytellingSection";
import AudioImmersion from "../section/AudioImmersion/AudioImmersion";
import PerformanceSection from "../section/PerformanceSection/PerformanceSection";
import ArchitectureShowcase from "../section/ArchitectureShowcase/ArchitectureShowcase";
import DesignSystemSection from "../section/DesignSystemSection/DesignSystemSection";
import FinalShowcase from "../section/FinalShowcase/FinalShowcase";
import ProjectCaseChrome from "@/features/projects/components/ProjectCaseChrome";
import CaseStudySummary from "@/features/projects/components/CaseStudySummary";
import CaseStudyTechnicalProof from "@/features/projects/components/CaseStudyTechnicalProof";

export default function ProjectExperience() {
  return (
    <ProjectCaseChrome slug="music-player" title="Music Player">
      <CinematicHero />

      <CaseStudySummary slug="music-player" />

      <DeviceReveal />

      <StorytellingSection />

      <AudioImmersion />

      <PerformanceSection />

      <ArchitectureShowcase />

      <CaseStudyTechnicalProof slug="music-player" />

      <DesignSystemSection />

      <FinalShowcase />
    </ProjectCaseChrome>
  );
}
