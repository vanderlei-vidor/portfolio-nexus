"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./DigitalGap.css";

gsap.registerPlugin(ScrollTrigger);

const fragments = [
  "Different Tools",
  "Different Workflows",
  "Different Platforms",
  "Different Systems",
  "Different Ecosystems",
];

const manifestoWords = ["We", "believe", "there", "is", "a", "better", "way."];

export default function DigitalGap() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<SVGSVGElement>(null);
  const fragmentsRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const convergencePointRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    if (!section || !pinContainer) return;

    const ctx = gsap.context(() => {
      const fragmentElements = fragmentsRef.current?.querySelectorAll(".digital-gap__fragment");
      const wordElements = manifestoRef.current?.querySelectorAll(".manifesto-word span");
      const nodes = constellationRef.current?.querySelectorAll(".constellation-node-group");
      const lines = constellationRef.current?.querySelectorAll(".constellation-line");

      // ====== 1. CONFIGURAÇÃO INICIAL (PRE-ANIMATION) ======
      if (lines) {
        lines.forEach((line) => {
          const length = (line as SVGLineElement).getTotalLength?.() || 200;
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });
      }

      // ====== 2. TIMELINE MASTER COM PINNING DE TELA ======
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%", // Dá bastante espaço confortável para a jornada de scroll
          pin: true,     // Trava a tela na viewport do usuário
          scrub: 1,      // Sincronia perfeita com o scroll do mouse
          invalidateOnRefresh: true,
        },
      });

      // Passo A: Revelação Cinematográfica Inicial
      masterTl.addLabel("start")
        .fromTo(".digital-gap__title-line span", 
          { yPercent: 100 }, 
          { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.1 }
        )
        .fromTo(".digital-gap__description", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8 }, 
          "-=0.6"
        );

      // Passo B: Fragmentos e Nós surgem em cena
      if (fragmentElements && nodes) {
        masterTl.addLabel("appear")
          .fromTo(fragmentElements, 
            { opacity: 0, y: 40, scale: 0.9 }, 
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 1, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(nodes, 
            { scale: 0, opacity: 0 }, 
            { scale: 1, opacity: 1, stagger: 0.05, duration: 0.8, ease: "back.out(1.5)" }, 
            "<"
          );
      }

      // Passo C: Conexão Parcial das Linhas (A ilusão de ordem)
      if (lines) {
        masterTl.addLabel("connecting")
          .to(lines, {
            strokeDashoffset: (i, target) => {
              const length = (target as SVGLineElement).getTotalLength?.() || 200;
              return length * 0.4; // Linhas falham em se cruzar completamente
            },
            duration: 1.2,
            ease: "power2.inOut"
          });
      }

      // Passo D: O Caos - Separação, repulsão e quebra total dos fragmentos
      if (fragmentElements && lines) {
        masterTl.addLabel("chaos")
          .to(lines, { strokeDashoffset: (i, target) => (target as SVGLineElement).getTotalLength?.() || 200, duration: 0.6, ease: "power4.in" })
          .to(fragmentElements, {
            x: (index) => (index % 2 === 0 ? -60 : 60) * (1 + Math.random() * 0.5),
            y: () => -40 - Math.random() * 40,
            rotation: (index) => (index % 2 === 0 ? -12 : 12),
            opacity: 0.2,
            filter: "blur(4px)",
            duration: 1.5,
            ease: "power2.inOut"
          }, "<")
          .to([".digital-gap__title", ".digital-gap__description", ".digital-gap__fragments"], {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.in"
          }, "-=0.5");
      }

      // Passo E: Manifesto surge do vácuo absoluto
      if (wordElements) {
        masterTl.addLabel("manifesto")
          .fromTo(wordElements, 
            { yPercent: 100 }, 
            { yPercent: 0, duration: 0.8, ease: "power4.out", stagger: 0.08 }
          )
          .to(".digital-gap__divider", { height: 160, opacity: 1, duration: 0.8 }, "-=0.2");
      }

      // Passo F: Convergência Final Absoluta (Colisão Estelar)
      if (lines && nodes) {
        masterTl.addLabel("convergence")
          .to(lines, {
            attr: { x1: "50%", y1: "50%", x2: "50%", y2: "50%" },
            opacity: 0,
            duration: 1.5,
            ease: "power3.inOut"
          })
          .to(nodes, {
            attr: { cx: "50%", cy: "50%" },
            scale: 0,
            opacity: 0,
            duration: 1.5,
            ease: "power3.inOut"
          }, "<")
          .to(manifestoRef.current, { opacity: 0, scale: 0.9, y: -20, duration: 0.8 }, "-=0.5");
      }

      // Passo G: Ignição do ponto de singularidade (Nexus)
      masterTl.addLabel("nexus")
        .fromTo(convergencePointRef.current, 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.2)" }
        );

      // 3. ANIMAÇÃO IDLE INFINITA (Pulsar do Núcleo)
      gsap.to(convergencePointRef.current, {
        boxShadow: "0 0 60px rgba(96, 165, 250, 0.6), 0 0 120px rgba(167, 139, 250, 0.4)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    }, section);

    return () => ctx.revert();
  }, []);

  // Coordenadas calculadas de forma simétrica para impacto visual high-end
  const nodePositions = [
    { x: 15, y: 20 }, { x: 85, y: 25 },
    { x: 10, y: 50 }, { x: 90, y: 55 },
    { x: 20, y: 80 }, { x: 80, y: 75 },
    { x: 50, y: 15 }, { x: 50, y: 85 },
  ];

  const connections = [
    [0, 1], [1, 3], [2, 4], [3, 5], [0, 2],
    [4, 5], [6, 0], [6, 1], [7, 4], [7, 5],
  ];

  return (
    <section className="digital-gap" ref={sectionRef}>
      <div className="digital-gap__pin-container" ref={pinContainerRef}>
        <div className="digital-gap__background" />
        <div className="digital-gap__grid" />

        <div className="digital-gap__container">
          <span className="digital-gap__label">
            <span className="label-dot" />
            THE DIGITAL GAP
            <span className="label-version">v1.0</span>
          </span>

          {/* Linhas mascaradas para a tipografia surgir do abismo */}
          <h2 className="digital-gap__title">
            <div className="digital-gap__title-line">
              <span>Powerful Tools.</span>
            </div>
            <div className="digital-gap__title-line">
              <span className="title-gradient">Fragmented Experiences.</span>
            </div>
          </h2>

          <p className="digital-gap__description">
            Modern products solve individual problems. Yet most digital experiences remain disconnected.
            Technology became more powerful. But not necessarily more unified.
          </p>

          <div className="digital-gap__fragments" ref={fragmentsRef}>
            {fragments.map((fragment, index) => (
              <div
                key={fragment}
                className="digital-gap__fragment"
                style={{ "--fragment-index": index } as React.CSSProperties}
              >
                <span className="fragment-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="fragment-text">{fragment}</span>
                <span className="fragment-status">DISCONNECTED</span>
              </div>
            ))}
          </div>

          <div className="digital-gap__divider" />

          {/* Palavras envolvidas em contêineres ocultos para efeito de revelação pura */}
          <div className="digital-gap__manifesto" ref={manifestoRef}>
            {manifestoWords.map((word, index) => (
              <span key={index} className="manifesto-word">
                <span>{word}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Constelação Dinâmica */}
        <svg className="digital-gap__constellation" ref={constellationRef} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {connections.map(([from, to], index) => (
            <line
              key={index}
              className="constellation-line"
              x1={`${nodePositions[from].x}%`}
              y1={`${nodePositions[from].y}%`}
              x2={`${nodePositions[to].x}%`}
              y2={`${nodePositions[to].y}%`}
              stroke="rgba(96, 165, 250, 0.25)"
              strokeWidth="0.5"
            />
          ))}

          {nodePositions.map((pos, index) => (
            <g key={index} className="constellation-node-group" style={{ transformOrigin: `${pos.x}% ${pos.y}%` }}>
              <circle className="constellation-node" cx={`${pos.x}%`} cy={`${pos.y}%`} r="0.6" fill="#60a5fa" />
              <circle className="constellation-node-glow" cx={`${pos.x}%`} cy={`${pos.y}%`} r="1.8" fill="rgba(96, 165, 250, 0.15)" />
            </g>
          ))}
        </svg>

        {/* Ponto de convergência central definitivo */}
        <div className="convergence-point" ref={convergencePointRef}>
          <div className="convergence-glow" />
          <div className="convergence-core">
            <span className="convergence-label">ECOSYSTEM</span>
            <span className="convergence-arrow">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}