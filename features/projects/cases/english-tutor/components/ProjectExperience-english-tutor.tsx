import { HeroSection } from "../sections/HeroSection";
import { ImmersiveExperienceSection } from "../sections/ImmersiveExperienceSection";
import { GamificationSection } from "../sections/GamificationSection";
import { AdaptiveIntelligenceSection } from "../sections/AdaptiveIntelligenceSection";
import { TechnicalArchitectureSection } from "../sections/TechnicalArchitectureSection";
import { ImpactResultsSection } from "../sections/ImpactResultsSection";
import { ProjectVisionSection } from "../sections/ProjectVisionSection";
import ProjectCaseChrome from "@/features/projects/components/ProjectCaseChrome";

export default function ProjectExperience() {
    return (
        <ProjectCaseChrome slug="english-tutor" title="English Tutor">
        <div className="relative overflow-hidden bg-[#020308] text-white">
            <HeroSection />

            <ImmersiveExperienceSection />
            
            <GamificationSection />
            <AdaptiveIntelligenceSection />
            <TechnicalArchitectureSection />
            <ImpactResultsSection/>
            <ProjectVisionSection />
        </div>
        </ProjectCaseChrome>
    );
}
