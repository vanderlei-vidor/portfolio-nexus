"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Importando os ícones premium para os controles do carrossel no modal
import { Play, Pause, ChevronLeft, ChevronRight, Link, ArrowUpRight } from "lucide-react";

// 1. Dados dos slides específicos do seu projeto (Music Player)
const musicPlayerSlides = [
  {
    src: "/projects/music-player/textures/tela_inicial.webp",
    title: "Choreographed Motion Engine",
    description: "Immersive local-first layout mapped to micro-interactions, canvas audio spectrums, and fluid state changes.",
  },
  {
    src: "/projects/music-player/textures/tela_player.webp",
    title: "High-Fidelity Audio Pipeline",
    description: "Low-latency playback architecture optimized for offline caching, large spectrum buffer indexing, and zero-gap transitions.",
  },
  {
    src: "/projects/music-player/textures/tela_menu_lateral.webp",
    title: "Local-First Indexing Schema",
    description: "Reactive internal client-side indexing optimized for rapid catalog ingestion and local audio telemetry monitoring.",
  },
  {
    src: "/projects/music-player/textures/tela_menu_lateral.webp",
    title: "Local-First Indexing Schema",
    description: "Reactive internal client-side indexing optimized for rapid catalog ingestion and local audio telemetry monitoring.",
  },
  {
    src: "/projects/music-player/textures/tela_menu_lateral.webp",
    title: "Local-First Indexing Schema",
    description: "Reactive internal client-side indexing optimized for rapid catalog ingestion and local audio telemetry monitoring.",
  },
  {
    src: "/projects/music-player/textures/tela_menu_lateral.webp",
    title: "Local-First Indexing Schema",
    description: "Reactive internal client-side indexing optimized for rapid catalog ingestion and local audio telemetry monitoring.",
  },
  {
    src: "/projects/music-player/textures/tela_menu_lateral.webp",
    title: "Local-First Indexing Schema",
    description: "Reactive internal client-side indexing optimized for rapid catalog ingestion and local audio telemetry monitoring.",
  },
  {
    src: "/projects/music-player/textures/tela_menu_lateral.webp",
    title: "Local-First Indexing Schema",
    description: "Reactive internal client-side indexing optimized for rapid catalog ingestion and local audio telemetry monitoring.",
  },
  {
    src: "/projects/music-player/textures/tela_menu_lateral.webp",
    title: "Local-First Indexing Schema",
    description: "Reactive internal client-side indexing optimized for rapid catalog ingestion and local audio telemetry monitoring.",
  },
  {
    src: "/projects/music-player/textures/tela_menu_lateral.webp",
    title: "Local-First Indexing Schema",
    description: "Reactive internal client-side indexing optimized for rapid catalog ingestion and local audio telemetry monitoring.",
  },
];

export default function FinalShowcase() {
  // Estados de controle do Modal e dos Slides
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const SLIDE_DURATION = 4000; // Tempo de cada slide (4 segundos)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  // 2. Lógica do Timer Automatizado (Autoplay do Showcase)
  useEffect(() => {
    if (isDemoOpen && isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, SLIDE_DURATION);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isDemoOpen, isPlaying, currentSlide]);

  // Funções de navegação manual
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === musicPlayerSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? musicPlayerSlides.length - 1 : prev - 1));
  };

  return (
    // 🔥 O ID FOI ADICIONADO EXATAMENTE AQUI NESSA TAG PRINCIPAL!
    <section >

      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_60%)]" />

      {/* FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} />

      {/* AMBIENT GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[220px]" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">

        {/* DEVICE MOCKUP */}
        <div className="relative mb-24">
          <div className="absolute inset-0 -z-10 rounded-full bg-violet-500/20 blur-[180px]" />
          <div className="relative w-[320px] animate-[float_6s_ease-in-out_infinite]">
            <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-950 p-[2px] shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

              {/* TELA DO PLAYER CARREGADA COM NEXT/IMAGE */}
              <Image
                src="/projects/music-player/textures/tela_player.webp"
                alt="Music Player Architecture Showcase"
                width={400}
                height={850}
                className="block w-full h-auto rounded-[2.8rem]"
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
              onClick={() => router.push("/contact")}
              className="group relative px-12 py-5 bg-white text-black rounded-full font-bold text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10">Start a Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            {/* BOTÕES SECUNDÁRIOS */}
            <div className="flex items-center gap-4">

              {/* BOTAO: WATCH SHOWCASE (Abre o Carrossel do Modal) */}
              <button
                onClick={() => {
                  setCurrentSlide(0);
                  setIsPlaying(true);
                  setIsDemoOpen(true);
                }}
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

      {/* 🛠️ AQUELA LINHA SOLTA QUE ESTAVA AQUI FOI REMOVIDA PARA NÃO DAR ERRO DE SINTAXE! */}

      {/* --- MODAL INTERATIVO ESTILIZADO AAA (FUSÃO DE PROJETO CONCLUÍDA) --- */}
      {isDemoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12 animate-in fade-in duration-700"
          onClick={() => setIsDemoOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >

            {/* LINHA DE PROGRESSO SUPERIOR AUTOMÁTICA */}
            {isPlaying && (
              <div
                key={currentSlide}
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 z-50 origin-left"
                style={{
                  animation: `progressLinear ${SLIDE_DURATION}ms linear forwards`,
                }}
              />
            )}

            {/* HEADER DO ENGENHARIA DO MODAL */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-50">
              <span className="font-mono text-[9px] text-white/40 tracking-[0.4em] uppercase flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`} />
                Architecture_Telemetry // Stage_0{currentSlide + 1}_of_0{musicPlayerSlides.length}
              </span>
              <button
                onClick={() => setIsDemoOpen(false)}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all font-mono text-[10px]"
              >
                EXIT (ESC)
              </button>
            </div>

            {/* EXIBIÇÃO DO TEMPLATE DA IMAGEM TÉCNICA */}
            <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12">
              <Image
                src={musicPlayerSlides[currentSlide].src}
                alt={musicPlayerSlides[currentSlide].title}
                fill
                priority
                /* 🔥 TROCAMOS OBJECT-COVER POR OBJECT-CONTAIN E ADICIONAMOS UM PADDING DE RESPIRO */
                className="object-contain animate-in fade-in zoom-in-95 duration-500 max-h-[75vh]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* FOOTER DO MODAL */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/90 to-transparent z-40 flex flex-col md:flex-row md:items-end justify-between gap-6">

              {/* TEXTO EXPLICATIVO */}
              <div className="max-w-2xl text-left">
                <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl animate-in slide-in-from-bottom-2 duration-500">
                  {musicPlayerSlides[currentSlide].title}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-zinc-400 font-light leading-relaxed animate-in slide-in-from-bottom-3 duration-500">
                  {musicPlayerSlides[currentSlide].description}
                </p>
              </div>

              {/* DOCK DOS BOTÕES DE AUDIO/VIDEO CONTROL */}
              <div className="flex items-center gap-4 self-center md:self-end bg-white/[0.03] border border-white/5 backdrop-blur-md px-4 py-2.5 rounded-full">

                <button
                  onClick={prevSlide}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  title="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all"
                  title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
                >
                  {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" />}
                </button>

                <button
                  onClick={nextSlide}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  title="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="h-4 w-[1px] bg-white/10 mx-1" />

                {/* Bullets */}
                <div className="flex gap-1.5">
                  {musicPlayerSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? "w-4 bg-blue-500" : "w-1.5 bg-zinc-600 hover:bg-zinc-400"}`}
                    />
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}