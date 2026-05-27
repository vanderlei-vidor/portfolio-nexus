"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Definição das 3 Seções Narrativas
const projectSteps = [
  {
    id: "step-0",
    tag: "Phase 01: Experience",
    title: "Mobile Fidelity",
    desc: "Interface tátil com foco em micro-interações. Otimizado para performance em redes 4G/5G com carregamento progressivo.",
    img: "/textures/mobile-render.jpg",
    color: "#10b981", // Emerald
    accent: "bg-emerald-500/10"
  },
  {
    id: "step-1",
    tag: "Phase 02: Analysis",
    title: "Data Dashboard",
    desc: "Visualização complexa de dados transformada em simplicidade. Gráficos dinâmicos que se adaptam ao scroll do usuário.",
    img: "/textures/laptop-render.jpg",
    color: "#0ea5e9", // Cyan
    accent: "bg-cyan-500/10"
  },
  {
    id: "step-2",
    tag: "Phase 03: Ecosystem",
    title: "Cross-Platform",
    desc: "Sincronização em tempo real entre dispositivos. Uma arquitetura única servindo múltiplos front-ends com zero latência.",
    img: "/textures/monitor-render.jpg",
    color: "#8b5cf6", // Violet
    accent: "bg-violet-500/10"
  }
];

export default function ProjectCinematicLayout() {
  const mainRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline que trava a tela (PIN)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=300%", // Espaço para as 3 transições
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Lógica para trocar o estado baseado no progresso (0 a 1)
            const progress = self.progress;
            if (progress < 0.33) setActive(0);
            else if (progress < 0.66) setActive(1);
            else setActive(2);
          }
        }
      });

      // Animação de Entrada e Brilho para cada imagem
      projectSteps.forEach((_, i) => {
        gsap.fromTo(`.device-img-${i}`, 
          { y: 100, opacity: 0, scale: 0.9, rotateX: 10 },
          { 
            y: 0, opacity: 1, scale: 1, rotateX: 0,
            scrollTrigger: {
              trigger: mainRef.current,
              start: `${i * 33}% top`,
              end: `${(i + 1) * 33}% top`,
              scrub: true
            }
          }
        );

        // O "Shine" (Brilho que passa pela tela)
        gsap.fromTo(`.shine-${i}`,
          { x: "-150%" },
          { 
            x: "150%", 
            scrollTrigger: {
              trigger: mainRef.current,
              start: `${i * 33}% top`,
              end: `${(i + 1) * 33}% top`,
              scrub: 2
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#050505]">
      {/* SEÇÃO 01: O SHOWCASE (PINNED) */}
      <section ref={mainRef} className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Grid Técnico de Fundo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 w-full gap-12 items-center relative z-10">
          
          {/* ESQUERDA: Textos Animados */}
          <div className="lg:col-span-5 relative h-[300px]">
            {projectSteps.map((step, i) => (
              <div key={step.id} className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                <span className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: step.color }}>
                  {step.tag}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                  {step.title}
                </h2>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* DIREITA: Imagens com Efeito de Brilho */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {projectSteps.map((step, i) => (
              <div key={step.id} className={`device-img-${i} absolute w-full max-w-2xl transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
                  {/* Substitua pelo seu <Image /> do Next.js */}
                  <img src={step.img} alt={step.title} className="w-full h-auto" />
                  
                  {/* Camada de Brilho (O toque AAA) */}
                  <div className={`shine-${i} absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none`} />
                </div>
                {/* Brilho Neon de Fundo */}
                <div className="absolute -z-10 inset-0 blur-[120px] opacity-20 transition-colors duration-1000" style={{ backgroundColor: step.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 02: DETALHES TÉCNICOS (Uma seção nova após o showcase) */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-bold mb-4">Arquitetura</h4>
              <p className="text-zinc-500 text-sm">Baseada em componentes modulares para fácil manutenção e escalabilidade.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Segurança</h4>
              <p className="text-zinc-500 text-sm">Criptografia end-to-end e protocolos de autenticação de última geração.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Velocidade</h4>
              <p className="text-zinc-500 text-sm">Tempo de resposta médio inferior a 100ms em operações globais.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}