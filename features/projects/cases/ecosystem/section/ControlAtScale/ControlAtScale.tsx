"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Cpu, Shield } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./ControlAtScale.css";

gsap.registerPlugin(ScrollTrigger);

const streamColumns = Array.from({ length: 15 }, (_, column) => ({
  left: `${(column / 15) * 100}%`,
  chars: Array.from({ length: 20 }, (_, row) => ((column * 17 + row * 11) % 5 > 1 ? "1" : "0")),
}));

const cardIcons = [Activity, Cpu, Shield] as const;
const cardSeeds = [
  { base: 14.2, variance: 2.5 },
  { base: 98.7, variance: 1.2 },
  { base: 99.9, variance: 0.1 },
] as const;

const generateSparklineData = (points: number = 20, seed: number = 1) => Array.from({ length: points }, (_, index) => ({
  x: (index / (points - 1)) * 100,
  y: 50 + Math.sin(index * 0.5 + seed) * 26 + Math.cos(index * 0.37 + seed * 1.7) * 12,
}));

export default function ControlAtScale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const [sparklines] = useState([generateSparklineData(20, 1), generateSparklineData(20, 2), generateSparklineData(20, 3)]);
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].control;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(scannerRef.current, { translateY: "-100%" }, { translateY: "100vh", duration: 4, repeat: -1, ease: "none" });
      gsap.to(".data-stream", { y: "100vh", duration: 8, repeat: -1, ease: "none", stagger: { each: 0.3, from: "random" } });
      gsap.to(".radar-ring", { scale: 2, opacity: 0, duration: 3, repeat: -1, ease: "power1.out", stagger: 1 });

      const bootTimeline = gsap.timeline({ scrollTrigger: { trigger: container, start: "top 75%", toggleActions: "play none none reverse" } });
      bootTimeline
        .fromTo(".ecosystem-label", { opacity: 0, letterSpacing: "0.1em" }, { opacity: 1, letterSpacing: "0.45em", duration: 1, ease: "power3.out" })
        .fromTo(".control-title", { opacity: 0, y: 50, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power4.out" }, "-=0.6")
        .fromTo(".hud-grid-bg", { opacity: 0, scale: 0.95 }, { opacity: 0.15, scale: 1, duration: 1.5, ease: "power2.out" }, "-=0.5")
        .fromTo(".telemetry-card", { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)" }, "-=1")
        .fromTo(".sparkline-path", { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 2, stagger: 0.2, ease: "power2.out" }, "-=0.5");

      const liveElements = container.querySelectorAll<HTMLElement>(".live-data");
      const interval = window.setInterval(() => {
        liveElements.forEach((element) => {
          const base = parseFloat(element.dataset.base ?? "0");
          const variance = parseFloat(element.dataset.variance ?? "0");
          const phase = performance.now() / 900 + base;
          element.innerText = (base + Math.sin(phase) * (variance / 2)).toFixed(1);
        });
      }, 800);

      return () => window.clearInterval(interval);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ecosystem-section" ref={containerRef} aria-labelledby="portfolio-nexus-control-title">
      <div className="hud-grid-bg" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="data-stream-container" aria-hidden="true">
        {streamColumns.map((column, index) => (
          <div key={index} className="data-stream" style={{ left: column.left }}>
            {column.chars.map((char, row) => <span key={row} className="data-char">{char}</span>)}
          </div>
        ))}
      </div>

      <div className="laser-scanner" ref={scannerRef} aria-hidden="true"><div className="laser-core" /><div className="laser-trail" /></div>
      <div className="radar-container" aria-hidden="true"><div className="radar-ring radar-ring-1" /><div className="radar-ring radar-ring-2" /><div className="radar-ring radar-ring-3" /></div>

      <div className="ecosystem-container">
        <div className="ecosystem-header">
          <span className="ecosystem-label"><span className="label-dot" aria-hidden="true" />{content.label}<span className="label-version">v3.2.1</span></span>
          <h2 id="portfolio-nexus-control-title" className="control-title">{content.titleLine1}<br /><span className="glow-text">{content.titleLine2}</span></h2>
        </div>

        <div className="control-console">
          {content.cards.map((card, index) => {
            const Icon = cardIcons[index];
            const seed = cardSeeds[index];
            const pathData = sparklines[index].map((point, pointIndex) => `${pointIndex === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

            return (
              <article key={card.tag} className={`telemetry-card ${"featured" in card && card.featured ? "featured-card" : ""}`}>
                <div className="hud-corner hud-corner-tl" aria-hidden="true" /><div className="hud-corner hud-corner-tr" aria-hidden="true" /><div className="hud-corner hud-corner-bl" aria-hidden="true" /><div className="hud-corner hud-corner-br" aria-hidden="true" />
                <div className="card-header"><div className="card-icon-wrapper" aria-hidden="true"><Icon className="card-icon" size={20} /></div><div className={`card-status-dot ${card.status}`} aria-hidden="true" /></div>
                <span className="card-tag">{card.tag}</span>
                <div className="card-metric"><span className="live-data" data-base={seed.base} data-variance={seed.variance}>{seed.base}</span><span className="unit">{card.unit}</span></div>
                <div className="sparkline-container" aria-hidden="true">
                  <svg className="sparkline-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs><linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" /><stop offset="100%" stopColor="rgba(16, 185, 129, 0)" /></linearGradient></defs>
                    <path className="sparkline-path" d={pathData} fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path className="sparkline-area" d={`${pathData} L 100 100 L 0 100 Z`} fill={`url(#gradient-${index})`} />
                  </svg>
                </div>
                <p>{card.description}</p>
                <div className="card-terminal"><span className="terminal-prompt">$</span><span className="terminal-command">{card.terminal}</span><span className="terminal-cursor">▊</span></div>
                <div className="card-glitch-line" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
