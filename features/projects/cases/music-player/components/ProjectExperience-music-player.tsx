import CinematicHero from "../section/CinematicHero/CinematicHero";
import DeviceReveal from "../section/DeviceReveal/DeviceReveal";
import StorytellingSection from "../section/StorytellingSection/StorytellingSection";
import AudioImmersion from "../section/AudioImmersion/AudioImmersion";
import PerformanceSection from "../section/PerformanceSection/PerformanceSection";
import ArchitectureShowcase from "../section/ArchitectureShowcase/ArchitectureShowcase";
import DesignSystemSection from "../section/DesignSystemSection/DesignSystemSection";
import FinalShowcase from "../section/FinalShowcase/FinalShowcase";
import ProjectCaseChrome from "@/features/projects/components/ProjectCaseChrome";

export default function ProjectExperience() {
  return (
    <ProjectCaseChrome slug="music-player" title="Music Player">
      <CinematicHero />

      <DeviceReveal />

      <StorytellingSection />

      <AudioImmersion />

      <PerformanceSection />

      <ArchitectureShowcase />

      <DesignSystemSection />

      <FinalShowcase />
    </ProjectCaseChrome>
  );
}
