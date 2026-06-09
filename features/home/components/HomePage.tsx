import dynamic from 'next/dynamic';
import Hero from "./Hero";
import DeferredHomeEffects from "./DeferredHomeEffects";
import DeferredSection from "./DeferredSection";
import Projects from "@/features/projects/components/Projects";
import TerminalWrapper from "./TerminalWrapper"; // 🚀 Importa o novo wrapper aqui

// Seções que podem ser pré-renderizadas no servidor (HTML estático inicial)
const About = dynamic(() => import("./About"), { ssr: true });
const Stack = dynamic(() => import("./Stack"), { ssr: true });
const Contact = dynamic(() => import("./Contact"), { ssr: true });

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030712]">
      {/* Dobra Crítica - Renderização instantânea */}
      <Hero />
      <Projects />

      {/* Seções secundárias */}
      <DeferredSection minHeight="900px">
        <About />
      </DeferredSection>
      <DeferredSection minHeight="520px">
        <Stack />
      </DeferredSection>
      
      {/* 🛠️ O TerminalWrapper resolve o erro de SSR mantendo a performance */}
      <DeferredSection minHeight="720px">
        <TerminalWrapper />
      </DeferredSection>
      
      <DeferredSection minHeight="760px">
        <Contact />
      </DeferredSection>

      <DeferredHomeEffects />
    </main>
  );
}