"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Brain, ChevronLeft, ChevronRight, Globe2, Pause, Play, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { FutureVisionOrb } from "../../components/FutureVisionOrb/FutureVisionOrb";
import { englishTutorContent } from "../../content";
import styles from "./ProjectVisionSection.module.css";

const slideImage = "/projects/english-tutor/textures/english-tutor-screen.webp";
const slideDuration = 4000;

function getPillarIcon(icon: "brain" | "zap" | "globe") {
  const props = { size: 30, strokeWidth: 1.7, "aria-hidden": true };

  if (icon === "brain") return <Brain {...props} />;
  if (icon === "zap") return <Zap {...props} />;

  return <Globe2 {...props} />;
}

export function ProjectVisionSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();
  const content = englishTutorContent[locale].vision;
  const slides = useMemo(
    () => content.slides.map((slide) => ({ ...slide, src: slideImage })),
    [content.slides],
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const openDemo = () => {
    setCurrentSlide(0);
    setIsPlaying(true);
    setIsDemoOpen(true);
  };

  const closeDemo = useCallback(() => {
    setIsDemoOpen(false);
  }, []);

  useEffect(() => {
    if (!isDemoOpen || !isPlaying) return;

    const timer = window.setInterval(nextSlide, slideDuration);

    return () => window.clearInterval(timer);
  }, [isDemoOpen, isPlaying, nextSlide]);

  useEffect(() => {
    if (!isDemoOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDemoOpen]);

  useEffect(() => {
    if (!isDemoOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDemo();
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === " ") {
        event.preventDefault();
        setIsPlaying((current) => !current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDemo, isDemoOpen, nextSlide, prevSlide]);

  return (
    <section className={styles.section} aria-labelledby="english-tutor-vision-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>
        <h2 id="english-tutor-vision-title" className={styles.title}>
          {content.titleLine1}
          <br />
          {content.titleLine2}
        </h2>
        <p className={styles.subtitle}>{content.subtitle}</p>
      </div>

      <div className={styles.orbWrapper} aria-hidden="true">
        <FutureVisionOrb />
      </div>

      <div className={styles.pillars}>
        {content.pillars.map((pillar) => (
          <article key={pillar.title} className={styles.pillar}>
            <span className={styles.icon}>{getPillarIcon(pillar.icon)}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.desc}</p>
          </article>
        ))}
      </div>

      <div className={styles.finalQuote}>
        <p>{content.quoteLine1}</p>
        <span>{content.quoteLine2}</span>
      </div>

      <div className="mt-24 flex flex-col items-center gap-8 px-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/contact")}
            className="group relative overflow-hidden rounded-full bg-white px-12 py-5 text-sm font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">{t("contact.startProject")}</span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>

          <button
            type="button"
            onClick={openDemo}
            className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-white/20 hover:bg-white/10 active:scale-95"
          >
            {t("projects.watchShowcase")}
          </button>

          <button
            type="button"
            onClick={() => window.open("https://github.com/vanderlei-vidor", "_blank", "noopener,noreferrer")}
            className="px-6 py-4 font-mono text-sm text-zinc-500 transition-colors hover:text-white"
          >
            &lt;{t("projects.source")} /&gt;
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="mt-16 font-mono text-xs tracking-tight text-zinc-700 transition-colors hover:text-zinc-400"
      >
        [ {t("projects.backToHome")} ]
      </button>

      {isDemoOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl duration-500 animate-in fade-in md:p-10"
          onClick={closeDemo}
          role="dialog"
          aria-modal="true"
          aria-label={content.modalLabel}
        >
          <div
            className="relative flex aspect-video w-full max-w-5xl flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            onClick={(event) => event.stopPropagation()}
          >
            {isPlaying && (
              <div
                key={currentSlide}
                className="absolute left-0 top-0 z-50 h-0.5 origin-left bg-linear-to-r from-violet-500 to-fuchsia-500"
                style={{ animation: `progressLinear ${slideDuration}ms linear forwards` }}
              />
            )}

            <div className="absolute left-0 top-0 z-40 flex w-full items-center justify-between bg-linear-to-b from-black/80 via-black/40 to-transparent p-4">
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-400">
                <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? "animate-pulse bg-emerald-500" : "bg-amber-500"}`} />
                Showcase_Module // Slide_0{currentSlide + 1}_of_0{slides.length}
              </span>
              <button
                type="button"
                onClick={closeDemo}
                className="rounded-full border border-white/5 bg-white/5 px-4 py-1.5 font-mono text-[10px] text-zinc-400 transition-all hover:bg-white hover:text-black"
                aria-label={t("projects.closeDemo")}
              >
                EXIT (ESC)
              </button>
            </div>

            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].title}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover duration-500 animate-in fade-in zoom-in-95"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-transparent to-black/20" />
            </div>

            <div className="absolute bottom-0 left-0 z-40 flex w-full flex-col justify-between gap-6 bg-linear-to-t from-black via-black/90 to-transparent p-6 md:flex-row md:items-end md:p-8">
              <div className="max-w-2xl text-left">
                <h3 className="text-xl font-bold tracking-tight text-white duration-500 animate-in slide-in-from-bottom-2 md:text-2xl">
                  {slides[currentSlide].title}
                </h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-zinc-400 duration-500 animate-in slide-in-from-bottom-3 md:text-sm">
                  {slides[currentSlide].description}
                </p>
              </div>

              <div className="flex items-center gap-4 self-center rounded-full border border-white/5 bg-white/3 px-4 py-2.5 backdrop-blur-md md:self-end">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="p-1 text-zinc-400 transition-colors hover:text-white"
                  title={t("projects.previousSlide")}
                  aria-label={t("projects.previousSlide")}
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying((current) => !current)}
                  className="rounded-full bg-white p-2 text-black transition-all hover:scale-105 active:scale-95"
                  title={isPlaying ? t("projects.pauseSlideshow") : t("projects.playSlideshow")}
                  aria-label={isPlaying ? t("projects.pauseSlideshow") : t("projects.playSlideshow")}
                >
                  {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" />}
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  className="p-1 text-zinc-400 transition-colors hover:text-white"
                  title={t("projects.nextSlide")}
                  aria-label={t("projects.nextSlide")}
                >
                  <ChevronRight size={18} />
                </button>

                <div className="mx-1 h-4 w-px bg-white/10" />

                <div className="flex gap-1.5">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        index === currentSlide ? "w-4 bg-violet-500" : "w-1.5 bg-zinc-600 hover:bg-zinc-400"
                      }`}
                      aria-label={`${t("projects.goToSlide")} ${index + 1}`}
                      aria-current={index === currentSlide}
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

export default ProjectVisionSection;
