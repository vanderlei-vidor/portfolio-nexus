"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Music, Waves, Zap, Radio } from "lucide-react";
import "./ExperienceReimagined.css";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { text: "Immersive UI", icon: Waves, pos: "top-left" },
  { text: "Audio Visualization", icon: Radio, pos: "top-right" },
  { text: "Modern Interactions", icon: Zap, pos: "bottom-left" },
  { text: "Responsive Design", icon: Music, pos: "bottom-right" },
];

// Gerar partículas sonoras aleatórias
const soundParticles = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${3 + Math.random() * 4}s`,
  size: `${1 + Math.random() * 3}px`,
}));

export default function ExperienceReimagined() {
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  // Mouse tracking para o Orb 3D
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      section.style.setProperty("--mouse-x", `${x}`);
      section.style.setProperty("--mouse-y", `${y}`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline e Descrição
      gsap.from(".experience__label, .experience__title, .experience__description", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // 2. Core surgindo com elasticidade
      gsap.from(coreRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".experience__showcase",
          start: "top 80%",
        },
      });

      // 3. Ondas sonoras revelando e expandindo
      gsap.from(".sound-wave", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".experience__showcase",
          start: "top 70%",
        },
      });

      // 4. Pills flutuando de direções diferentes
      const pills = pillsRef.current?.querySelectorAll(".feature-pill");
      if (pills) {
        gsap.from(pills, {
          y: (i) => (i % 2 === 0 ? 100 : -100),
          x: (i) => (i < 2 ? -80 : 80),
          opacity: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience__showcase",
            start: "top 60%",
          },
        });
      }

      // 5. Linhas de conexão desenhando
      gsap.to(".connection-line", {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".experience__showcase",
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1,
        },
      });

      // 6. Manifesto linha por linha
      const manifestoLines = manifestoRef.current?.querySelectorAll(".manifesto-line");
      if (manifestoLines) {
        gsap.from(manifestoLines, {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience" ref={sectionRef}>
      {/* Background Layers */}
      <div className="experience__bg-gradient" />
      <div className="experience__grid" />
      
      {/* Partículas Sonoras (Subindo como equalizador) */}
      <div className="sound-particles">
        {soundParticles.map((p) => (
          <span
            key={p.id}
            className="sound-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="experience__container">
        <span className="experience__label">
          <span className="label-pulse" />
          EXPERIENCE
        </span>

        <h2 className="experience__title">
          Experience.
          <br />
          <span className="title-gradient">Reimagined.</span>
        </h2>

        <p className="experience__description">
          More than a music player. An immersive digital experience
          built around motion, interaction, and emotion.
        </p>

        <div className="experience__showcase">
          {/* Linhas de Conexão Luminosas (SVG) */}
          <svg className="connections-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line className="connection-line" x1="50" y1="50" x2="20" y2="20" />
            <line className="connection-line" x1="50" y1="50" x2="80" y2="20" />
            <line className="connection-line" x1="50" y1="50" x2="25" y2="80" />
            <line className="connection-line" x1="50" y1="50" x2="75" y2="80" />
          </svg>

          {/* Núcleo Musical Gigante */}
          <div className="sound-core" ref={coreRef}>
            <div className="sound-core__glow-1" />
            <div className="sound-core__glow-2" />
            
            {/* Equalizer Abstrato Animado */}
            <div className="equalizer-ring">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="eq-bar" style={{ "--i": i } as React.CSSProperties} />
              ))}
            </div>

            <div className="sound-core__center">
              <Music className="core-icon" strokeWidth={1.5} />
            </div>

            {/* Ondas Sonoras */}
            <div className="sound-wave sound-wave--1" />
            <div className="sound-wave sound-wave--2" />
            <div className="sound-wave sound-wave--3" />
          </div>

          {/* Features Orbitando */}
          <div className="feature-pills-container" ref={pillsRef}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.text}
                  className={`feature-pill feature-pill--${feature.pos}`}
                >
                  <Icon className="pill-icon" size={16} />
                  <span>{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Manifesto Final */}
        <div className="experience__manifesto" ref={manifestoRef}>
          <span className="manifesto-line">Music became the medium.</span>
          <strong className="manifesto-line manifesto-strong">
            Experience became the product.
          </strong>
        </div>
      </div>
    </section>
  );
}