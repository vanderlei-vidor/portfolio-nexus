"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./EcosystemHero.css";

export default function EcosystemHero() {
  const containerRef = useRef(null);
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de revelação suave
      gsap.from(".reveal-text", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
      });

      // Brilho pulsante no fundo
      gsap.to(".hero-glow", {
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="ecosystem-section ecosystem-hero relative overflow-hidden">
      
      {/* BACKGROUND ELEMENTS (Consistência com as outras seções) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="hero-glow absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[180px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/textures/noise-webp.webp')]" />
      </div>

      <div className="ecosystem-container relative z-10 text-center md:text-left">
        <div className="reveal-text">
          <span className="ecosystem-label">
            <span className="dot" /> ACT IV
          </span>
        </div>

        <h1 className="reveal-text">
          FOUR <span className="text-gradient">PRODUCTS.</span>
          <br />
          ONE <span className="text-gradient">VISION.</span>
        </h1>

        <p className="reveal-text mt-6">
          A digital ecosystem connecting 
          <span className="text-white"> entertainment</span>, 
          <span className="text-white"> learning</span>, 
          <span className="text-white"> productivity</span> and 
          <span className="text-white"> innovation</span>.
        </p>

        {/* Linha decorativa opcional */}
        <div className="reveal-text mt-12 h-px w-24 bg-linear-to-r from-blue-500 to-transparent hidden md:block" />
      </div>
    </section>
  );
}