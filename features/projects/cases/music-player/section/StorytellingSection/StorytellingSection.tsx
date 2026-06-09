"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { offlinePlayerSteps } from "../../data";

gsap.registerPlugin(ScrollTrigger);

export default function StorytellingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const isDesktop = window.matchMedia("(hover: hover)").matches;

    const xTo = gsap.quickTo(".parallax-bg", "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(".parallax-bg", "y", { duration: 0.8, ease: "power3.out" });

    const rotateXTo = gsap.quickTo(".device-container", "rotateX", { duration: 1, ease: "power2.out" });
    const rotateYTo = gsap.quickTo(".device-container", "rotateY", { duration: 1, ease: "power2.out" });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${(offlinePlayerSteps.length - 1) * 60}%`,
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

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;

      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      xTo(xPos * 0.5);
      yTo(yPos * 0.5);
      rotateXTo(-yPos * 0.6);
      rotateYTo(xPos * 0.6);
    };

    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (isDesktop) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#030303] overflow-hidden flex items-center py-12 lg:py-0">

      {/* FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-soft-light z-50" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} />

      {/* PARALLAX BACKGROUND LAYERS */}
      <div className="parallax-bg absolute inset-0 will-change-transform">
        <div className="absolute left-[10%] top-[15%] h-125 w-125 rounded-full bg-blue-500/4 blur-[180px]" />
        <div className="absolute right-[5%] top-[40%] h-100 w-100 rounded-full bg-violet-500/4 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-150 w-150 rounded-full bg-cyan-500/5 blur-[200px]" />
      </div>

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-size-[60px_60px] opacity-30" />

      {/* DINAMIC AMBIENT GLOW */}
      <div
        className="absolute inset-0 transition-colors duration-1000 ease-in-out pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${offlinePlayerSteps[active].color}10 0%, transparent 70%)`
        }}
      />

      {/* ⚡ AJUSTE DE GRID: De gap-6 para gap-12 no desktop e centralização vertical total */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12">

        {/* LEFT SIDE: TEXT CONTENT */}
        <div className="story-text-wrapper relative h-72 sm:h-80 lg:h-112.5 lg:col-span-5 flex items-center">
          {offlinePlayerSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = active === index;

            return (
              <div
                key={step.id}
                className={`story-text-item absolute w-full flex flex-col justify-center transition-all duration-700 ease-out will-change-[transform,opacity] ${isActive
                  ? "translate-y-0 opacity-100 pointer-events-auto z-10"
                  : "translate-y-8 opacity-0 pointer-events-none z-0"
                  }`}
              >
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="rounded-xl border bg-zinc-900/50 p-2.5 backdrop-blur-md"
                    style={{ borderColor: `${step.color}40` }}
                  >
                    <Icon size={18} style={{ color: step.color }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                      Chapter {step.chapter}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: step.color }}>
                      {step.tag}
                    </span>
                  </div>
                </div>

                <h2 className="max-w-xl text-3xl font-bold leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-7xl">
                  {step.title}
                </h2>

                <p className="mt-4 max-w-md text-xs leading-relaxed text-zinc-400 sm:text-sm md:text-base">
                  {step.desc}
                </p>
              </div>
            );
          })}

          {/* PROGRESS TIMELINE */}
          <div className="absolute -left-12 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
            {offlinePlayerSteps.map((_, index) => (
              <div
                key={index}
                className={`rounded-full transition-all duration-500 ${active === index ? "h-12 w-0.75 bg-white" : "h-3 w-0.75 bg-zinc-800"
                  }`}
              />
            ))}
          </div>
        </div>

       {/* // RIGHT SIDE: DEVICE PREVIEW*/}
        {/* // ⚡ AJUSTE PREMIUM DE TAMANHO: w-full e controle absoluto de altura para evitar cortes*/}
        <div className="story-device-wrapper relative flex items-center justify-center lg:col-span-7 w-full h-[35vh] sm:h-[45vh] lg:h-auto">
          {offlinePlayerSteps.map((step, index) => {
            const isActive = active === index;

            return (
              <div
                key={step.id}
                className={`device-card absolute flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[transform,opacity] ${isActive
                  ? "scale-100 opacity-100 -rotate-3 pointer-events-auto z-10"
                  : "scale-90 opacity-0 rotate-[-8deg] pointer-events-none z-0"
                  }`}
              >
                {/* GLOW ATRÁS DO TELEFONE */}
                <div
                  className="absolute h-48 w-48 sm:h-80 sm:w-80 -z-10 rounded-full blur-[70px] opacity-20"
                  style={{ backgroundColor: step.color }}
                />

                {/* DEVICE CONTAINER */}
                {/* ⚡ CALIBRAÇÃO ATUALIZADA: Diminuímos a base de w-44 para w-36 */}
                <div className="device-container relative w-36 sm:w-52 md:w-60 lg:w-72 transform-gpu">
                  <div className="overflow-hidden rounded-[1.8rem] sm:rounded-[2.8rem] lg:rounded-[3.2rem] border border-white/10 bg-zinc-950 p-0.5 sm:p-0.75 shadow-[0_15px_40px_rgba(0,0,0,0.8)] lg:shadow-[0_30px_80px_rgba(0,0,0,0.9)]">

                    <Image
                      src={step.img}
                      alt={step.title}
                      width={320}
                      height={690}
                      priority={index === 0}
                      // ⚡ AJUSTE DE SIZES: Atualizado de 176px para 144px
                      sizes="(max-width: 640px) 144px, (max-width: 1024px) 240px, 288px"
                      className="block w-full h-auto rounded-[1.6rem] sm:rounded-[2.6rem] lg:rounded-[3rem]"
                    />

                    {/* GLASS REFLECTION */}
                    <div className="absolute inset-0 rounded-[1.6rem] sm:rounded-[2.6rem] lg:rounded-[3rem] bg-linear-to-tr from-white/0 via-white/2 to-white/0 pointer-events-none" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}