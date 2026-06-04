"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './ArchitectureShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const architectureItems = [
  "Playback Engine",
  "Audio Session",
  "Queue Controller",
  "Artwork Pipeline",
  "Cache Layer",
  "UI Rendering"
];

export default function ArchitectureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Animação dos Nodes (Entrada lateral sutil e fluida com Stagger)
      gsap.fromTo(
        ".architecture-node",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // 2. Animação da "Energia" controlada 100% pelo GSAP (Sem conflito de CSS)
      gsap.fromTo(
        ".energy-flow",
        { top: "-20%" },
        {
          top: "120%",
          duration: 3.5,
          repeat: -1,
          ease: "none",
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-6 py-32">

      {/* ATMOSPHERIC GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} />

      {/* AMBIENT LIGHT */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[220px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-32 flex flex-col items-center text-center">
          <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              System Architecture
            </span>
          </div>

          <h2 className="max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.08em] text-white md:text-8xl lg:text-[9rem]">
            Engineered<br />for scale.
          </h2>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
            A modular audio architecture designed for stability, rendering
            performance and scalable playback orchestration across platforms.
          </p>
        </div>

        {/* ESTRUTURA DE FLUXO CENTRAL */}
        <div className="relative mx-auto max-w-5xl">

          {/* LINHA CENTRAL ESTRUTURAL */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 lg:left-1/2 lg:block lg:-translate-x-1/2">
            {/* ENERGY FLOW - Movimentado via GSAP suavemente */}
            <div className="energy-flow absolute h-48 w-[2px] -translate-x-[1px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee]" />
          </div>

          {/* LISTAGEM DOS NODES SINCRONIZADOS */}
          <div className="flex flex-col gap-8">
            {architectureItems.map((item, index) => {
              // Lógica para alternar os lados no desktop (Esquerda / Direita)
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item}
                  className={`architecture-node group relative w-full lg:w-[calc(50%-30px)] ${isEven ? "lg:self-start text-left" : "lg:self-end text-left"
                    }`}
                >
                  <article className="relative overflow-hidden rounded-[2rem] border border-white/[0.04] bg-zinc-950/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:bg-black/80">
                    {/* NODE GLOW NO HOVER */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.15),transparent_60%)]" />

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        {/* INDEX BOX */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 transition-colors group-hover:border-cyan-400/60">
                          <span className="font-mono text-sm text-cyan-300">0{index + 1}</span>
                        </div>

                        {/* TEXT CONTENT */}
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl transition-colors group-hover:text-cyan-200">
                            {item}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-500 max-w-sm">
                            Optimized orchestration layer for premium audio rendering.
                          </p>
                        </div>
                      </div>

                      {/* STATUS INDICATOR */}
                      <div className="hidden items-center gap-3 md:flex">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">Active</span>
                      </div>
                    </div>
                  </article>

                  {/* DOT DE CONEXÃO PRESO NA PONTA DO CARD ENCONTRANDO A LINHA CENTRAL */}
                  <div className={`absolute top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-cyan-400 bg-black lg:block ${isEven ? "-right-[34px]" : "-left-[34px]"
                    }`}>
                    <div className="h-full w-full rounded-full bg-cyan-400 opacity-70 animate-ping" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}