"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { offlinePlayerSteps } from "../data"; // Certifica-te que o caminho está correto

gsap.registerPlugin(ScrollTrigger);

export default function StorytellingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 1. OTIMIZAÇÃO DE PERFORMANCE: quickTo para evitar re-renders do React no mousemove
    const xTo = gsap.quickTo(".parallax-bg", "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(".parallax-bg", "y", { duration: 0.8, ease: "power3.out" });

    const rotateXTo = gsap.quickTo(".device-container", "rotateX", { duration: 1, ease: "power2.out" });
    const rotateYTo = gsap.quickTo(".device-container", "rotateY", { duration: 1, ease: "power2.out" });

    const ctx = gsap.context(() => {
      // 2. CONFIGURAÇÃO DO SCROLL: Pin único, sem altura extra na section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${(offlinePlayerSteps.length - 1) * 45}%`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentStep = Math.floor(progress * offlinePlayerSteps.length);
          const clampedStep = Math.min(currentStep, offlinePlayerSteps.length - 1);

          setActive((current) => current === clampedStep ? current : clampedStep);
        }
      });
    }, sectionRef);

    // 3. EVENTO DE MOUSE (Utilizando as funções quickTo acima)
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      xTo(xPos * 0.5);
      yTo(yPos * 0.5);
      rotateXTo(-yPos * 0.6);
      rotateYTo(xPos * 0.6);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#030303] overflow-hidden">

      {/* PINNED EXPERIENCE */}
      <div className="flex min-h-screen items-center overflow-hidden">

        {/* FILM GRAIN */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-soft-light bg-[url('/textures/noise.jpg')] z-50" />

        {/* PARALLAX BACKGROUND LAYERS */}
        <div className="parallax-bg absolute inset-0">
          <div className="absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.04] blur-[180px]" />
          <div className="absolute right-[5%] top-[40%] h-[400px] w-[400px] rounded-full bg-violet-500/[0.04] blur-[160px]" />
          <div className="absolute bottom-[-10%] left-[30%] h-[600px] w-[600px] rounded-full bg-cyan-500/[0.05] blur-[200px]" />
        </div>

        {/* BACKGROUND GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />

        {/* DINAMIC AMBIENT GLOW (Muda conforme o step) */}
        <div
          className="absolute inset-0 transition-colors duration-1000 ease-in-out"
          style={{
            background: `radial-gradient(circle at center, ${offlinePlayerSteps[active].color}10 0%, transparent 70%)`
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12">

          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="relative h-[450px] flex flex-col justify-center lg:col-span-5">
            {offlinePlayerSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = active === index;

              return (
                <div
                  key={step.id}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${isActive ? "translate-y-0 opacity-100 blur-0" : "translate-y-12 opacity-0 blur-md pointer-events-none"
                    }`}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className="rounded-2xl border bg-zinc-900/50 p-3 backdrop-blur-md"
                      style={{ borderColor: `${step.color}40` }}
                    >
                      <Icon size={20} style={{ color: step.color }} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                        Chapter {step.chapter}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: step.color }}>
                        {step.tag}
                      </span>
                    </div>
                  </div>

                  <h2 className="max-w-xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
                    {step.title}
                  </h2>

                  <p className="mt-8 max-w-md text-sm leading-relaxed text-zinc-500 md:text-base">
                    {step.desc}
                  </p>
                </div>
              );
            })}

            {/* PROGRESS TIMELINE (Vertical dots) */}
            <div className="absolute -left-12 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
              {offlinePlayerSteps.map((_, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-500 ${active === index ? "h-12 w-[3px] bg-white" : "h-3 w-[3px] bg-zinc-800"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: DEVICE PREVIEW */}
          <div className="relative flex items-center justify-center lg:col-span-7">
            {offlinePlayerSteps.map((step, index) => (
              <div
                key={step.id}
                className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${active === index ? "scale-100 opacity-100 rotate-[-4deg]" : "scale-90 opacity-0 rotate-[-12deg] blur-xl"
                  }`}
              >
                {/* GLOW ATRÁS DO TELEFONE */}
                <div
                  className="absolute inset-0 -z-10 rounded-full blur-[120px] opacity-20 animate-pulse"
                  style={{ backgroundColor: step.color }}
                />

                {/* DEVICE CONTAINER (Com Parallax de Rotação) */}
                <div className="device-container relative w-[280px] md:w-[320px] transform-gpu">
                  <div className="overflow-hidden rounded-[3.2rem] border border-white/10 bg-zinc-950 p-[3px] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="block w-full rounded-[3rem] transition-transform duration-700"
                    />

                    {/* GLASS REFLECTION */}
                    <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

