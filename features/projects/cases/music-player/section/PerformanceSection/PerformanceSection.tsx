"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { musicPlayerContent } from "../../content";

gsap.registerPlugin(ScrollTrigger);

export default function PerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLanguage();
  const content = musicPlayerContent[locale].performance;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".performance-card",
        {
          opacity: 0,
          y: 120,
          scale: 0.9,
          filter: "blur(20px)",
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
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#020202] px-6 py-28 sm:py-36 lg:py-40">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.03)_51%)] bg-[size:100%_4px] opacity-[0.04]" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[220px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col items-center text-center sm:mb-28 lg:mb-32">
          <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              {content.badge}
            </span>
          </div>

          <h2 className="max-w-5xl text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white">
            {content.titleLine1}
            <br />
            {content.titleLine2}
          </h2>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {content.metrics.map((metric) => (
            <article
              key={metric.label}
              className="performance-card group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 sm:rounded-[2rem] sm:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

              <div className="relative z-10">
                <span className="block text-[clamp(2.75rem,8vw,4.5rem)] font-bold tracking-[-0.06em] text-white">
                  {metric.value}
                </span>

                <h3 className="mt-6 text-lg font-medium text-white">
                  {metric.label}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
                  {metric.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
