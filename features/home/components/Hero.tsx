"use client";

import { useEffect, useState, useCallback, memo } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";

// 🚀 Carrega os efeitos interativos apenas no cliente e sob demanda
const HeroInteractiveLayer = dynamic(() => import("./HeroInteractiveLayer"), {
  ssr: false,
});

const Hero = memo(function Hero() {
  const lenis = useLenis();
  const [shouldActivateEffects, setShouldActivateEffects] = useState(false);

  useEffect(() => {
    // Adia a ativação dos trackers pesados usando requestIdleCallback
    if ("requestIdleCallback" in window) {
      const idleId = requestIdleCallback(() => setShouldActivateEffects(true));
      return () => cancelIdleCallback(idleId);
    } else {
      const timeoutId = setTimeout(() => setShouldActivateEffects(true), 500);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const scrollToProjects = useCallback(() => {
    lenis?.scrollTo("#selected-projects", {
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }, [lenis]);

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center px-[clamp(1.25rem,4vw,6rem)] relative overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* 🏎️ Injeção de estilo inline para rodar animações nativas instantâneas (Mesma curva do Framer Motion) */}
      <style>{`
        @keyframes heroFadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-text {
          animation: heroFadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Camada pesada ativada via IDLE para não travar a renderização inicial */}
      {shouldActivateEffects && <HeroInteractiveLayer />}

      {/* Conteúdo estrutural puro HTML/CSS */}
      <p className="animate-hero-text uppercase tracking-[0.4em] text-zinc-500 font-medium mb-[clamp(1.5rem,3vw,3rem)] text-[clamp(0.65rem,1vw,0.8rem)]" style={{ animationDelay: "0.1s", opacity: 0 }}>
        DIGITAL EXPERIENCES
      </p>

      <h1 className="font-black leading-[0.82] tracking-[-0.06em] text-white text-[clamp(3rem,11vw,8rem)] max-w-[10ch]">
        CRAFTING
        <br />
        THE FUTURE.
      </h1>

      <p className="mt-fluid-gap-sm opacity-40 font-light leading-relaxed max-w-[40ch] text-[clamp(1rem,2vw,1.4rem)] animate-hero-text" style={{ animationDelay: "0.2s", opacity: 0 }}>
        Smooth. Elegant. Cinematic.
      </p>

      {/* CTAs com interações nativas CSS via transform (Zero processamento JS no hover) */}
      <div className="mt-[clamp(2rem,6vw,5rem)] flex flex-col sm:flex-row items-center gap-[clamp(1rem,2vw,2rem)] w-full sm:w-auto animate-hero-text" style={{ animationDelay: "0.3s", opacity: 0 }}>
        <button
          onClick={scrollToProjects}
          className="w-full sm:w-auto px-[clamp(1.5rem,3vw,3rem)] py-[clamp(0.9rem,2vw,1.25rem)] bg-white text-black rounded-full font-bold text-fluid-btn hover:scale-103 active:scale-98 transition-all duration-200"
          aria-label="Explore work"
        >
          Explore Work
        </button>

        <Link
          href="/process"
          className="inline-flex justify-center w-full sm:w-auto px-[clamp(1.5rem,3vw,3rem)] py-[clamp(0.9rem,2vw,1.25rem)] border border-white/10 rounded-full font-bold text-fluid-btn hover:bg-white/5 hover:scale-103 active:scale-98 transition-all duration-200"
          aria-label="View the process"
        >
          The Process
        </Link>
      </div>
    </section>
  );
});

export default Hero;