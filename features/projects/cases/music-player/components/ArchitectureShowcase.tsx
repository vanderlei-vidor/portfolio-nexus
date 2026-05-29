"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectureShowcase() {
  // 1. Criamos os Refs para controlar a seção e os elementos
  const sectionRef = useRef(null);
  const flowRef = useRef(null);

  const architectureItems = [
    "Playback Engine",
    "Audio Session",
    "Queue Controller",
    "Artwork Pipeline",
    "Cache Layer",
    "UI Rendering"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação dos Nodes (Entrada lateral)
      gsap.fromTo(
        ".architecture-node",
        { opacity: 0, x: -30, filter: "blur(10px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          stagger: 0.2,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      // Animação da "Energia" correndo pela linha central
      gsap.fromTo(
        ".energy-flow",
        { top: "-10%" },
        {
          top: "110%",
          duration: 3,
          repeat: -1,
          ease: "none",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-6 py-32">
      
      {/* ATMOSPHERIC GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/textures/noise.jpg')]" />

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
          
          {/* LINHA CENTRAL (Só aparece no Desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 lg:block">
            {/* ENERGY FLOW (O pulso que corre a linha) */}
            <div className="energy-flow absolute h-40 w-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />
          </div>

          {/* NODES */}
          <div className="flex flex-col gap-10">
            {architectureItems.map((item, index) => (
              <div
                key={item}
                className="architecture-node group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-colors hover:bg-white/[0.05]"
              >
                {/* NODE GLOW NO HOVER */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.1),transparent_60%)]" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* INDEX BOX */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                      <span className="font-mono text-sm text-cyan-300">0{index + 1}</span>
                    </div>

                    {/* TEXT CONTENT */}
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                        {item}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        Optimized orchestration layer for premium audio rendering.
                      </p>
                    </div>
                  </div>

                  {/* STATUS INDICATOR */}
                  <div className="hidden items-center gap-3 lg:flex">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">Active</span>
                  </div>
                </div>

                {/* DOT ON THE LINE (O ponto que conecta com a linha central) */}
                <div className="absolute left-1/2 top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50 bg-black lg:block">
                   <div className="h-full w-full rounded-full bg-cyan-400 opacity-20 animate-ping" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}