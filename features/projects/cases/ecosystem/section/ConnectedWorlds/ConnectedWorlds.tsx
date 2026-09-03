"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, Brain, Cpu, Eye, LayoutDashboard, Music } from "lucide-react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./ConnectedWorlds.css";

const nodeMeta = [
  { icon: Music, position: "top", color: "cyan", coords: "N 01" },
  { icon: Brain, position: "right", color: "purple", coords: "E 02" },
  { icon: LayoutDashboard, position: "bottom", color: "emerald", coords: "S 03" },
  { icon: Eye, position: "left", color: "amber", coords: "W 04" },
] as const;

const localeMap = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-ES",
} as const;

export default function ConnectedWorlds() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [time, setTime] = useState("");
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].connected;

  useEffect(() => {
    const timer = window.setTimeout(() => setIsRevealed(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString(localeMap[locale], {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, [locale]);

  return (
    <section className={`connected-worlds ${isRevealed ? "is-active" : ""}`} aria-labelledby="portfolio-nexus-connected-title">
      <div className="cw-bg-grid" aria-hidden="true" />
      <div className="cw-bg-nebula cw-bg-nebula-1" aria-hidden="true" />
      <div className="cw-bg-nebula cw-bg-nebula-2" aria-hidden="true" />
      <div className="cw-bg-nebula cw-bg-nebula-3" aria-hidden="true" />
      <div className="cw-bg-stars" aria-hidden="true" />
      <div className="cw-scanline" aria-hidden="true" />

      <div className="cw-hud cw-hud-tl" aria-hidden="true">
        <span className="hud-label">SYS.STATUS</span>
        <span className="hud-value hud-online"><span className="hud-dot" />{content.hud.status}</span>
      </div>

      <div className="cw-hud cw-hud-tr" aria-hidden="true">
        <span className="hud-label">UPLINK</span>
        <span className="hud-value">{time} UTC</span>
      </div>

      <div className="cw-hud cw-hud-bl" aria-hidden="true">
        <span className="hud-label">NETWORK</span>
        <span className="hud-value">{content.hud.network}</span>
      </div>

      <div className="cw-hud cw-hud-br" aria-hidden="true">
        <span className="hud-label">LATENCY</span>
        <span className="hud-value">{content.hud.latency}</span>
      </div>

      <div className="connected-worlds__container">
        <div className="reveal-step-20">
          <span className="connected-worlds__label">
            <span className="label-dot" aria-hidden="true" />
            {content.label}
            <span className="label-version">v2.6.0</span>
          </span>
          <h2 id="portfolio-nexus-connected-title" className="connected-worlds__title">
            <span className="title-word">{content.titleLine1}</span>
            <span className="title-word title-word-gradient">{content.titleAccent1}</span>
            <br />
            <span className="title-word">{content.titleLine2}</span>
            <span className="title-word title-word-gradient-alt">{content.titleAccent2}</span>
          </h2>
        </div>

        <p className="connected-worlds__description reveal-step-35">{content.description}</p>

        <div className="ecosystem-map">
          <div className="ecosystem-orb reveal-step-50">
            <div className="orb-glow orb-glow-outer" aria-hidden="true" />
            <div className="orb-glow orb-glow-inner" aria-hidden="true" />
            <div className="orb-ring orb-ring-1" aria-hidden="true" />
            <div className="orb-ring orb-ring-2" aria-hidden="true" />
            <div className="orb-ring orb-ring-3" aria-hidden="true" />
            <div className="orb-radar" aria-hidden="true" />

            <svg className="orb-circular-text" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="connectedCirclePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
              </defs>
              <text>
                <textPath href="#connectedCirclePath">{content.circularText}</textPath>
              </text>
            </svg>

            <div className="orb-core">
              <div className="orb-core-icon" aria-hidden="true"><Cpu /></div>
              <span className="orb-label">PORTFOLIO</span>
              <strong className="orb-title">NEXUS</strong>
              <span className="orb-status"><span className="orb-status-dot" aria-hidden="true" />{content.coreOnline}</span>
            </div>
          </div>

          <div className="reveal-step-65" aria-hidden="true">
            <svg className="connections-svg" viewBox="0 0 1000 850" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              <line x1="500" y1="425" x2="500" y2="140" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.4" />
              <line x1="500" y1="425" x2="820" y2="425" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.4" />
              <line x1="500" y1="425" x2="500" y2="710" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.4" />
              <line x1="500" y1="425" x2="180" y2="425" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.4" />
              <circle className="data-particle dp-1" r="3" fill="#60a5fa" filter="url(#glow)"><animateMotion dur="3s" repeatCount="indefinite" path="M 500,425 L 500,140" /></circle>
              <circle className="data-particle dp-2" r="3" fill="#a78bfa" filter="url(#glow)"><animateMotion dur="3.5s" repeatCount="indefinite" path="M 500,425 L 820,425" /></circle>
              <circle className="data-particle dp-3" r="3" fill="#10b981" filter="url(#glow)"><animateMotion dur="4s" repeatCount="indefinite" path="M 500,425 L 500,710" /></circle>
              <circle className="data-particle dp-4" r="3" fill="#f59e0b" filter="url(#glow)"><animateMotion dur="3.2s" repeatCount="indefinite" path="M 500,425 L 180,425" /></circle>
            </svg>
          </div>

          {content.nodes.map((node, index) => {
            const meta = nodeMeta[index];
            const Icon = meta.icon;
            return (
              <article
                key={node.title}
                className={`ecosystem-node ecosystem-node--${meta.position} ecosystem-node--${meta.color} reveal-step-80`}
                style={{ "--node-index": index } as CSSProperties}
              >
                <div className="node-corner node-corner-tl" aria-hidden="true" />
                <div className="node-corner node-corner-tr" aria-hidden="true" />
                <div className="node-corner node-corner-bl" aria-hidden="true" />
                <div className="node-corner node-corner-br" aria-hidden="true" />
                <div className="node-gradient-border" aria-hidden="true" />
                <span className="node-coords">{meta.coords}</span>
                <div className="node-status"><span className="node-status-dot" aria-hidden="true" /><span className="node-status-text">{node.status}</span></div>
                <div className="ecosystem-node__icon" aria-hidden="true"><Icon strokeWidth={1.5} /></div>
                <h3>{node.title}</h3>
                <span className="node-subtitle">{node.subtitle}</span>
                <div className="node-footer"><span className="node-id">ID: {String(index + 1).padStart(3, "0")}</span><ArrowRight className="node-link" size={16} aria-hidden="true" /></div>
              </article>
            );
          })}
        </div>

        <div className="easter-egg-transition reveal-step-100">
          <div className="flow-line" aria-hidden="true"><div className="flow-line-pulse" /></div>
          <div className="flow-steps">
            {content.flowSteps.map((step, index) => (
              <div key={step} className="flow-step" style={{ animationDelay: `${index * 0.2}s` }}>
                <span className="flow-step-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="flow-step-label">{step}</span>
                {index < content.flowSteps.length - 1 && <ArrowDown className="flow-arrow" size={16} aria-hidden="true" />}
              </div>
            ))}
          </div>
          <div className="evolution-trigger">
            <span className="evolution-pulse" aria-hidden="true" />
            <span className="next-section-preview">{content.nextLevel}</span>
            <ArrowRight className="evolution-arrow" size={18} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
