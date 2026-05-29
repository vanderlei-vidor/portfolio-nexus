"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Globe, BarChart3, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioNexusLayout() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. ANIMAÇÃO DE ENTRADA
      gsap.fromTo(".nexus-stack",
        { scale: 0.7, opacity: 0, rotateX: 20 },
        { scale: 1, opacity: 1, rotateX: 0, duration: 1.8, ease: "expo.out" }
      );

      // 2. TIMELINE DE SCROLL
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      // Efeito de "Explosão" das camadas do site
      tl.to(".layer-1", { z: 100, y: -40, x: -20, rotateY: -5, ease: "none" }, 0);
      tl.to(".layer-2", { z: 200, y: 40, x: 20, rotateY: 5, ease: "none" }, 0);
      
      // Brilho de "Ouro/Chrome" passando
      tl.fromTo(".nexus-shine", 
        { x: "-100%", opacity: 0 },
        { x: "100%", opacity: 0.4, ease: "power2.inOut" },
        0
      );

      // Tags de Tecnologia flutuando
      tl.fromTo(".tech-tag",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.1, ease: "back.out(2)" },
        0.2
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#050505] text-white overflow-hidden flex items-center">
      {/* Background: Linhas de Fluxo de Dados */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-16 relative z-10">

        {/* ESQUERDA: O Manifesto */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex items-center gap-3 text-amber-500 font-mono text-xs tracking-[0.3em] uppercase">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Rocket size={16} />
            </div>
            <span>Core Ecosystem</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
            Onde o Código <br />
            <span className="text-zinc-500">Gera Valor.</span>
          </h2>

          <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-md">
            Este site não é apenas um portfólio; é um hub de performance otimizado para conversão, SEO e experiência do usuário em escala global.
          </p>

          {/* Tags de Tech Estilo Premium */}
          <div className="flex flex-wrap gap-2">
            {["Next.js 15", "GSAP", "Tailwind", "SEO Max", "Cloudflare"].map((tech) => (
              <span key={tech} className="tech-tag px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Globe className="text-amber-500" size={18} />
              <span className="text-xs font-medium text-zinc-300">Global Reach</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="text-amber-500" size={18} />
              <span className="text-xs font-medium text-zinc-300">Data Driven</span>
            </div>
          </div>
        </div>

        {/* DIREITA: Visual de Camadas (O Site se abrindo) */}
        <div className="lg:col-span-7 relative h-[600px] flex items-center justify-center">
          
          <div className="nexus-stack relative w-full max-w-[500px] aspect-video perspective-2000">
            
            {/* Camada de Baixo (Wireframe/Código) */}
            <div className="layer-2 absolute inset-0 rounded-xl border border-amber-500/20 bg-amber-500/[0.02] backdrop-blur-sm flex items-center justify-center">
               <Code2 size={80} className="text-amber-500/10" />
            </div>

            {/* Camada do Meio (Interface) */}
            <div className="layer-1 absolute inset-0 rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-md shadow-2xl overflow-hidden translate-z-10">
              <img 
                src="/textures/my-site-preview.jpg" 
                alt="Website Preview" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="nexus-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none" />
            </div>

            {/* Aura de Glow */}
            <div className="absolute -z-10 inset-0 bg-amber-500/10 blur-[120px] rounded-full" />
            
            {/* Floating UI Elements */}
            <div className="absolute -top-10 -right-10 p-4 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl layer-1">
               <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
               </div>
               <div className="mt-3 space-y-2">
                  <div className="w-32 h-2 bg-white/5 rounded-full" />
                  <div className="w-24 h-2 bg-white/5 rounded-full" />
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}