import { HeroSection } from "../sections/HeroSection";
import { ImmersiveExperienceSection } from "../sections/ImmersiveExperienceSection";
import { GamificationSection } from "../sections/GamificationSection";
import { AdaptiveIntelligenceSection } from "../sections/AdaptiveIntelligenceSection";

export default function ProjectExperience() {
    return (
        <main className="relative overflow-hidden bg-[#020308] text-white">
            <HeroSection />

            <ImmersiveExperienceSection />
            
            <GamificationSection />
            <AdaptiveIntelligenceSection />
        </main>
    );
}