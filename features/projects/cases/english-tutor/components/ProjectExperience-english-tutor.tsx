"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "../sections/HeroSection";
import ProjectCaseChrome from "@/features/projects/components/ProjectCaseChrome";

function SectionFallback() {
  return <div className="min-h-screen bg-[#020308]" aria-hidden="true" />;
}

const ImmersiveExperienceSection = dynamic(
  () => import("../sections/ImmersiveExperienceSection").then((mod) => mod.ImmersiveExperienceSection),
  { loading: SectionFallback }
);
const GamificationSection = dynamic(
  () => import("../sections/GamificationSection").then((mod) => mod.GamificationSection),
  { loading: SectionFallback }
);
const AdaptiveIntelligenceSection = dynamic(
  () => import("../sections/AdaptiveIntelligenceSection").then((mod) => mod.AdaptiveIntelligenceSection),
  { loading: SectionFallback }
);
const TechnicalArchitectureSection = dynamic(
  () => import("../sections/TechnicalArchitectureSection").then((mod) => mod.TechnicalArchitectureSection),
  { loading: SectionFallback }
);
const ImpactResultsSection = dynamic(
  () => import("../sections/ImpactResultsSection").then((mod) => mod.ImpactResultsSection),
  { loading: SectionFallback }
);
const ProjectVisionSection = dynamic(
  () => import("../sections/ProjectVisionSection").then((mod) => mod.ProjectVisionSection),
  { loading: SectionFallback }
);

function DeferredCaseSections() {
  const [shouldLoadSections, setShouldLoadSections] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setShouldLoadSections(true), { timeout: 800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => setShouldLoadSections(true), 350);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!shouldLoadSections) {
    return <SectionFallback />;
  }

  return (
    <>
      <ImmersiveExperienceSection />
      <GamificationSection />
      <AdaptiveIntelligenceSection />
      <TechnicalArchitectureSection />
      <ImpactResultsSection />
      <ProjectVisionSection />
    </>
  );
}

export default function ProjectExperience() {
  return (
    <ProjectCaseChrome slug="english-tutor" title="English Tutor">
      <div className="relative overflow-hidden bg-[#020308] text-white">
        <HeroSection />
        <DeferredCaseSections />
      </div>
    </ProjectCaseChrome>
  );
}
