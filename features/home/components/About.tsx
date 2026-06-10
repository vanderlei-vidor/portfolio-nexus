// components/About.tsx - VERSÃO AAA OTIMIZADA
"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ OTIMIZAÇÃO 1: IntersectionObserver para detectar visibilidade
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // Ativa quando 30% visível
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // ✅ OTIMIZAÇÃO 2: Animação só executa quando visível
  useEffect(() => {
    if (!isVisible || !textRef.current) return;

    const ctx = gsap.context(() => {
      const words = textRef.current!.querySelectorAll(".word");
      
      // ✅ OTIMIZAÇÃO 3: Animação mais rápida e eficiente
      gsap.fromTo(
        words,
        { 
          opacity: 0.1,
          y: 20,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.08, // Stagger maior = menos cálculos
          ease: "power3.out",
          // ✅ OTIMIZAÇÃO 4: Sem scrub (muito mais leve)
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const text = "I build interfaces that convert, perform and scale. Focused on creating premium digital experiences with performance and design in mind.";

  // ✅ OTIMIZAÇÃO 5: Divide por PALAVRAS em vez de caracteres (100+ → ~20 elementos)
  const words = text.split(" ");

  return (
    <section 
      ref={sectionRef}
      className="py-40 px-6 max-w-5xl mx-auto relative"
      aria-label="About section"
    >
      {/* Glow de fundo - otimizado com will-change */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-500/5 blur-[150px] -z-10 will-change-transform"
        aria-hidden="true"
      />
      
      <div className="mb-16">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.3em]">About</span>
      </div>

      <h2 
        ref={textRef}
        className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-white"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-[0.25em]">
            <span className="word inline-block opacity-10">
              {word}
            </span>
          </span>
        ))}
      </h2>

      {/* Linha decorativa */}
      <div className="mt-20 flex items-center gap-4">
        <div className="h-px w-20 bg-linear-to-r from-transparent to-white/20" />
        <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
          Author
        </span>
      </div>
    </section>
  );
}