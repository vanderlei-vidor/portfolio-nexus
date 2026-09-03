"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import { Music, Radio, Waves, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { ecosystemContent } from "../../content";
import "./ExperienceReimagined.css";

gsap.registerPlugin(ScrollTrigger);

const featureMeta = [
  { icon: Waves, pos: "top-left" },
  { icon: Radio, pos: "top-right" },
  { icon: Zap, pos: "bottom-left" },
  { icon: Music, pos: "bottom-right" },
] as const;

const soundParticles = Array.from({ length: 40 }).map((_, index) => {
  const seed = index + 1;
  const normalized = (value: number) => ((Math.sin(value) * 10000) % 1 + 1) % 1;

  return {
    id: index,
    left: `${normalized(seed * 12.9898) * 100}%`,
    delay: `${(normalized(seed * 78.233) * 5).toFixed(2)}s`,
    duration: `${(3 + normalized(seed * 37.719) * 4).toFixed(2)}s`,
    size: `${(1 + normalized(seed * 91.17) * 3).toFixed(2)}px`,
  };
});

export default function ExperienceReimagined() {
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const content = ecosystemContent[locale].experience;
  const features = useMemo(
    () => content.features.map((text, index) => ({ text, ...featureMeta[index] })),
    [content.features],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let rafId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        section.style.setProperty("--mouse-x", `${x}`);
        section.style.setProperty("--mouse-y", `${y}`);
        rafId = 0;
      });
    };

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".experience__label, .experience__title, .experience__description", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.from(coreRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: ".experience__showcase", start: "top 80%" },
      });

      gsap.from(".sound-wave", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".experience__showcase", start: "top 70%" },
      });

      const pills = pillsRef.current?.querySelectorAll(".feature-pill");
      if (pills) {
        gsap.from(pills, {
          y: (index) => (index % 2 === 0 ? 100 : -100),
          x: (index) => (index < 2 ? -80 : 80),
          opacity: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".experience__showcase", start: "top 60%" },
        });
      }

      gsap.to(".connection-line", {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".experience__showcase", start: "top 50%", end: "bottom 50%", scrub: 1 },
      });

      const manifestoLines = manifestoRef.current?.querySelectorAll(".manifesto-line");
      if (manifestoLines) {
        gsap.from(manifestoLines, {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: manifestoRef.current, start: "top 85%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience" ref={sectionRef} aria-labelledby="portfolio-nexus-experience-title">
      <div className="experience__bg-gradient" aria-hidden="true" />
      <div className="experience__grid" aria-hidden="true" />

      <div className="sound-particles" aria-hidden="true">
        {soundParticles.map((particle) => (
          <span key={particle.id} className="sound-particle" style={{ left: particle.left, animationDelay: particle.delay, animationDuration: particle.duration, width: particle.size, height: particle.size }} />
        ))}
      </div>

      <div className="experience__container">
        <span className="experience__label"><span className="label-pulse" aria-hidden="true" />{content.label}</span>

        <h2 id="portfolio-nexus-experience-title" className="experience__title">
          {content.titleLine1}
          <br />
          <span className="title-gradient">{content.titleLine2}</span>
        </h2>

        <p className="experience__description">{content.description}</p>

        <div className="experience__showcase">
          <svg className="connections-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line className="connection-line" x1="50" y1="50" x2="20" y2="20" />
            <line className="connection-line" x1="50" y1="50" x2="80" y2="20" />
            <line className="connection-line" x1="50" y1="50" x2="25" y2="80" />
            <line className="connection-line" x1="50" y1="50" x2="75" y2="80" />
          </svg>

          <div className="sound-core" ref={coreRef} aria-hidden="true">
            <div className="sound-core__glow-1" />
            <div className="sound-core__glow-2" />
            <div className="equalizer-ring">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="eq-bar" style={{ "--i": index } as CSSProperties} />
              ))}
            </div>
            <div className="sound-core__center"><Music className="core-icon" strokeWidth={1.5} /></div>
            <div className="sound-wave sound-wave--1" />
            <div className="sound-wave sound-wave--2" />
            <div className="sound-wave sound-wave--3" />
          </div>

          <div className="feature-pills-container" ref={pillsRef}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.text} className={`feature-pill feature-pill--${feature.pos}`}>
                  <Icon className="pill-icon" size={16} aria-hidden="true" />
                  <span>{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="experience__manifesto" ref={manifestoRef}>
          <span className="manifesto-line">{content.manifestoLine1}</span>
          <strong className="manifesto-line manifesto-strong">{content.manifestoLine2}</strong>
        </div>
      </div>
    </section>
  );
}
