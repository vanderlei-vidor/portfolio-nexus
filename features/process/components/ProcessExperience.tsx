"use client";

import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const sectionColors = [
  "rgb(0, 0, 0)",
  "rgb(15, 15, 15)",
  "rgb(25, 25, 25)",
  "rgb(35, 35, 35)",
  "rgb(45, 45, 45)",
  "rgb(0, 0, 0)",
];

export default function ProcessExperience() {
  const lenis = useLenis();
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });

    return () => {
      lenis?.scrollTo(0, { immediate: true });
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
      const getScrollDistance = () => horizontalWrapper.scrollWidth - window.innerWidth;

      gsap.set(horizontalWrapper, {
        width: `${sections.length * 100}vw`,
        x: 0,
      });

      gsap.set(progressBar, { scaleX: 0 });

      gsap.to(horizontalWrapper, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          id: "process-horizontal-scroll",
          trigger: mainContainer,
          scrub: 1,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / Math.max(sections.length - 1, 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.04,
            ease: "power1.inOut",
          },
        },
      });

      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          id: "process-progress",
          trigger: mainContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const colorTimeline = gsap.timeline({
        scrollTrigger: {
          id: "process-color-shift",
          trigger: mainContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
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

    const refreshFrame = requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshFrame);
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [lenis]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/10 z-50">
        <div ref={progressBarRef} className="w-full h-full bg-accent origin-left scale-x-0" />
      </div>

      <main
        ref={mainContainerRef}
        className="relative w-full bg-black"
        style={{ height: `${sectionColors.length * 100}vh` }}
      >
        <div ref={stickyStageRef} className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <div ref={horizontalWrapperRef} className="flex h-screen absolute top-0 left-0 will-change-transform">
          <section
            ref={(el) => {
              if (el) sectionsRef.current[0] = el;
            }}
            className="w-screen h-full flex flex-col items-center justify-center text-white px-6 flex-shrink-0 bg-transparent"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent font-mono text-xs uppercase tracking-[0.5em] mb-6"
            >
              The Workflow
            </motion.span>
            <motion.h1 className="text-6xl md:text-8xl font-black text-center max-w-5xl leading-[0.9] tracking-tighter uppercase">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="inline-block"
              >
                How
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                className="inline-block"
              >
                Magic
              </motion.span>{" "}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                className="inline-block text-zinc-700"
              >
                Happens.
              </motion.span>
            </motion.h1>
          </section>

          <ProcessStep
            ref={(el) => {
              if (el) sectionsRef.current[1] = el;
            }}
            step="01"
            title="Descoberta & Estrategia"
            description="Antes de encostar no teclado, eu decifro o problema. Mapeamento de escopo, objetivos de negocio e arquitetura de informacao focada em conversao."
          />
          <ProcessStep
            ref={(el) => {
              if (el) sectionsRef.current[2] = el;
            }}
            step="02"
            title="Design UI/UX Premium"
            description="Criacao de interfaces com design autoral, layouts assimetricos inovadores e prototipos onde a micro-interacao guia os olhos do usuario."
          />
          <ProcessStep
            ref={(el) => {
              if (el) sectionsRef.current[3] = el;
            }}
            step="03"
            title="Engenharia de Performance"
            description="Desenvolvimento limpo com Next.js 16, otimizacao de renderizacao e animacoes matematicas ultra leves direto na GPU."
          />
          <ProcessStep
            ref={(el) => {
              if (el) sectionsRef.current[4] = el;
            }}
            step="04"
            title="Entrega & Overdelivery"
            description="O projeto vai ao ar buscando nota maxima no Lighthouse. O polimento das transicoes deixa a experiencia mais precisa, fluida e memoravel."
          />

          <section
            ref={(el) => {
              if (el) sectionsRef.current[5] = el;
            }}
            className="w-screen h-full flex flex-col items-center justify-center text-white px-6 flex-shrink-0 bg-transparent"
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">
              Start Now.
            </h2>
          </section>
          </div>
        </div>
      </main>
    </>
  );
}

interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
}

const ProcessStep = forwardRef<HTMLElement, ProcessStepProps>(({ step, title, description }, ref) => {
  return (
    <section
      ref={ref}
      className="w-screen h-full flex items-center justify-center flex-shrink-0 px-8 md:px-12 border-l border-white/5 bg-transparent"
    >
      <div className="max-w-4xl w-full relative">
        <span className="absolute -top-16 -left-4 md:-top-20 md:-left-10 text-[8rem] md:text-[15rem] font-black text-white/[0.03] select-none pointer-events-none">
          {step}
        </span>
        <motion.h3
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="text-4xl md:text-6xl font-bold mb-8 relative z-10 uppercase tracking-tight"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-2xl leading-relaxed font-light max-w-2xl"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
});

ProcessStep.displayName = "ProcessStep";
