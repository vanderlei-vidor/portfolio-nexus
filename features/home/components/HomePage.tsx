"use client";

import dynamic from 'next/dynamic';
import Hero from "./Hero";
import DeferredSection from "./DeferredSection";
import Projects from "@/features/projects/components/Projects";
import TerminalWrapper from "./TerminalWrapper";

// Seções abaixo da dobra carregadas sob demanda quando o usuário rolar a página
const About = dynamic(() => import("./About"), { ssr: false });
const Stack = dynamic(() => import("./Stack"), { ssr: false });
const Contact = dynamic(() => import("./Contact"), { ssr: false });

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030712]">
      {/* Dobra Crítica - Renderização instantânea */}
      <Hero />
      <Projects />

      {/* Seções secundárias carregadas de forma deferida */}
      <DeferredSection minHeight="900px">
        <About />
      </DeferredSection>
      <DeferredSection minHeight="520px">
        <Stack />
      </DeferredSection>
      
      {/* Terminal carregado dinamicamente via wrapper */}
      <DeferredSection minHeight="720px">
        <TerminalWrapper />
      </DeferredSection>
      
      <DeferredSection minHeight="760px">
        <Contact />
      </DeferredSection>
    </main>
  );
}