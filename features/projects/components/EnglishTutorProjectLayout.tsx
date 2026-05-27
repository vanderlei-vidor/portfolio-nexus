"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mic, Brain, Sparkles, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function EnglishTutorProjectLayout() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. ANIMAÇÃO DE ENTRADA
      gsap.fromTo(".app-container",
        { scale: 0.8, opacity: 0, y: 100, rotateY: -15 },
        { scale: 1, opacity: 1, y: 0, rotateY: 0, duration: 1.5, ease: "power4.out" }
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

      // Movimento do Celular
      tl.to(".app-container", {
        y: -30,
        rotateX: 5,
        ease: "none"
      }, 0);

      // Elementos que saltam da tela (Paralaxe)
      tl.fromTo(".floating-chat", 
        { x: -50, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, stagger: 0.2 },
        0.1
      );

      tl.fromTo(".xp-badge",
        { y: 50, opacity: 0 },
        { y: -100, opacity: 1, duration: 1 },
        0.3
      );

      // Animação das ondas de voz
      gsap.to(".voice-bar", {
        scaleY: "random(0.3, 1.5)",
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#03000a] text-white overflow-hidden flex items-center">
      
      {/* Background: Nebulosa Roxa Sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-16 relative z-10">

        {/* ESQUERDA: Texto e Features */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex items-center gap-3 text-violet-400 font-mono text-xs tracking-[0.3em] uppercase">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <Brain size={16} />
            </div>
            <span>AI Language Immersion</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
            Seu Tutor de Inglês <br />
            <span className="text-violet-500 italic">24/7 com IA.</span>
          </h2>

          <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-md">
            Pratique conversação real com processamento de linguagem natural. O app corrige sua gramática e pronúncia instantaneamente.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/5 transition-all group">
              <Mic className="text-violet-500 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-sm font-semibold">Reconhecimento de Voz</h4>
                <p className="text-xs text-zinc-500">Pratique sua fala sem medo de julgamentos.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/5 transition-all group">
              <Trophy className="text-amber-500 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-sm font-semibold">Ranking Semanal</h4>
                <p className="text-xs text-zinc-500">Compita com outros estudantes e suba de liga.</p>
              </div>
            </div>
          </div>
        </div>

        {/* DIREITA: O Celular e os Elementos Cinematográficos */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          
          {/* Badge de XP flutuando (Cima) */}
          <div className="xp-badge absolute top-10 right-10 z-30 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2">
            <Sparkles size={16} /> +21 XP
          </div>

          <div className="app-container relative w-full max-w-[300px] perspective-1000">
            {/* Frame do Celular */}
            <div className="relative rounded-[2.5rem] border-[6px] border-zinc-800 bg-black shadow-2xl overflow-hidden aspect-[9/19]">
              
              {/* Imagem Real do seu App (Aqui você coloca o print que me mandou) */}
              <img 
                src="/textures/english-tutor-screen.webp" 
                alt="English AI Tutor" 
                className="w-full h-full object-cover"
              />

              {/* Camada de brilho na tela */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Overlay de Áudio (Ondas de Voz) */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1 h-8">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="voice-bar w-1 bg-violet-500 rounded-full h-full" />
                ))}
              </div>
            </div>

            {/* Balão de Chat Flutuando fora do celular */}
            <div className="floating-chat absolute -left-20 top-1/3 z-20 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl max-w-[200px]">
              <p className="text-xs text-violet-400 font-mono mb-1 italic">IA feedback:</p>
              <p className="text-xs text-zinc-200 leading-tight">"Excellent pronunciation! Try to stress the second syllable in 'Success'."</p>
            </div>
          </div>

          {/* Brilho de fundo atrás do celular */}
          <div className="absolute -z-10 w-[400px] h-[400px] bg-violet-500/20 blur-[100px] rounded-full" />
        </div>

      </div>
    </section>
  );
}