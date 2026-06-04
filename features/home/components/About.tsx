// components/About.tsx - VERSÃO AAA
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const chars = textRef.current!.querySelectorAll(".char");
      
      gsap.to(chars, {
        opacity: 1,
        stagger: 0.03,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const text = "I build interfaces that convert, perform and scale. Focused on creating premium digital experiences with performance and design in mind.";

  return (
    <section className="py-40 px-6 max-w-5xl mx-auto relative">
      {/* Glow de fundo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] -z-10" />
      
      <div className="mb-16">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.3em]">About</span>
      </div>

      <h2 
        ref={textRef}
        className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-white"
      >
        {text.split("").map((char, i) => (
          <span 
            key={i} 
            className="char opacity-10 inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </h2>

      {/* Linha decorativa */}
      <div className="mt-20 flex items-center gap-4">
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-white/20" />
        <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
          Based in Brazil
        </span>
      </div>
    </section>
  );
}