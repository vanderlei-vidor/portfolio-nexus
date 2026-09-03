"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./EcosystemHero.css";

const conjunction = {
  en: "and",
  pt: "e",
  es: "y",
} as const;

export default function EcosystemHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].hero;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.to(".hero-glow", {
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="ecosystem-section ecosystem-hero relative overflow-hidden" aria-labelledby="portfolio-nexus-hero-title">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="hero-glow absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[180px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-[url('/textures/noise-webp.webp')] opacity-[0.03] mix-blend-soft-light" />
      </div>

      <div className="ecosystem-container relative z-10 text-center md:text-left">
        <div className="reveal-text">
          <span className="ecosystem-label">
            <span className="dot" aria-hidden="true" /> {content.label}
          </span>
        </div>

        <h1 id="portfolio-nexus-hero-title" className="reveal-text">
          {content.titleLine1} <span className="text-gradient">{content.titleAccent1}</span>
          <br />
          {content.titleLine2} <span className="text-gradient">{content.titleAccent2}</span>
        </h1>

        <p className="reveal-text mt-6">
          {content.descriptionStart}{" "}
          {content.domains.map((domain, index) => (
            <span key={domain}>
              <span className="text-white">{domain}</span>
              {index < content.domains.length - 2 ? ", " : index === content.domains.length - 2 ? ` ${conjunction[locale]} ` : "."}
            </span>
          ))}
        </p>

        <div className="reveal-text mt-12 hidden h-px w-24 bg-linear-to-r from-blue-500 to-transparent md:block" aria-hidden="true" />
      </div>
    </section>
  );
}
