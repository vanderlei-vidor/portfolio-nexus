"use client";

import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const sectionColors = [
  "rgb(0, 0, 0)",
  "rgb(5, 5, 5)",
  "rgb(10, 10, 10)",
  "rgb(5, 5, 15)",
  "rgb(0, 0, 0)",
  "rgb(0, 0, 0)",
];

export default function ProcessExperience() {
  const lenis = useLenis();
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = sectionColors.length;

  useEffect(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  useLayoutEffect(() => {
    const mainContainer = mainContainerRef.current;
    const stickyStage = stickyStageRef.current;
    const horizontalWrapper = horizontalWrapperRef.current;
    const progressBar = progressBarRef.current;

    if (!mainContainer || !stickyStage || !horizontalWrapper || !progressBar) return;

    const ctx = gsap.context(() => {
      const sections = sectionsRef.current.filter(Boolean);
      const getScrollDistance = () => horizontalWrapper.scrollWidth - window.innerWidth;

      gsap.set(horizontalWrapper, {
        width: `${sections.length * 100}vw`,
        x: 0,
      });

      const horizontalScroll = gsap.to(horizontalWrapper, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          id: "process-horizontal-scroll",
          trigger: mainContainer,
          scrub: 1,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          snap: 1 / (sections.length - 1),
          onUpdate: (self) => {
            setCurrentSection(Math.round(self.progress * (sections.length - 1)));
          },
        },
      });

      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: mainContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      const colorTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      sectionColors.slice(1).forEach((color) => {
        colorTimeline.to(stickyStage, {
          backgroundColor: color,
          duration: 1,
          ease: "none",
        });
      });
    }, mainContainer);

    return () => ctx.revert();
  }, [lenis]);

  return (
    <>
      {/* Technical Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-white/5 z-50">
        <div ref={progressBarRef} className="w-full h-full bg-white origin-left scale-x-0 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </div>

      <div className="fixed top-8 right-8 z-50 font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">
        <span className="text-white">Phase_{String(currentSection + 1).padStart(2, '0')}</span>
        <span className="mx-2">::</span>
        <span>Total_{String(totalSections).padStart(2, '0')}</span>
      </div>

      <main
        ref={mainContainerRef}
        className="relative w-full bg-black"
        style={{ height: `${sectionColors.length * 100}vh` }}
      >
        <div ref={stickyStageRef} className="sticky top-0 h-screen w-full overflow-hidden bg-black border-y border-white/5">
          
          {/* Engineering Grid */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />

          <div ref={horizontalWrapperRef} className="flex h-screen absolute top-0 left-0 will-change-transform">

            {/* Section 0: Hero - Refined Technical Intro */}
            <section
              ref={(el) => { if (el) sectionsRef.current[0] = el; }}
              className="w-screen h-full flex flex-col items-center justify-center text-white px-6 flex-shrink-0 relative"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-8"
              >
                Production_Protocol // v1.0
              </motion.span>

              <h1 className="text-5xl md:text-8xl font-black text-center max-w-5xl leading-[0.9] tracking-tighter uppercase">
                <span className="text-zinc-700">Engineering</span> <br />
                <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">Digital Excellence</span>
              </h1>
              
              <p className="mt-8 font-mono text-[10px] text-zinc-600 max-w-md text-center leading-relaxed">
                A systematic approach to building high-performance applications through rigorous architecture and precise execution.
              </p>
            </section>

            {/* Step 01: Strategy */}
            <ProcessStep
              ref={(el) => { if (el) sectionsRef.current[1] = el; }}
              step="01"
              tag="SYSTEM_DESIGN"
              title="Architecture & Scoping"
              description="Before a single line of code is written, I architect the solution. Requirements engineering, scalability mapping, and technical feasibility studies to ensure a robust foundation."
            />

            {/* Step 02: Design */}
            <ProcessStep
              ref={(el) => { if (el) sectionsRef.current[2] = el; }}
              step="02"
              tag="INTERFACE_ENGINEERING"
              title="Human-Centric UX"
              description="Crafting high-fidelity interfaces where accessibility meets motion. Applying Nielsen's heuristics to ensure the user journey is as logical as the backend."
            />

            {/* Step 03: Engineering */}
            <ProcessStep
              ref={(el) => { if (el) sectionsRef.current[3] = el; }}
              step="03"
              tag="CORE_DEVELOPMENT"
              title="Full-Stack Implementation"
              description="Leveraging Next.js 15 for server-side excellence. Clean code, type-safety with TypeScript, and low-latency rendering driven by mathematical motion engines."
            />

            {/* Step 04: Quality */}
            <ProcessStep
              ref={(el) => { if (el) sectionsRef.current[4] = el; }}
              step="04"
              tag="QA_DEPLOYMENT"
              title="Optimization & Vitals"
              description="Rigorous testing for Core Web Vitals. Optimizing for Lighthouse scores, edge-caching delivery, and ensuring a seamless CI/CD pipeline for 99.9% reliability."
            />

            {/* Final Section: Conversion */}
            <section
              ref={(el) => { if (el) sectionsRef.current[5] = el; }}
              className="w-screen h-full flex flex-col items-center justify-center text-white px-6 flex-shrink-0 relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
              
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-12 text-center">
                Ready to scale <br /> your vision?
              </h2>

              <Link
                href="/contact"
                className="group relative px-12 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <span className="relative z-10 text-sm uppercase tracking-widest">Initialize Partnership</span>
              </Link>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}

interface ProcessStepProps {
  step: string;
  tag: string;
  title: string;
  description: string;
}

const ProcessStep = forwardRef<HTMLElement, ProcessStepProps>(({ step, tag, title, description }, ref) => {
  return (
    <section
      ref={ref}
      className="w-screen h-full flex items-center justify-center flex-shrink-0 px-8 md:px-24 border-l border-white/5 relative group overflow-hidden"
    >
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-[100px_1fr] gap-12 items-start relative z-10">
        
        {/* Technical Sidebar */}
        <div className="hidden md:flex flex-col gap-4">
          <span className="font-mono text-[10px] text-white/20 rotate-90 origin-left translate-x-4 whitespace-nowrap tracking-[0.5em]">
            REF_DATA_{step}
          </span>
          <div className="w-[1px] h-32 bg-gradient-to-b from-white/20 to-transparent ml-2" />
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-[11px] text-zinc-500 mb-4 tracking-[0.3em] uppercase">
            {tag} // 0{step}
          </span>
          
          <h3 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter uppercase leading-none text-white">
            {title}
          </h3>

          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
            {description}
          </p>

          <div className="mt-12 flex items-center gap-6 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <div className="h-[1px] w-24 bg-white/20" />
            <span className="font-mono text-[9px] tracking-widest uppercase">System_Running</span>
          </div>
        </div>
      </div>
    </section>
  );
});

ProcessStep.displayName = "ProcessStep";
