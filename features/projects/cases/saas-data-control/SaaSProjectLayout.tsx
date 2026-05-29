"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Zap, Database } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function SaaSProjectLayout() {
  const sectionRef = useRef<HTMLElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. ANIMAÇÃO DE ENTRADA (Hero)
      gsap.fromTo(".laptop-visual-container",
        { scale: 0.9, opacity: 0, y: 50, rotateX: 15 },
        { scale: 1, opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );

      // 2. TIMELINE DE SCROLL (Narrativa)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Movimento do Laptop e Brilho
      tl.to(".laptop-visual-container", {
        x: -40,
        rotateY: -10,
        rotateX: 5,
        ease: "none"
      }, 0);

      // O Brilho Cinematográfico passando pela tela
      tl.fromTo(".screen-shine", 
        { x: "-100%", opacity: 0 },
        { x: "100%", opacity: 0.5, ease: "power1.inOut" },
        0
      );

      // Cards de Dados (Surgindo um por um)
      tl.fromTo(".data-card",
        { opacity: 0, x: 60, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, stagger: 0.2, ease: "back.out(1.7)" },
        0.1
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#050505] text-white overflow-hidden flex items-center">
      {/* Background Decorativo - Grid Minimalista */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-16 relative z-10">

        {/* ESQUERDA: Conteúdo */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex items-center gap-3 text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Database size={16} />
            </div>
            <span>Scalable Architecture</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
            Gestão de Dados <br />
            <span className="text-zinc-600 italic">High-Speed.</span>
          </h2>

          <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-md">
            Arquitetura cloud-native processando milhares de eventos por segundo com latência ultra-baixa.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="text-cyan-500 mb-3" size={24} />
              <h4 className="font-semibold text-sm mb-1 text-white">Enterprise Auth</h4>
              <p className="text-xs text-zinc-500">MFA & RBAC nativo.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <Zap className="text-yellow-500 mb-3" size={24} />
              <h4 className="font-semibold text-sm mb-1 text-white">Edge Ready</h4>
              <p className="text-xs text-zinc-500">99.9% de Uptime.</p>
            </div>
          </div>
        </div>

        {/* DIREITA: Visual do Laptop & Cards */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          
          {/* Laptop Container com Perspectiva CSS */}
          <div className="laptop-visual-container relative w-full perspective-1000">
            <div className="relative rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Imagem do Laptop (Render estático de alta qualidade) */}
              <img 
                src="/textures/saas-laptop-preview.jpg" 
                alt="SaaS Dashboard" 
                className="w-full h-auto block"
              />
              
              {/* Efeito de Brilho Cinematográfico (O SEGREDO) */}
              <div className="screen-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none" />
            </div>

            {/* Floating Data Cards (Os cards que flutuam em cima do laptop) */}
            <div className="absolute -right-8 -top-12 z-20 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="data-card p-4 w-64 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                    <Zap size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="w-20 h-2 bg-zinc-800 rounded-full mb-2" />
                    <div className="w-12 h-1.5 bg-zinc-900 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* Aura de Luz atrás do laptop */}
            <div className="absolute -z-10 inset-0 bg-cyan-500/20 blur-[120px] rounded-full" />
          </div>
        </div>

      </div>
    </section>
  );
}