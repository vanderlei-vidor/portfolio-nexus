"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const musicPlayerSlides = [
  {
    src: "/projects/music-player/textures/tela_temas.webp",
    title: "Adaptive Aesthetic Engine",
    description: "Real-time look-and-feel switching utilizing a deeply decoupled token architecture for fluid runtime style mutations.",
  },
  {
    src: "/projects/music-player/textures/tela_inicial.webp",
    title: "High-Fidelity Discovery Hub",
    description: "The core dashboard engineered for low-latency indexing, instant local asset ingestion, and structured data layout rendering.",
  },
  {
    src: "/projects/music-player/textures/tela_name.webp",
    title: "Custom Accent Manifestation",
    description: "Demonstrating encapsulated component architecture where complex color spaces transition seamlessly without triggering expensive repaints.",
  },
  {
    src: "/projects/music-player/textures/tela_menu_lateral.webp",
    title: "Ergonomic Spatial Navigation",
    description: "A hardware-accelerated sidebar overlay designed with fine-tuned layout transitions to preserve the user's spatial focus.",
  },
  {
    src: "/projects/music-player/textures/tela_player.webp",
    title: "Choreographed Playback Core",
    description: "The primary playback engine interface, mapping high-frequency audio spectrum updates to immersive visual micro-interactions.",
  },
  {
    src: "/projects/music-player/textures/tela_sleep_timer.webp",
    title: "Temporal Thread Termination",
    description: "Intelligent background lifecycle scheduling that fades audio output smoothly using precise, low-overhead system timer hooks.",
  },
  {
    src: "/projects/music-player/textures/tela_playlist.webp",
    title: "Reactive Collection Matrix",
    description: "Highly optimized list rendering featuring rapid metadata caching, virtualized scrolling, and fluid collection transitions.",
  },
  {
    src: "/projects/music-player/textures/tela_inicial_playlist_personalizada.webp",
    title: "Algorithmic Curation Layer",
    description: "A personalized gateway that evaluates user playback metrics to dynamically generate reactive collections with local-first availability.",
  },
  {
    src: "/projects/music-player/textures/tela_gapless.webp",
    title: "Zero-Latency Gapless Pipeline",
    description: "Under-the-hood audio scheduling that pre-buffers sequential tracks to achieve sample-accurate, zero-gap audio transitions.",
  },
  {
    src: "/projects/music-player/textures/tela_equalizador.webp",
    title: "Hardware-Accelerated DSP Matrix",
    description: "A multi-band parametric equalizer manipulating audio frequency nodes via low-level Digital Signal Processing threads.",
  },
  {
    src: "/projects/music-player/textures/tela_criar_nova_playlist.webp",
    title: "In-Memory State Mutation",
    description: "Transactional local database insertion providing immediate, optimistic rendering updates when generating custom audio schemas.",
  },
  {
    src: "/projects/music-player/textures/tela_inicial_tema_orange.webp",
    title: "Unified Audio Ecosystem",
    description: "The complete production-grade architectural overview, harmonizing local asset ingestion with clean, cinematic interface movements.",
  },
  {
    src: "/projects/music-player/textures/menu_velocidades.webp",
    title: "Variable Playback Rate Controller",
    description: "Micro-stepped speed modulation optimized for real-time audio time-stretching without distorting natural pitch frequencies.",
  },
  {
    src: "/projects/music-player/textures/menu_lateral_player.webp",
    title: "Contextual Audio Overlays",
    description: "Deeply embedded slide-out interactions allowing advanced audio routing and spatial playback controls within the active player layer.",
  }
];

