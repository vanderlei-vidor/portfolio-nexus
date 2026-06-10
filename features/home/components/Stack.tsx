// components/Stack.tsx - VERSÃO MULTI-LANE AAA OTIMIZADA

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, 
  SiFramer, SiTypescript, SiNodedotjs,
  SiFlutter, SiApple, SiAndroid, SiDart,
  SiPython, SiOpenai, SiGreensock
} from "react-icons/si";
import type { IconType } from "react-icons";

gsap.registerPlugin(ScrollTrigger);

// Esteira 1: Focada em Interface, Performance Visual e Client-Side
const experienceTechs = [
  { name: "Next.js 15", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Flutter", icon: SiFlutter },
  { name: "Dart", icon: SiDart },
  { name: "GSAP", icon: SiGreensock },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Tailwind CSS", icon: SiTailwindcss },
];

// Esteira 2: Focada em Inteligência, Infraestrutura e Ecossistemas
const coreTechs = [
  { name: "Python / AI Core", icon: SiPython },
  { name: "LLM & Open Source AI", icon: SiOpenai },
  { name: "Node.js Architecture", icon: SiNodedotjs },
  { name: "iOS Ecosystem", icon: SiApple },
  { name: "Android Native", icon: SiAndroid },
  { name: "React Native", icon: SiReact },
];

type StackTech = {
  name: string;
  icon: IconType;
};

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // ✅ OTIMIZAÇÃO 1: Refs para as timelines (permite pausar/retomar)
  const tl1Ref = useRef<gsap.core.Tween | null>(null);
  const tl2Ref = useRef<gsap.core.Tween | null>(null);

  // ✅ OTIMIZAÇÃO 2: IntersectionObserver para detectar visibilidade
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        // ✅ OTIMIZAÇÃO 3: Pausa/retoma as animações baseado na visibilidade
        if (tl1Ref.current && tl2Ref.current) {
          if (isIntersecting) {
            tl1Ref.current.play();
            tl2Ref.current.play();
          } else {
            tl1Ref.current.pause();
            tl2Ref.current.pause();
          }
        }
      },
      { 
        threshold: 0.1, // Ativa quando 10% da seção está visível
        rootMargin: "100px" // Ativa um pouco antes de entrar na viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!marquee1Ref.current || !marquee2Ref.current || !isVisible) return;

    const ctx = gsap.context(() => {
      // ✅ OTIMIZAÇÃO 4: Delay inicial para não competir com LCP
      const startDelay = 0.5;

      // Linha 1 vai para a ESQUERDA
      tl1Ref.current = gsap.to(marquee1Ref.current, {
        xPercent: -50,
        duration: 55,
        ease: "none",
        repeat: -1,
        delay: startDelay,
      });

      // Linha 2 vai para a DIREITA
      gsap.set(marquee2Ref.current, { xPercent: -50 });
      tl2Ref.current = gsap.to(marquee2Ref.current, {
        xPercent: 0,
        duration: 60,
        ease: "none",
        repeat: -1,
        delay: startDelay,
      });

      // ✅ OTIMIZAÇÃO 5: Pausa inicial até a seção ficar visível
      if (!isVisible) {
        tl1Ref.current.pause();
        tl2Ref.current.pause();
      }

      // ✅ OTIMIZAÇÃO 6: ScrollTrigger otimizado (só ativa quando visível)
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onUpdate: (self) => {
          if (!tl1Ref.current || !tl2Ref.current) return;
          
          const velocity = Math.abs(self.getVelocity());
          const timeScale = gsap.utils.mapRange(0, 1000, 1, 3.5, velocity);
          
          gsap.to([tl1Ref.current, tl2Ref.current], { 
            timeScale: timeScale, 
            duration: 0.5, 
            overwrite: true 
          });
        },
        onLeave: () => {
          if (tl1Ref.current && tl2Ref.current) {
            gsap.to([tl1Ref.current, tl2Ref.current], { 
              timeScale: 1, 
              duration: 1 
            });
          }
        },
        onEnterBack: () => {
          if (tl1Ref.current && tl2Ref.current) {
            gsap.to([tl1Ref.current, tl2Ref.current], { 
              timeScale: 1, 
              duration: 1 
            });
          }
        },
      });

      // ✅ OTIMIZAÇÃO 7: Cleanup completo
      return () => {
        scrollTrigger.kill();
        if (tl1Ref.current) tl1Ref.current.kill();
        if (tl2Ref.current) tl2Ref.current.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]); // ✅ Re-executa quando a visibilidade muda

  return (
    <section 
      ref={sectionRef}
      className="py-32 overflow-hidden border-y border-white/5 bg-black/10 relative"
      aria-label="Technology stack"
    >
      <div className="mb-20 text-center">
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.6em] block mb-4">
          Capabilities & Stack
        </span>
        <div className="h-px w-8 bg-zinc-800 mx-auto" />
      </div>

      <div className="relative flex flex-col gap-8 md:gap-12">
        {/* Máscaras cinematográficas nas bordas */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-linear-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-linear-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" aria-hidden="true" />

        {/* ESTEIRA 01: EXPERIENCE LAYER */}
        <div className="overflow-hidden w-full">
          <div 
            ref={marquee1Ref} 
            className="flex whitespace-nowrap will-change-transform"
            aria-label="Frontend and UI technologies"
          >
            {[...experienceTechs, ...experienceTechs, ...experienceTechs].map((tech, i) => (
              <MarqueeItem key={`exp-${i}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* ESTEIRA 02: INTELLIGENCE LAYER */}
        <div className="overflow-hidden w-full">
          <div 
            ref={marquee2Ref} 
            className="flex whitespace-nowrap will-change-transform"
            aria-label="Backend and infrastructure technologies"
          >
            {[...coreTechs, ...coreTechs, ...coreTechs].map((tech, i) => (
              <MarqueeItem key={`core-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Subcomponente item isolado para manter o código limpo
const MarqueeItem = ({ tech }: { tech: StackTech }) => {
  const Icon = tech.icon;
  return (
    <div className="flex items-center gap-5 px-12 md:px-16 group cursor-default">
      {Icon && (
        <Icon 
          className="w-6 h-6 text-zinc-700 group-hover:text-blue-500 transition-all duration-500 transform group-hover:scale-110"
          aria-hidden="true"
        />
      )}
      <span className="text-xl md:text-3xl font-light tracking-tighter text-zinc-600 group-hover:text-white transition-all duration-700 uppercase">
        {tech.name}
      </span>
      <span className="ml-10 w-1 h-1 rounded-full bg-zinc-900 group-hover:bg-blue-500 transition-colors duration-500" aria-hidden="true" />
    </div>
  );
};