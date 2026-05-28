"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: "< 1.8s",
    label: "Cold Start",
    desc: "Ultra-fast startup optimized for mid-range devices."
  },
  {
    value: "120 FPS",
    label: "Fluid Rendering",
    desc: "Stable cinematic motion with minimal frame drops."
  },
  {
    value: "99.5%",
    label: "Crash-Free Sessions",
    desc: "Production-grade reliability and runtime stability."
  },
  {
    value: "JANK <1%",
    label: "Rendering Stability",
    desc: "Carefully optimized rebuild and animation pipeline."
  }
];

export default function PerformanceSection() {
  // 1. Declarar o Ref dentro do componente
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".performance-card",
        {
          opacity: 0,
          y: 120,
          scale: 0.9,
          filter: "blur(20px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            // 2. O ScrollTrigger agora sabe onde olhar
            trigger: sectionRef.current,
            start: "top 75%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // 3. Atribuir o ref à tag principal
    <section ref={sectionRef} className="relative overflow-hidden bg-[#020202] px-6 py-40">

      {/* ATMOSPHERE */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      {/* FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/textures/noise.jpg')]" />

      {/* SCANLINES */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.03)_51%)] bg-[size:100%_4px]" />

      {/* AMBIENT GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[220px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-32 flex flex-col items-center text-center">
          <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              Performance Engineering
            </span>
          </div>

          <h2 className="max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.08em] text-white md:text-8xl lg:text-[9rem]">
            Built for
            <br />
            speed.
          </h2>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
            Every rendering pipeline, animation layer and playback interaction
            was engineered for high refresh-rate fluidity and production-grade
            performance stability.
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              // 4. Adicionar a classe "performance-card" para o GSAP encontrar
              className="
                performance-card
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                bg-white/[0.03]
                p-10
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-cyan-400/30
              "
            >
              {/* HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_60%)]" />

              {/* VALUE */}
              <div className="relative z-10">
                <span className="block text-5xl font-bold tracking-[-0.08em] text-white md:text-7xl animate-pulse">
                  {metric.value}
                </span>

                <h3 className="mt-6 text-lg font-medium text-white">
                  {metric.label}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
                  {metric.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}