export default function FinalShowcase() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // ✅ CORREÇÃO: Touch/Swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
  const SLIDE_DURATION = 4000;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // ✅ CORREÇÃO: Timer mais robusto
  useEffect(() => {
    if (isDemoOpen && isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev === musicPlayerSlides.length - 1 ? 0 : prev + 1));
      }, SLIDE_DURATION);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isDemoOpen, isPlaying]);

  // ✅ CORREÇÃO: Keyboard navigation
  useEffect(() => {
    if (!isDemoOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setIsDemoOpen(false);
          break;
        case "ArrowLeft":
          prevSlide();
          break;
        case "ArrowRight":
          nextSlide();
          break;
        case " ":
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDemoOpen, isPlaying]);

  // ✅ CORREÇÃO: Focus trap para acessibilidade
  useEffect(() => {
    if (isDemoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDemoOpen]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === musicPlayerSlides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? musicPlayerSlides.length - 1 : prev - 1));
  }, []);

  // ✅ CORREÇÃO: Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="final-showcase" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 sm:px-6 py-24 sm:py-40">

      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_60%)]" />

      {/* FILM GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} />

      {/* AMBIENT GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] sm:h-[900px] sm:w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[150px] sm:blur-[220px]" />

      {/* MAIN LAYOUT CONTENT */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center w-full">

        {/* DEVICE MOCKUP */}
        <div className="relative mb-12 sm:mb-24">
          <div className="absolute inset-0 -z-10 rounded-full bg-violet-500/20 blur-[120px] sm:blur-[180px]" />
          <div className="relative w-[260px] sm:w-[320px] animate-[float_6s_ease-in-out_infinite]">
            <div className="overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 bg-zinc-950 p-[2px] shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
              <Image
                src="/projects/music-player/textures/tela_player.webp"
                alt="Music Player Architecture Showcase"
                width={400}
                height={850}
                className="block w-full h-auto rounded-[2.3rem] sm:rounded-[2.8rem]"
                priority
                sizes="(max-width: 640px) 260px, 320px"
              />
              <div className="absolute inset-0 rounded-[2.3rem] sm:rounded-[2.8rem] bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0" />
            </div>
          </div>
        </div>

        {/* FINAL MESSAGE */}
        <div className="flex flex-col items-center px-2">
          <span className="mb-4 sm:mb-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Final Showcase // Production Grade
          </span>

          <h2 className="max-w-5xl text-4xl font-bold leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl md:text-8xl lg:text-[9rem]">
            Built for
            <br />
            people who
            <br />
            truly listen.
          </h2>

          <p className="mt-6 sm:mt-10 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-zinc-500 font-light">
            A cinematic local-first music experience engineered with immersive
            motion, scalable architecture and high-fidelity performance.
          </p>
        </div>

        {/* CTA SECTION */}
        <div className="mt-16 sm:mt-32 flex flex-col items-center w-full">
          <p className="font-mono text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-[0.4em] mb-6 sm:mb-8">
            Technical Access & Inquiry
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none">
            <button
              onClick={() => router.push("/contact")}
              className="group relative w-full sm:w-auto px-10 py-4 sm:px-12 sm:py-5 bg-white text-black rounded-full font-bold text-xs sm:text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10">Start a Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <div className="flex items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => {
                  setCurrentSlide(0);
                  setIsPlaying(true);
                  setIsDemoOpen(true);
                }}
                className="flex-1 sm:flex-none px-6 py-4 sm:px-8 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 rounded-full transition-all duration-500 bg-white/[0.02] backdrop-blur-md"
                aria-label="Open demo slideshow"
              >
                Watch Demo
              </button>

              <button
                onClick={() => window.open("https://github.com/vanderlei-vidor", "_blank")}
                className="px-4 py-4 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-200 transition-all duration-500"
                aria-label="View source code on GitHub"
              >
                &lt;Source /&gt;
              </button>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="mt-12 sm:mt-16 text-zinc-700 hover:text-zinc-400 text-[10px] sm:text-xs font-mono transition-colors tracking-tighter"
            aria-label="Back to home page"
          >
            [ Back to Home ]
          </button>
        </div>
      </div>

      {/* --- 🔥 MODAL INTERATIVO AAA (CORRIGIDO E OTIMIZADO) --- */}
      {isDemoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 md:p-12 animate-in fade-in duration-500"
          onClick={() => setIsDemoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Demo slideshow"
        >
          <div
            className="relative w-full max-w-6xl flex flex-col md:block md:aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_0_100px_rgba(0,0,0,1)]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >

            {/* LINHA DE PROGRESSO SUPERIOR */}
            {isPlaying && (
              <div
                key={currentSlide}
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 z-50 origin-left"
                style={{
                  animation: `progressLinear ${SLIDE_DURATION}ms linear forwards`,
                }}
              />
            )}

            {/* HEADER METADATA */}
            <div className="absolute top-0 left-0 w-full p-3 sm:p-4 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent z-50">
              <span className="font-mono text-[8px] sm:text-[9px] text-white/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase flex items-center gap-1.5">
                <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${isPlaying ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`} />
                Telemetry // Stage_0{currentSlide + 1}
              </span>
              <button
                onClick={() => setIsDemoOpen(false)}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all font-mono text-[9px] sm:text-[10px]"
                aria-label="Close demo"
              >
                ESC
              </button>
            </div>

            {/* ✅ CORREÇÃO: Container da imagem com object-contain SEMPRE */}
            <div className="relative w-full aspect-video md:absolute md:inset-0 md:h-full md:w-full flex items-center justify-center bg-black">
              <Image
                src={musicPlayerSlides[currentSlide].src}
                alt={musicPlayerSlides[currentSlide].title}
                fill
                priority={currentSlide === 0}
                className="object-contain animate-in fade-in zoom-in-95 duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* FOOTER DO MODAL */}
            <div className="relative md:absolute md:bottom-0 md:left-0 w-full p-4 sm:p-6 md:p-8 bg-zinc-950 md:bg-gradient-to-t md:from-black md:via-black/95 md:to-transparent z-40 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 border-t border-white/5 md:border-none">

              {/* TEXTO EXPLICATIVO */}
              <div className="max-w-2xl text-left">
                <h3 className="text-base sm:text-lg md:text-2xl font-bold tracking-tight text-white animate-in slide-in-from-bottom-2 duration-500">
                  {musicPlayerSlides[currentSlide].title}
                </h3>
                <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs md:text-sm text-zinc-400 font-light leading-relaxed line-clamp-3 md:line-clamp-none animate-in slide-in-from-bottom-3 duration-500">
                  {musicPlayerSlides[currentSlide].description}
                </p>
              </div>

              {/* DOCK DOS CONTROLES */}
              <div className="flex items-center justify-center gap-4 bg-white/[0.02] sm:bg-white/[0.03] border border-white/5 backdrop-blur-md px-4 py-2 sm:py-2.5 rounded-full self-stretch sm:self-center md:self-end">
                <button
                  onClick={prevSlide}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? <Pause size={12} fill="black" /> : <Play size={12} fill="black" />}
                </button>

                <button
                  onClick={nextSlide}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>

                <div className="h-4 w-[1px] bg-white/10 mx-0.5" />

                {/* Bullets */}
                <div className="flex gap-1">
                  {musicPlayerSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                        index === currentSlide ? "w-3 sm:w-4 bg-blue-500" : "w-1 sm:w-1.5 bg-zinc-600"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
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