import { HeroSection } from "../sections/HeroSection";
import { ImmersiveExperienceSection } from "../sections/ImmersiveExperienceSection";

export default function ProjectExperience() {
    return (
        <main className="relative overflow-hidden bg-[#020308] text-white">
            <HeroSection />

            <ImmersiveExperienceSection />
        </main>
    );
}