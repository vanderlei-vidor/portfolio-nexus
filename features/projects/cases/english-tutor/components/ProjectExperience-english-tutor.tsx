import { HeroSection } from "../sections/HeroSection";
import { ImmersiveExperienceSection } from "../sections/ImmersiveExperienceSection";
import { GamificationSection } from "../sections/GamificationSection";
import { AdaptiveIntelligenceSection } from "../sections/AdaptiveIntelligenceSection";
import { TechnicalArchitectureSection } from "../sections/TechnicalArchitectureSection";
import { ImpactResultsSection } from "../sections/ImpactResultsSection";
import { ProjectVisionSection } from "../sections/ProjectVisionSection";

export default function ProjectExperience() {
    return (
        <main className="relative overflow-hidden bg-[#020308] text-white">
            <HeroSection />

            <ImmersiveExperienceSection />
            
            <GamificationSection />
            <AdaptiveIntelligenceSection />
            <TechnicalArchitectureSection />
            <ImpactResultsSection/>
            <ProjectVisionSection />
        </main>
    );
}