"use client";

import { useState } from "react"; // Importando o estado para o modal

export default function FinalShowcase() {
  // Estado para controlar a abertura do modal de vídeo
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-40">
      
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_60%)]" />

      {/* FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} />

      {/* AMBIENT GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[220px]" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">

        {/* DEVICE */}
        <div className="relative mb-24">
          <div className="absolute inset-0 -z-10 rounded-full bg-violet-500/20 blur-[180px]" />
          <div className="relative w-[320px] animate-[float_6s_ease-in-out_infinite]">
            <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-950 p-[2px] shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
              <img
                src="/projects/music-player/textures/tela_player.webp"
                alt="Music Player Architecture"
                className="block w-full rounded-[2.8rem]"
              />
              <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0" />
            </div>
          </div>
        </div>

        {/* FINAL MESSAGE */}
        <div className="flex flex-col items-center">
          <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Final Showcase // Production Grade
          </span>

          <h2 className="max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.08em] text-white md:text-8xl lg:text-[10rem]">
            Built for
            <br />
            people who
            <br />
            truly listen.
          </h2>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base font-light">
            A cinematic local-first music experience engineered with immersive
            motion, scalable architecture and high-fidelity performance.
          </p>
        </div>

        {/* CTA SECTION */}
        <div className="mt-32 flex flex-col items-center">
          <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.4em] mb-8">
            Technical Access & Inquiry
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* BOTAO: START A PROJECT (Email) */}
            <button 
              onClick={() => window.open("mailto:vanderleividor1@gmail.com", "_blank")}
              className="group relative px-12 py-5 bg-white text-black rounded-full font-bold text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10">Start a Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            {/* BOTÕES SECUNDÁRIOS */}
            <div className="flex items-center gap-4">
              {/* BOTAO: LIVE DEMO (Abre o Modal) */}
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="px-8 py-4 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 rounded-full transition-all duration-500 bg-white/[0.02] backdrop-blur-md"
              >
                Watch Demo
              </button>

              {/* BOTAO: SOURCE (GitHub) */}
              <button 
                onClick={() => window.open("https://github.com/vanderlei-vidor", "_blank")}
                className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-200 transition-all duration-500"
              >
                &lt;Source /&gt;
              </button>
            </div>
          </div>

          <button 
            onClick={() => window.location.href = "/"}
            className="mt-16 text-zinc-700 hover:text-zinc-400 text-xs font-mono transition-colors tracking-tighter"
          >
            [ Back to Home ]
          </button>
        </div>
      </div>

      {/* --- MODAL DE VÍDEO OVERLAY --- */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12 animate-in fade-in duration-700"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_0_100px_rgba(0,0,0,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal com ar de "Terminal/Engineering" */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-50">
              <span className="font-mono text-[9px] text-white/40 tracking-[0.4em] uppercase">
                Playback_Module // Music_Player_v1.0.mp4
              </span>
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all font-mono text-[10px]"
              >
                EXIT (ESC)
              </button>
            </div>

            {/* O VÍDEO DO PLAYER */}
            <video 
              src="/projects/music-player/videos/demo.mp4" 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}