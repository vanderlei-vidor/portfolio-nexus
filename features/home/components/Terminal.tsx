"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslation } from "@/shared/i18n/useTranslation";

const Terminal = memo(function Terminal() {
  const { locale, t } = useTranslation();
  const [output, setOutput] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    setOutput([
      t("terminal.initial1"),
      t("terminal.initial2"),
      t("terminal.initial3"),
    ]);
  }, [locale, t]);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(currentSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !terminalRef.current) return;

    const timeoutId = setTimeout(() => {
      animationRef.current = gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 25, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      animationRef.current?.kill();
    };
  }, [isVisible]);

  useEffect(() => {
    if (!outputRef.current) return;

    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    });
  }, [output]);

  const handleCommand = useCallback((cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const responses: string[] = [`> ${cmd}`];

    switch (cleanCmd) {
      case "projects":
        responses.push(
          t("terminal.projectsTitle"),
          "  - Music Player [Multi-platform / Offline Experience]",
          "  - English Tutor [AI-Driven / Gamified Learning]",
          "  - SaaS Data Control [Native Data Platform]",
          "  - Portfolio Nexus [Premium Ecosystem]"
        );
        break;

      case "about":
        responses.push(
          t("terminal.aboutTitle"),
          "-------------------------------------------",
          t("terminal.capabilities"),
          "  - Architecture: Multi-platform ecosystems (Web, Mobile, Desktop)",
          "  - Intelligence: AI-integrated interfaces & Gamified logic",
          "  - Efficiency: High-concurrency multitasking architectures",
          "  - Motion: Cinematic UX (GSAP/Framer) & Math-based physics",
          "  - Performance: Next.js / Edge Runtime / Zero-latency focus",
          "-------------------------------------------",
          t("terminal.status")
        );
        break;

      case "contact":
        responses.push(
          t("terminal.contactTitle"),
          "  - Email: vanderleividor1@gmail.com",
          "  - LinkedIn: /in/vanderlei-vidor",
          "  - GitHub: /vanderlei-vidor"
        );
        break;

      case "help":
        responses.push(
          t("terminal.helpTitle"),
          "  - projects, about, contact, clear, help"
        );
        break;

      case "clear":
        setOutput([]);
        return;

      default:
        responses.push(`${t("terminal.unknown")} '${cmd}'`, t("terminal.unknownHelp"));
    }

    setOutput((previousOutput) => [...previousOutput, ...responses]);
  }, [t]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const target = event.currentTarget;
      const value = target.value.trim();
      if (value) {
        handleCommand(value);
        target.value = "";
      }
    }
  }, [handleCommand]);

  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24"
      aria-label={t("terminal.label")}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-75 w-150 -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px] will-change-transform"
        aria-hidden="true"
      />

      <div className="mx-auto mb-10 max-w-4xl text-center">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600">
          {t("terminal.badge")}
        </span>
        <div className="mx-auto h-px w-12 bg-zinc-800" />
      </div>

      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="relative mx-auto max-w-4xl cursor-text overflow-hidden rounded-lg border border-white/10 bg-black/44 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md transition-opacity duration-300"
        style={{
          willChange: isVisible ? "transform, opacity" : "auto",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] opacity-[0.03]"
          aria-hidden="true"
        />

        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-5 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            main_shell
          </span>
          <div className="w-10" aria-hidden="true" />
        </div>

        <div
          ref={outputRef}
          className="h-96 overflow-y-auto p-8 font-mono text-[13px] leading-relaxed [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="log"
          aria-live="polite"
          aria-label={t("terminal.output")}
        >
          {output.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className={`mb-1.5 ${
                line.startsWith(">") ? "font-bold text-white" :
                line.includes("ERROR") || line.includes("ERRO") ? "text-red-500/90" :
                line.includes("---") ? "opacity-20" : "text-emerald-500/80"
              }`}
            >
              {line}
            </div>
          ))}

          <div className="mt-4 flex items-center">
            <span className="mr-2 text-emerald-500 opacity-50" aria-hidden="true">$</span>
            <input
              ref={inputRef}
              type="text"
              className="min-w-0 flex-1 bg-transparent text-white caret-emerald-500 outline-none placeholder:text-zinc-700"
              spellCheck={false}
              aria-label={t("terminal.input")}
              placeholder={t("terminal.placeholder")}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Terminal;
