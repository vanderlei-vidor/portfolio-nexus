// components/Stack.tsx - VERSÃO MULTI-LANE AAA
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, 
  SiFramer, SiTypescript, SiNodedotjs,
  SiFlutter, SiApple, SiAndroid, SiDart,
  SiPython, SiOpenai, SiGreensock
} from "react-icons/si";

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

export default function Stack() {
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marquee1Ref.current || !marquee2Ref.current) return;

    const ctx = gsap.context(() => {
      // Linha 1 vai para a ESQUERDA
      const tl1 = gsap.to(marquee1Ref.current, {
        xPercent: -50,
        duration: 55,
        ease: "none",
        repeat: -1,
      });

      // Linha 2 vai para a DIREITA (inverte o xPercent de 0 para -50 no container para criar o loop reverso)
      gsap.set(marquee2Ref.current, { xPercent: -50 });
      const tl2 = gsap.to(marquee2Ref.current, {
        xPercent: 0,
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      // Sincroniza a aceleração de ambas com o scroll do usuário
      ScrollTrigger.create({
        trigger: marquee1Ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const timeScale = gsap.utils.mapRange(0, 1000, 1, 3.5, velocity);
          
          gsap.to([tl1, tl2], { timeScale: timeScale, duration: 0.5, overwrite: true });
        },
        onLeave: () => gsap.to([tl1, tl2], { timeScale: 1, duration: 1 }),
        onEnterBack: () => gsap.to([tl1, tl2], { timeScale: 1, duration: 1 }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 overflow-hidden border-y border-white/5 bg-black/10 relative">
      <div className="mb-20 text-center">
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.6em] block mb-4">
          Capabilities & Stack
        </span>
        <div className="h-[1px] w-8 bg-zinc-800 mx-auto" />
      </div>

      <div className="relative flex flex-col gap-8 md:gap-12">
        {/* Máscaras cinematográficas nas bordas */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />

        {/* ESTEIRA 01: EXPERIENCE LAYER */}
        <div className="overflow-hidden w-full">
          <div ref={marquee1Ref} className="flex whitespace-nowrap will-change-transform">
            {[...experienceTechs, ...experienceTechs, ...experienceTechs].map((tech, i) => (
              <MarqueeItem key={`exp-${i}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* ESTEIRA 02: INTELLIGENCE LAYER */}
        <div className="overflow-hidden w-full">
          <div ref={marquee2Ref} className="flex whitespace-nowrap will-change-transform">
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
const MarqueeItem = ({ tech }: { tech: any }) => {
  const Icon = tech.icon;
  return (
    <div className="flex items-center gap-5 px-12 md:px-16 group cursor-default">
      {Icon && (
        <Icon className="w-6 h-6 text-zinc-700 group-hover:text-blue-500 transition-all duration-500 transform group-hover:scale-110" />
      )}
      <span className="text-xl md:text-3xl font-light tracking-tighter text-zinc-600 group-hover:text-white transition-all duration-700 uppercase">
        {tech.name}
      </span>
      <span className="ml-10 w-1 h-1 rounded-full bg-zinc-900 group-hover:bg-blue-500 transition-colors duration-500" />
    </div>
  );
};