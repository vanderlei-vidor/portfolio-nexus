"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./IntelligencePersonalized.css";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Grammar",
  "Vocabulary",
  "Listening",
  "Speaking",
  "Writing",
];

const insights = [
  "Adaptive Learning",
  "AI Guidance",
  "Progress Tracking",
  "Personalized Feedback",
];

export default function IntelligencePersonalized() {
  const sectionRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const system = systemRef.current;
    const svg = svgRef.current;
    if (!section || !system || !svg) return;

    const ctx = gsap.context(() => {
      // ====== 1. REVELAÇÃO DA REDE CONFORME O SCROLL (IA DESPERTANDO) ======
      const nodes = system.querySelectorAll(".neural-node, .insight-pill, .neural-core");
      const lines = svg.querySelectorAll<SVGGeometryElement>(".neural-line");
      const pulses = svg.querySelectorAll<SVGGeometryElement>(".neural-pulse");

      // Estado inicial limpo
      gsap.set([nodes, lines, pulses], { opacity: 0 });
      gsap.set(lines, { strokeDashoffset: (_index, target: SVGGeometryElement) => target.getTotalLength() });

      const awakeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: system,
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Acende o núcleo central de IA primeiro
      awakeTimeline.to(".neural-core", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" })
        // Estende os caminhos sinápticos para fora
        .to(lines, {
          opacity: 0.3,
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          stagger: 0.05
        }, "-=0.4")
        // Acende os neurônios periféricos
        .to(".neural-node", { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" }, "-=0.8")
        .to(".insight-pill", { opacity: 1, scale: 1, stagger: 0.06, duration: 0.5 }, "-=0.4")
        // Ativa os pulsos elétricos contínuos pós-despertar
        .to(pulses, {
          opacity: 0.8,
          duration: 0.3,
          onComplete: () => startSynapticPulses(pulses)
        }, "-=0.2");


      // ====== 2. FUNÇÃO DE PULSOS NEURAIS LOOPING ======
      function startSynapticPulses(pulseElements: NodeListOf<SVGGeometryElement>) {
        pulseElements.forEach((pulse) => {
          const length = pulse.getTotalLength();
          gsap.set(pulse, { strokeDasharray: `${length / 4} ${length}` });
          
          gsap.fromTo(pulse,
            { strokeDashoffset: length },
            {
              strokeDashoffset: -length,
              duration: 2 + Math.random() * 2,
              repeat: -1,
              ease: "none",
              delay: Math.random() * 1.5
            }
          );
        });
      }

      // ====== 3. INTERAÇÃO DO ORB SEGUINDO O MOUSE LEVEMENTE ======
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = section.getBoundingClientRect();
        
        // Coordenadas relativas à seção com amortecimento físico pelo GSAP
        gsap.to(orbRef.current, {
          x: clientX - rect.left,
          y: clientY - rect.top,
          duration: 1.5,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="intelligence" ref={sectionRef}>
      {/* Background e Orb de Interação */}
      <div className="intelligence__background" />
      <div className="intelligence__mouse-orb" ref={orbRef} />

      <div className="intelligence__container">
        <span className="intelligence__label">INTELLIGENCE</span>

        <h2 className="intelligence__title">
          Intelligence.
          <br />
          <span className="title-gradient">Personalized.</span>
        </h2>

        <p className="intelligence__description">
          An adaptive learning experience designed to understand progress,
          identify weaknesses and guide growth.
        </p>

        {/* Sistema Neural Conectado */}
        <div className="neural-system" ref={systemRef}>
          
          {/* Malha de Conexão SVG Estreinada */}
          <svg className="neural-network-svg" ref={svgRef} viewBox="0 0 1000 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Linhas Estruturais das Sinapses (Mapeadas de acordo com as posições CSS) */}
            {/* Conexões do Core para os Nodes Principais */}
            <path className="neural-line" d="M 500 400 L 500 80" stroke="url(#neuralGrad)" strokeWidth="1.5" fill="none" />
            <path className="neural-line" d="M 500 400 L 850 240" stroke="url(#neuralGrad)" strokeWidth="1.5" fill="none" />
            <path className="neural-line" d="M 500 400 L 850 560" stroke="url(#neuralGrad)" strokeWidth="1.5" fill="none" />
            <path className="neural-line" d="M 500 400 L 500 720" stroke="url(#neuralGrad)" strokeWidth="1.5" fill="none" />
            <path className="neural-line" d="M 500 400 L 150 400" stroke="url(#neuralGrad)" strokeWidth="1.5" fill="none" />

            {/* Conexões Secundárias dos Insights para fechar a teia neural */}
            <path className="neural-line" d="M 500 80 L 220 180" stroke="url(#neuralGrad)" strokeWidth="1" fill="none" />
            <path className="neural-line" d="M 500 80 L 780 180" stroke="url(#neuralGrad)" strokeWidth="1" fill="none" />
            <path className="neural-line" d="M 150 400 L 220 180" stroke="url(#neuralGrad)" strokeWidth="1" fill="none" />
            <path className="neural-line" d="M 150 400 L 220 620" stroke="url(#neuralGrad)" strokeWidth="1" fill="none" />
            <path className="neural-line" d="M 850 240 L 780 180" stroke="url(#neuralGrad)" strokeWidth="1" fill="none" />
            <path className="neural-line" d="M 850 560 L 780 620" stroke="url(#neuralGrad)" strokeWidth="1" fill="none" />
            <path className="neural-line" d="M 500 720 L 220 620" stroke="url(#neuralGrad)" strokeWidth="1" fill="none" />
            <path className="neural-line" d="M 500 720 L 780 620" stroke="url(#neuralGrad)" strokeWidth="1" fill="none" />

            {/* Camada de Pulsos Elétricos sobrepostos */}
            <path className="neural-pulse" d="M 500 400 L 500 80" stroke="url(#pulseGrad)" strokeWidth="2.5" fill="none" />
            <path className="neural-pulse" d="M 500 400 L 850 240" stroke="url(#pulseGrad)" strokeWidth="2.5" fill="none" />
            <path className="neural-pulse" d="M 500 400 L 850 560" stroke="url(#pulseGrad)" strokeWidth="2.5" fill="none" />
            <path className="neural-pulse" d="M 500 400 L 500 720" stroke="url(#pulseGrad)" strokeWidth="2.5" fill="none" />
            <path className="neural-pulse" d="M 500 400 L 150 400" stroke="url(#pulseGrad)" strokeWidth="2.5" fill="none" />
          </svg>

          {/* Núcleo de Processamento (Core) */}
          <div className="neural-core">
            <div className="neural-core__glow" />
            <div className="neural-core__particles">
              <span className="particle" />
              <span className="particle" />
              <span className="particle" />
            </div>
            <span>AI</span>
          </div>

          {/* Nodes Principais */}
          {skills.map((skill, index) => (
            <div key={skill} className={`neural-node neural-node--${index + 1}`}>
              <span className="node-radar" />
              {skill}
            </div>
          ))}

          {/* Nós de Insights Secundários */}
          {insights.map((item, index) => (
            <div key={item} className={`insight-pill insight-pill--${index + 1}`}>
              {item}
            </div>
          ))}

        </div>

        <div className="intelligence__manifesto">
          Learning became personal.
          <br />
          <strong>Intelligence became adaptive.</strong>
        </div>
      </div>
    </section>
  );
}
