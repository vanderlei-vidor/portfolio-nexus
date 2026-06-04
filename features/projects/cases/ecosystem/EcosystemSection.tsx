import "./EcosystemSection.css";

import EcosystemCinematicDirector from "./EcosystemCinematicDirector";
import EcosystemHero from "./section/Hero/EcosystemHero";
import ConnectedWorlds from "./section/ConnectedWorlds/ConnectedWorlds";
import DigitalGap from "./section/DigitalGap/DigitalGap";
import ExperienceReimagined from "./section/ExperienceReimagined/ExperienceReimagined";
import IntelligencePersonalized from "./section/IntelligencePersonalized/IntelligencePersonalized";
import ControlAtScale from "./section/ControlAtScale/ControlAtScale";
import Evolution from "./section/Evolution/Evolution";
import EngineeringDNA from "./section/EngineeringDNA/EngineeringDNA";
import DesignPhilosophy from "./section/DesignPhilosophy/DesignPhilosophy";
import Numbers from "./section/Numbers/Numbers";
import FutureVision from "./section/FutureVision/FutureVision";
import FinalCTA from "./section/FinalCTA/FinalCTA";

export default function EcosystemSection() {
  return (
    <section className="ecosystem" data-cinematic-case="portfolio-nexus">
      <EcosystemCinematicDirector />

      <EcosystemHero />

      <ConnectedWorlds />

      <DigitalGap />

      <ExperienceReimagined />

      <IntelligencePersonalized />

      <ControlAtScale />

      <Evolution />

      <EngineeringDNA />

      <DesignPhilosophy />

      <Numbers />

      <FutureVision />

      <FinalCTA />
    </section>
  );
}
