import CinematicHero from "./CinematicHero";
import DeviceReveal from "./DeviceReveal";
import StorytellingSection from "./StorytellingSection";
import AudioImmersion from "./AudioImmersion";
import PerformanceSection from "./PerformanceSection";
import ArchitectureShowcase from "./ArchitectureShowcase";
import DesignSystemSection from "./DesignSystemSection";
import FinalShowcase from "./FinalShowcase";

export default function ProjectExperience() {
  return (
    <main className="relative overflow-hidden bg-[#030303] text-white">
      <CinematicHero />

      <DeviceReveal />

      <StorytellingSection />

      <AudioImmersion />

      <PerformanceSection />

      <ArchitectureShowcase />

      <DesignSystemSection />

      <FinalShowcase />
    </main>
  );
}