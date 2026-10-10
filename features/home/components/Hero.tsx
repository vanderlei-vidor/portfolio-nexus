"use client";

import { useEffect, useState, useCallback, useRef, memo } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { withBasePath } from "@/shared/lib/public-path";
import { ArrowDown, ArrowUpRight, FileText, Mail, Download, CheckCircle2 } from "lucide-react";

// Carrega os efeitos interativos apenas no cliente e sob demanda idle
const HeroInteractiveLayer = dynamic(() => import("./HeroInteractiveLayer"), {
  ssr: false,
});

const Hero = memo(function Hero() {
  const lenis = useLenis();
  const [shouldActivateEffects, setShouldActivateEffects] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { locale, t } = useTranslation();

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

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const scrollToProjects = useCallback(() => {
    lenis?.scrollTo("#selected-projects", {
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }, [lenis]);

  const handleDownloadClick = useCallback(() => {
    setShowToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToast(false), 3200);
  }, []);

  const resumeConfig = {
    pt: {
      url: withBasePath("/resume-pt.pdf"),
      fileName: "Vanderlei_Vidor_Curriculo.pdf",
    },
    es: {
      url: withBasePath("/resume-es.pdf"),
      fileName: "Vanderlei_Vidor_Curriculum.pdf",
    },
    en: {
      url: withBasePath("/resume-en.pdf"),
      fileName: "Vanderlei_Vidor_Resume.pdf",
    },
  }[locale] || {
    url: withBasePath("/resume-en.pdf"),
    fileName: "Vanderlei_Vidor_Resume.pdf",
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center px-[clamp(1.25rem,4vw,6rem)] relative overflow-hidden bg-black"
      aria-label="Hero section"
      aria-labelledby="home-hero-title"
    >
      {/* Inline styles keep the hero animation immediate and consistent. */}
      <style>{`
        @keyframes heroFadeInUp {
          from { transform: translateY(8px); }
          to { transform: translateY(0); }
        }
        .animate-hero-text {
          animation: heroFadeInUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-hero-text {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Camada pesada ativada via IDLE para não travar a renderização inicial */}
      {shouldActivateEffects && <HeroInteractiveLayer />}

      {/* 1. Availability Badge */}
      <div
        className="animate-hero-text inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-[clamp(1.5rem,3vw,2.5rem)]"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[clamp(0.65rem,1vw,0.75rem)] font-mono uppercase tracking-[0.25em] text-zinc-400">
          {t("hero.badge")}
        </span>
      </div>

      {/* 2. Identity: Name (H1) */}
      <div className="animate-hero-text">
        <h1
          id="home-hero-title"
          className="font-black tracking-tight leading-[0.88] text-white text-[clamp(2.75rem,8.5vw,7.5rem)] uppercase"
        >
          {t("hero.name")}
        </h1>

        {/* 3. Role & Tagline */}
        <div className="mt-4 sm:mt-5 flex flex-col items-center gap-1.5">
          <p className="text-[clamp(1.05rem,2.2vw,1.65rem)] font-mono font-medium tracking-wide text-zinc-300">
            {t("hero.role")}
          </p>
          <p className="text-[clamp(0.95rem,1.8vw,1.35rem)] font-semibold tracking-wide text-zinc-400">
            {t("hero.tagline")}
          </p>
        </div>
      </div>

      {/* 4. Positioning Subtitle */}
      <div className="mt-fluid-gap-sm max-w-[56ch] animate-hero-text">
        <p className="text-sm leading-relaxed text-zinc-400 sm:text-base md:text-lg font-light">
          {t("hero.subtitle")}
        </p>
      </div>

      {/* 5. Primary CTAs (Explore Cases · Contact Me) */}
      <div
        className="mt-[clamp(2rem,4vw,3.5rem)] flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto animate-hero-text"
      >
        <button
          onClick={scrollToProjects}
          className="premium-button premium-button--primary w-full sm:w-auto px-[clamp(1.75rem,3vw,3rem)] py-[clamp(0.9rem,2vw,1.25rem)] text-fluid-btn font-bold cursor-pointer"
          aria-label={t("hero.exploreWork")}
        >
          <span>{t("hero.exploreWork")}</span>
          <ArrowDown className="w-4 h-4 ml-1" aria-hidden="true" />
        </button>

        <span className="hidden sm:inline text-zinc-600 font-bold" aria-hidden="true">·</span>

        <Link
          href="/contact"
          className="premium-button premium-button--secondary w-full sm:w-auto px-[clamp(1.75rem,3vw,3rem)] py-[clamp(0.9rem,2vw,1.25rem)] text-fluid-btn font-semibold"
          aria-label={t("hero.contactMe")}
        >
          <span>{t("hero.contactMe")}</span>
          <ArrowUpRight className="w-4 h-4 ml-1 text-zinc-400" aria-hidden="true" />
        </Link>
      </div>

      {/* 6. Recruiter Fast-Track (Resume (PDF) · GitHub · LinkedIn · Email) */}
      <div
        className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-xs sm:text-sm font-mono text-zinc-400 animate-hero-text"
        aria-label="Professional profiles and contact"
      >
        {/* Resume Group: Preview in new tab + Explicit Download */}
        <div className="premium-surface inline-flex items-center rounded-lg p-0.5 text-zinc-300">
          <a
            href={resumeConfig.url}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-link inline-flex items-center gap-1.5 px-2.5 py-1 hover:text-white"
            title={`${t("hero.resume")} - Abrir em nova aba`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>{t("hero.resume")}</span>
          </a>

          <span className="h-3 w-px bg-white/10" aria-hidden="true" />

          <a
            href={resumeConfig.url}
            download={resumeConfig.fileName}
            onClick={handleDownloadClick}
            className="premium-link inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 hover:bg-white/[0.05] hover:text-emerald-400"
            title={t("hero.resumeDownload")}
            aria-label={`${t("hero.resumeDownload")}: ${resumeConfig.fileName}`}
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <span className="text-zinc-700" aria-hidden="true">·</span>

        <a
          href="https://github.com/vanderlei-vidor"
          target="_blank"
          rel="noopener noreferrer"
          className="premium-link inline-flex items-center gap-1.5 hover:text-white"
          title="GitHub Profile"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub</span>
        </a>

        <span className="text-zinc-700" aria-hidden="true">·</span>

        <a
          href="https://linkedin.com/in/vanderlei-vidor-979593410"
          target="_blank"
          rel="noopener noreferrer"
          className="premium-link inline-flex items-center gap-1.5 hover:text-white"
          title="LinkedIn Profile"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span>LinkedIn</span>
        </a>

        <span className="text-zinc-700" aria-hidden="true">·</span>

        <a
          href="mailto:vanderleividor1@gmail.com"
          className="premium-link inline-flex items-center gap-1.5 hover:text-white"
          title="Email"
        >
          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t("hero.email")}</span>
        </a>
      </div>

      {/* Toast Feedback */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/95 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono shadow-2xl backdrop-blur-md pointer-events-none transition-all"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>{t("hero.resumeToast")}</span>
        </div>
      )}
    </section>
  );
});

export default Hero;
