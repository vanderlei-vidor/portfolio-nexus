"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { musicPlayerContent } from "../../content";

const slideImages = [
  "/projects/music-player/textures/tela_temas.webp",
  "/projects/music-player/textures/tela_inicial.webp",
  "/projects/music-player/textures/tela_name.webp",
  "/projects/music-player/textures/tela_menu_lateral.webp",
  "/projects/music-player/textures/tela_player.webp",
  "/projects/music-player/textures/tela_sleep_timer.webp",
  "/projects/music-player/textures/tela_playlist.webp",
  "/projects/music-player/textures/tela_inicial_playlist_personalizada.webp",
  "/projects/music-player/textures/tela_gapless.webp",
  "/projects/music-player/textures/tela_equalizador.webp",
  "/projects/music-player/textures/tela_criar_nova_playlist.webp",
  "/projects/music-player/textures/tela_inicial_tema_orange.webp",
  "/projects/music-player/textures/menu_velocidades.webp",
  "/projects/music-player/textures/menu_lateral_player.webp",
];

const slideDuration = 4000;

export default function FinalShowcase() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const content = musicPlayerContent[locale].final;
  const slides = content.slides;

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const nextSlide = useCallback(() => {
    setCurrentSlide((previousSlide) => (previousSlide === slideImages.length - 1 ? 0 : previousSlide + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((previousSlide) => (previousSlide === 0 ? slideImages.length - 1 : previousSlide - 1));
  }, []);

  useEffect(() => {
    if (isDemoOpen && isPlaying) {
      timerRef.current = setInterval(nextSlide, slideDuration);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isDemoOpen, isPlaying, nextSlide]);

  useEffect(() => {
    if (!isDemoOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
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
          event.preventDefault();
          setIsPlaying((previousValue) => !previousValue);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDemoOpen, prevSlide, nextSlide]);

  useEffect(() => {
    document.body.style.overflow = isDemoOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDemoOpen]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    touchEndX.current = event.touches[0].clientX;
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

  const activeSlide = slides[currentSlide];

  return (
    <section id="final-showcase" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-24 sm:px-6 sm:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_60%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light" style={{ backgroundImage: "url('/textures/noise-webp.webp')" }} aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[150px] sm:h-225 sm:w-225 sm:blur-[220px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <div className="relative mb-12 sm:mb-24">
          <div className="absolute inset-0 -z-10 rounded-full bg-violet-500/20 blur-[120px] sm:blur-[180px]" aria-hidden="true" />
          <div className="relative w-65 animate-[float_6s_ease-in-out_infinite] sm:w-[320px]">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 p-0.5 shadow-[0_40px_120px_rgba(0,0,0,0.9)] sm:rounded-[3rem]">
              <Image
                src="/projects/music-player/textures/tela_player.webp"
                alt="Music Player"
                width={400}
                height={850}
                className="block h-auto w-full rounded-[2.3rem] sm:rounded-[2.8rem]"
                priority
                sizes="(max-width: 640px) 260px, 320px"
              />
              <div className="absolute inset-0 rounded-[2.3rem] bg-linear-to-tr from-white/0 via-white/5 to-white/0 sm:rounded-[2.8rem]" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-2">
          <span className="mb-4 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 sm:mb-6 sm:text-[10px]">
            {content.badge}
          </span>

          <h2 className="max-w-5xl text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.95] tracking-[-0.06em] text-white">
            {content.titleLine1}
            <br />
            {content.titleLine2}
            <br />
            {content.titleLine3}
          </h2>

          <p className="mt-6 max-w-2xl text-xs font-light leading-relaxed text-zinc-400 sm:mt-10 sm:text-sm md:text-base">
            {content.description}
          </p>
        </div>

        <div className="mt-16 flex w-full flex-col items-center sm:mt-32">
          <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600 sm:mb-8 sm:text-[10px]">
            {content.inquiry}
          </p>

          <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row sm:gap-6">
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="group relative w-full overflow-hidden rounded-full bg-white px-10 py-4 text-xs font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 hover:scale-105 active:scale-95 sm:w-auto sm:px-12 sm:py-5 sm:text-sm"
            >
              <span className="relative z-10">{t("contact.startProject")}</span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" aria-hidden="true" />
            </button>

            <div className="flex w-full items-center justify-center gap-4 sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setCurrentSlide(0);
                  setIsPlaying(true);
                  setIsDemoOpen(true);
                }}
                className="flex-1 rounded-full border border-white/5 bg-white/2 px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-zinc-400 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:text-white sm:flex-none sm:px-8 sm:text-xs"
                aria-label={t("projects.watchDemo")}
              >
                {t("projects.watchDemo")}
              </button>

              <button
                type="button"
                onClick={() => window.open("https://github.com/vanderlei-vidor", "_blank")}
                className="px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500 transition-all duration-500 hover:text-zinc-200 sm:text-xs"
                aria-label={t("projects.source")}
              >
                &lt;{t("projects.source")} /&gt;
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-12 font-mono text-[10px] tracking-tighter text-zinc-700 transition-colors hover:text-zinc-400 sm:mt-16 sm:text-xs"
            aria-label={t("projects.backToHome")}
          >
            [ {t("projects.backToHome")} ]
          </button>
        </div>
      </div>

      {isDemoOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-3 backdrop-blur-4xl animate-in fade-in duration-500 sm:p-6 md:p-12"
          onClick={() => setIsDemoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={content.modalLabel}
        >
          <div
            className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_0_100px_rgba(0,0,0,1)] md:block md:aspect-video md:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isPlaying && (
              <div
                key={currentSlide}
                className="absolute left-0 top-0 z-50 h-0.5 origin-left bg-linear-to-r from-blue-500 to-indigo-500"
                style={{ animation: `progressLinear ${slideDuration}ms linear forwards` }}
                aria-hidden="true"
              />
            )}

            <div className="absolute left-0 top-0 z-50 flex w-full items-center justify-between bg-linear-to-b from-black/90 to-transparent p-3 sm:p-4">
              <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.3em] text-white/40 sm:text-[9px] sm:tracking-[0.4em]">
                <span className={`h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5 ${isPlaying ? "bg-blue-500 animate-pulse" : "bg-amber-500"}`} aria-hidden="true" />
                Telemetry {"//"} Stage_0{currentSlide + 1}
              </span>
              <button
                type="button"
                onClick={() => setIsDemoOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] text-white/50 transition-all hover:bg-white/10 hover:text-white sm:text-[10px]"
                aria-label={t("projects.closeDemo")}
              >
                ESC
              </button>
            </div>

            <div className="relative flex aspect-video w-full items-center justify-center bg-black md:absolute md:inset-0 md:h-full">
              <Image
                src={slideImages[currentSlide]}
                alt={activeSlide.title}
                fill
                priority={currentSlide === 0}
                className="object-contain animate-in fade-in zoom-in-95 duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 hidden bg-linear-to-t from-black via-transparent to-black/20 pointer-events-none md:block" aria-hidden="true" />
            </div>

            <div className="relative z-40 flex w-full flex-col justify-between gap-4 border-t border-white/5 bg-zinc-950 p-4 md:absolute md:bottom-0 md:left-0 md:flex-row md:items-end md:border-none md:bg-linear-to-t md:from-black md:via-black/95 md:to-transparent md:p-8">
              <div className="max-w-2xl text-left">
                <h3 className="text-base font-bold tracking-tight text-white animate-in slide-in-from-bottom-2 duration-500 sm:text-lg md:text-2xl">
                  {activeSlide.title}
                </h3>
                <p className="mt-1 line-clamp-3 text-[11px] font-light leading-relaxed text-zinc-400 animate-in slide-in-from-bottom-3 duration-500 sm:mt-2 sm:text-xs md:line-clamp-none md:text-sm">
                  {activeSlide.description}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 self-stretch rounded-full border border-white/5 bg-white/2 px-4 py-2 backdrop-blur-md sm:self-center sm:bg-white/3 sm:py-2.5 md:self-end">
                <button type="button" onClick={prevSlide} className="p-1 text-zinc-400 transition-colors hover:text-white" aria-label={t("projects.previousSlide")}>
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-full bg-white p-2 text-black transition-all hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? t("projects.pauseSlideshow") : t("projects.playSlideshow")}
                >
                  {isPlaying ? <Pause size={12} fill="black" aria-hidden="true" /> : <Play size={12} fill="black" aria-hidden="true" />}
                </button>

                <button type="button" onClick={nextSlide} className="p-1 text-zinc-400 transition-colors hover:text-white" aria-label={t("projects.nextSlide")}>
                  <ChevronRight size={16} aria-hidden="true" />
                </button>

                <div className="mx-0.5 h-4 w-px bg-white/10" aria-hidden="true" />

                <div className="flex gap-1">
                  {slideImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1 rounded-full transition-all duration-500 sm:h-1.5 ${index === currentSlide ? "w-3 bg-blue-500 sm:w-4" : "w-1 bg-zinc-600 sm:w-1.5"}`}
                      aria-label={`${t("projects.goToSlide")} ${index + 1}`}
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
