"use client";

import './AudioImmersion.css';
import { useEffect, useState } from "react";

const pseudoRandom = (index: number, salt: number) => {
  const value = Math.sin(index * 999 + salt * 777) * 10000;
  return value - Math.floor(value);
};

const particles = Array.from({ length: 18 }).map((_, index) => ({
  id: index,
  size: pseudoRandom(index, 1) * 10 + 4,
  left: pseudoRandom(index, 2) * 100,
  top: pseudoRandom(index, 3) * 100,
  duration: 10 + pseudoRandom(index, 4) * 10,
  delay: pseudoRandom(index, 5) * 5,
}));

const waveBars = Array.from({ length: 40 }).map((_, index) => ({
  id: index,
  height: 20 + pseudoRandom(index, 6) * 80,
  animationDelay: index * 0.05,
}));

export default function AudioImmersion() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // Reduzi py-40 para py-24 para diminuir o espaço morto
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-24">

      {/* Transição suave com a seção anterior */}
      <div className="absolute top-0 left-0 h-32 w-full bg-gradient-to-b from-[#030303] to-transparent z-10" />

      {/* REACTIVE LIGHTING */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-500 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            rgba(59,130,246,0.15) 0%, 
            transparent 40%),
            radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            rgba(168,85,247,0.08) 0%, 
            transparent 60%)
          `
        }}
      />

      {/* PARTICLES */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/20 blur-[1px] animate-float"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 mx-auto flex max-w-6xl flex-col items-center text-center">
        <div className="mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-300">
            Audio Immersion
          </span>
        </div>

        <h2 className="max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.08em] text-white md:text-8xl lg:text-[10rem]">
          Feel every<br />frequency.
        </h2>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
          A cinematic audio engine crafted to transform offline listening into
          an immersive sensory experience with reactive visuals.
        </p>

        {/* WAVE VISUALIZER */}
        <div className="mt-20 flex h-[120px] items-end gap-[4px] md:gap-[6px]">
          {waveBars.map((bar) => (
            <div
              key={bar.id}
              className="w-[4px] md:w-[6px] rounded-full bg-gradient-to-t from-blue-600 via-violet-500 to-cyan-400 animate-wave-bar"
              style={{
                height: `${bar.height}%`,
                animationDelay: `${bar.animationDelay}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-40px) translateX(20px); }
        }
        @keyframes wave-bar {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.5); }
        }
        .animate-float { animation: float infinite ease-in-out; }
        .animate-wave-bar { animation: wave-bar 1.2s infinite ease-in-out; transform-origin: bottom; }
      `}</style>
    </section>
  );
}
