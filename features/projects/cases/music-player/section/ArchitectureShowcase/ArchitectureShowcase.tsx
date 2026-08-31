"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { musicPlayerContent } from "../../content";
import "./ArchitectureShowcase.css";

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLanguage();
  const content = musicPlayerContent[locale].architecture;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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
          },
        }
      );

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
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-6 py-28 sm:py-36 lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} aria-hidden="true" />
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

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 lg:left-1/2 lg:block lg:-translate-x-1/2" aria-hidden="true">
            <div className="energy-flow absolute h-48 w-[2px] -translate-x-[1px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee]" />
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            {content.items.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item}
                  className={`architecture-node group relative w-full lg:w-[calc(50%-30px)] ${isEven ? "text-left lg:self-start" : "text-left lg:self-end"}`}
                >
                  <article className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.04] bg-zinc-950/80 p-5 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:bg-black/80 sm:rounded-[2rem] sm:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 transition-colors group-hover:border-cyan-400/60 sm:h-14 sm:w-14">
                          <span className="font-mono text-sm text-cyan-300">0{index + 1}</span>
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-200 md:text-2xl">
                            {item}
                          </h3>
                          <p className="mt-1 max-w-sm text-sm leading-relaxed text-zinc-400">
                            {content.nodeDescription}
                          </p>
                        </div>
                      </div>

                      <div className="hidden items-center gap-3 md:flex">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" aria-hidden="true" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">{content.active}</span>
                      </div>
                    </div>
                  </article>

                  <div className={`absolute top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-cyan-400 bg-black lg:block ${isEven ? "-right-[34px]" : "-left-[34px]"}`} aria-hidden="true">
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
