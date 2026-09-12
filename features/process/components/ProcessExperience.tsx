"use client";

import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { useTranslation } from "@/shared/i18n/useTranslation";

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
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
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

    if (!lenis) return;
    const convertScroll = () => ScrollTrigger.update();
    lenis.on("scroll", convertScroll);

    return () => {
      lenis.off("scroll", convertScroll);
    };
  }, [lenis]);

  useLayoutEffect(() => {
    const mainContainer = mainContainerRef.current;
    const stickyStage = stickyStageRef.current;
    const horizontalWrapper = horizontalWrapperRef.current;
    const progressBar = progressBarRef.current;

    if (!mainContainer || !stickyStage || !horizontalWrapper || !progressBar) return;

    const ctx = gsap.context(() => {
      const sections = sectionsRef.current.filter(Boolean);
      const getScrollDistance = () => Math.max(horizontalWrapper.scrollWidth - window.innerWidth, 1);

      gsap.set(horizontalWrapper, {
        width: `${sections.length * 100}vw`,
        x: 0,
      });

      const horizontalTween = gsap.to(horizontalWrapper, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          id: "process-horizontal-scroll",
          trigger: mainContainer,
          scrub: shouldReduceMotion ? true : 1.25,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
        },
      });

      const colorTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainer,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
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

      if (!shouldReduceMotion) {
        sections.slice(1).forEach((section) => {
          const content = section.querySelector(".process-step-content");
          const rail = section.querySelector(".process-step-rail");

          if (content) {
            gsap.fromTo(
              content,
              { autoAlpha: 0.55, y: 26, scale: 0.985 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  containerAnimation: horizontalTween,
                  start: "left 72%",
                  end: "left 38%",
                  scrub: 0.45,
                },
              }
            );
          }

          if (rail) {
            gsap.fromTo(
              rail,
              { scaleY: 0.3, autoAlpha: 0.25 },
              {
                scaleY: 1,
                autoAlpha: 1,
                transformOrigin: "top",
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  containerAnimation: horizontalTween,
                  start: "left 75%",
                  end: "left 45%",
                  scrub: 0.5,
                },
              }
            );
          }
        });
      }
    }, mainContainer);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-px w-full bg-white/5">
        <div ref={progressBarRef} className="h-full w-full origin-left scale-x-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </div>

      <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45 shadow-[0_16px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:bottom-8">
        <span className="text-white/80">{t("process.progressPhase")}_{String(currentSection + 1).padStart(2, "0")}</span>
        <span className="mx-2 text-white/25">/</span>
        <span>{String(totalSections).padStart(2, "0")}</span>
      </div>

      <main ref={mainContainerRef} className="relative w-full bg-black">
        <div ref={stickyStageRef} className="relative h-screen w-full overflow-hidden border-y border-white/5 bg-black">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />

          <div ref={horizontalWrapperRef} className="absolute left-0 top-0 flex h-screen will-change-transform">
            <section
              ref={(el) => {
                if (el) sectionsRef.current[0] = el;
              }}
              className="relative flex h-full w-screen shrink-0 flex-col items-center justify-center px-6 text-white"
            >
              <motion.span
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500"
              >
                {t("process.badge")}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-5xl text-center text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-8xl"
              >
                <span className="text-zinc-700">{t("process.titleMuted")}</span> <br />
                <span className="bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">{t("process.titleStrong")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 max-w-md text-center font-mono text-[10px] leading-relaxed text-zinc-600"
              >
                {t("process.intro")}
              </motion.p>
            </section>

            <ProcessStep
              ref={(el) => {
                if (el) sectionsRef.current[1] = el;
              }}
              step="01"
              tag={t("process.steps.strategy.tag")}
              title={t("process.steps.strategy.title")}
              description={t("process.steps.strategy.description")}
              outputLabel={t("process.outputLabel")}
              output={t("process.steps.strategy.output")}
              statusLabel={t("process.systemRunning")}
            />

            <ProcessStep
              ref={(el) => {
                if (el) sectionsRef.current[2] = el;
              }}
              step="02"
              tag={t("process.steps.design.tag")}
              title={t("process.steps.design.title")}
              description={t("process.steps.design.description")}
              outputLabel={t("process.outputLabel")}
              output={t("process.steps.design.output")}
              statusLabel={t("process.systemRunning")}
            />

            <ProcessStep
              ref={(el) => {
                if (el) sectionsRef.current[3] = el;
              }}
              step="03"
              tag={t("process.steps.engineering.tag")}
              title={t("process.steps.engineering.title")}
              description={t("process.steps.engineering.description")}
              outputLabel={t("process.outputLabel")}
              output={t("process.steps.engineering.output")}
              statusLabel={t("process.systemRunning")}
            />

            <ProcessStep
              ref={(el) => {
                if (el) sectionsRef.current[4] = el;
              }}
              step="04"
              tag={t("process.steps.quality.tag")}
              title={t("process.steps.quality.title")}
              description={t("process.steps.quality.description")}
              outputLabel={t("process.outputLabel")}
              output={t("process.steps.quality.output")}
              statusLabel={t("process.systemRunning")}
            />

            <section
              ref={(el) => {
                if (el) sectionsRef.current[5] = el;
              }}
              className="relative flex h-full w-screen shrink-0 flex-col items-center justify-center px-6 text-white"
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />

              <motion.h2
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12 text-center text-4xl font-bold uppercase tracking-tighter md:text-7xl"
              >
                {t("process.finalTitleLine1")} <br /> {t("process.finalTitleLine2")}
              </motion.h2>

              <Link href="/contact" className="premium-button premium-button--primary px-12 py-5 font-bold">
                <span className="relative z-10 text-sm uppercase tracking-widest">{t("process.finalCta")}</span>
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
  outputLabel: string;
  output: string;
  statusLabel: string;
}

const ProcessStep = forwardRef<HTMLElement, ProcessStepProps>(({ step, tag, title, description, outputLabel, output, statusLabel }, ref) => {
  return (
    <section
      ref={ref}
      className="group relative flex h-full w-screen shrink-0 items-center justify-center overflow-hidden border-l border-white/5 px-8 md:px-24"
    >
      <div className="pointer-events-none absolute inset-y-12 right-10 hidden w-px bg-linear-to-b from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 lg:block" />
      <div className="process-step-content relative z-10 grid w-full max-w-5xl grid-cols-1 items-start gap-12 md:grid-cols-[100px_1fr]">
        <div className="hidden flex-col gap-4 md:flex">
          <span className="origin-left translate-x-4 rotate-90 whitespace-nowrap font-mono text-[10px] tracking-[0.5em] text-white/20">
            REF_DATA_{step}
          </span>
          <div className="process-step-rail ml-2 h-32 w-px bg-linear-to-b from-white/20 to-transparent" />
        </div>

        <div className="flex flex-col">
          <span className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
            {tag}
            {" // "}
            0{step}
          </span>

          <h3 className="mb-8 text-4xl font-bold uppercase leading-none tracking-tighter text-white md:text-7xl">
            {title}
          </h3>

          <p className="max-w-2xl text-lg font-light leading-relaxed text-zinc-400 md:text-xl">
            {description}
          </p>

          <div className="premium-card mt-8 max-w-2xl rounded-lg border-l border-white/15 p-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/35">
              {outputLabel}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 md:text-base">
              {output}
            </p>
          </div>

          <div className="mt-12 flex items-center gap-6 opacity-30 transition-opacity duration-700 group-hover:opacity-100">
            <div className="h-2 w-2 rounded-full bg-white motion-safe:animate-pulse" />
            <div className="h-px w-24 bg-white/20" />
            <span className="font-mono text-[9px] uppercase tracking-widest">{statusLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
});

ProcessStep.displayName = "ProcessStep";
