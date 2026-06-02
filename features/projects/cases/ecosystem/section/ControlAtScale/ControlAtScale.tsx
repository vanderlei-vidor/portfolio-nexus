"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Cpu, Shield, Zap } from "lucide-react";
import "./ControlAtScale.css";

gsap.registerPlugin(ScrollTrigger);

// Gerar pontos aleatórios para sparklines
const generateSparklineData = (points: number = 20) => {
  return Array.from({ length: points }, (_, i) => ({
    x: (i / (points - 1)) * 100,
    y: 50 + Math.sin(i * 0.5) * 30 + Math.random() * 20,
  }));
};

export default function ControlAtScale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const [sparklines, setSparklines] = useState([
    generateSparklineData(),
    generateSparklineData(),
    generateSparklineData(),
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. LASER SCANNER COM TRAIL ELABORADO
      gsap.fromTo(
        scannerRef.current,
        { translateY: "-100%" },
        {
          translateY: "100vh",
          duration: 4,
          repeat: -1,
          ease: "none",
        }
      );

      // 2. DATA STREAM FALLING (Matrix effect)
      gsap.to(".data-stream", {
        y: "100vh",
        duration: 8,
        repeat: -1,
        ease: "none",
        stagger: {
          each: 0.3,
          from: "random",
        },
      });

      // 3. RADAR RINGS EXPANDING
      gsap.to(".radar-ring", {
        scale: 2,
        opacity: 0,
        duration: 3,
        repeat: -1,
        ease: "power1.out",
        stagger: 1,
      });

      // 4. BOOT TIMELINE
      const bootTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      bootTimeline
        .fromTo(
          ".ecosystem-label",
          { opacity: 0, letterSpacing: "0.1em" },
          { opacity: 1, letterSpacing: "0.45em", duration: 1, ease: "power3.out" }
        )
        .fromTo(
          ".control-title",
          { opacity: 0, y: 50, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power4.out" },
          "-=0.6"
        )
        .fromTo(
          ".hud-grid-bg",
          { opacity: 0, scale: 0.95 },
          { opacity: 0.15, scale: 1, duration: 1.5, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".telemetry-card",
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)" },
          "-=1"
        )
        .fromTo(
          ".sparkline-path",
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, duration: 2, stagger: 0.2, ease: "power2.out" },
          "-=0.5"
        );

      // 5. TELEMETRIA DINÂMICA
      const liveElements = document.querySelectorAll(".live-data");
      const interval = setInterval(() => {
        liveElements.forEach((el: any) => {
          const base = parseFloat(el.getAttribute("data-base"));
          const variance = parseFloat(el.getAttribute("data-variance"));
          const randomValue = (base + (Math.random() * variance - variance / 2)).toFixed(1);
          el.innerText = randomValue;
        });

        // Atualizar sparklines
        setSparklines([
          generateSparklineData(),
          generateSparklineData(),
          generateSparklineData(),
        ]);
      }, 800);

      return () => clearInterval(interval);
    }, container);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      icon: Activity,
      tag: "SYSTEM LATENCY",
      base: 14.2,
      variance: 2.5,
      unit: "ms",
      description: "Real-time edge processing nodes routing synchronization across multiple servers.",
      status: "online",
      terminal: "sys.monitor --live",
    },
    {
      icon: Cpu,
      tag: "CORE THROUGHPUT",
      base: 98.7,
      variance: 1.2,
      unit: "%",
      description: "Automated resource isolation and dynamic scaling under enterprise traffic stress.",
      status: "processing",
      terminal: "cpu.scale --auto",
      featured: true,
    },
    {
      icon: Shield,
      tag: "SECURITY INDEX",
      base: 99.9,
      variance: 0.1,
      unit: "🛡️",
      description: "Cryptographic identity tokens validating state mutations instantly at scale.",
      status: "secure",
      terminal: "sec.verify --token",
    },
  ];

  return (
    <section className="ecosystem-section" ref={containerRef}>
      {/* Background Layers */}
      <div className="hud-grid-bg" />
      <div className="noise-overlay" />
      
      {/* Data Stream (Matrix effect) */}
      <div className="data-stream-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="data-stream" style={{ left: `${(i / 15) * 100}%` }}>
            {Array.from({ length: 20 }).map((_, j) => (
              <span key={j} className="data-char">
                {Math.random() > 0.5 ? "1" : "0"}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Laser Scanner com Trail */}
      <div className="laser-scanner" ref={scannerRef}>
        <div className="laser-core" />
        <div className="laser-trail" />
      </div>

      {/* Radar Rings */}
      <div className="radar-container">
        <div className="radar-ring radar-ring-1" />
        <div className="radar-ring radar-ring-2" />
        <div className="radar-ring radar-ring-3" />
      </div>

      <div className="ecosystem-container">
        {/* Header */}
        <div className="ecosystem-header">
          <span className="ecosystem-label">
            <span className="label-dot" />
            MISSION CONTROL
            <span className="label-version">v3.2.1</span>
          </span>

          <h2 className="control-title">
            Control.
            <br />
            <span className="glow-text">At Scale.</span>
          </h2>
        </div>

        {/* Console */}
        <div className="control-console">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const sparklineData = sparklines[index];
            const pathData = sparklineData
              .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`)
              .join(" ");

            return (
              <article
                key={card.tag}
                className={`telemetry-card ${card.featured ? "featured-card" : ""}`}
              >
                {/* HUD Corners */}
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />

                {/* Header do Card */}
                <div className="card-header">
                  <div className="card-icon-wrapper">
                    <Icon className="card-icon" size={20} />
                  </div>
                  <div className={`card-status-dot ${card.status}`} />
                </div>

                <span className="card-tag">{card.tag}</span>

                {/* Métrica */}
                <div className="card-metric">
                  <span className="live-data" data-base={card.base} data-variance={card.variance}>
                    {card.base}
                  </span>
                  <span className="unit">{card.unit}</span>
                </div>

                {/* Sparkline */}
                <div className="sparkline-container">
                  <svg className="sparkline-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                      </linearGradient>
                    </defs>
                    <path
                      className="sparkline-path"
                      d={pathData}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className="sparkline-area"
                      d={`${pathData} L 100 100 L 0 100 Z`}
                      fill={`url(#gradient-${index})`}
                    />
                  </svg>
                </div>

                <p>{card.description}</p>

                {/* Terminal Prompt */}
                <div className="card-terminal">
                  <span className="terminal-prompt">$</span>
                  <span className="terminal-command">{card.terminal}</span>
                  <span className="terminal-cursor">▊</span>
                </div>

                <div className="card-glitch-line" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}