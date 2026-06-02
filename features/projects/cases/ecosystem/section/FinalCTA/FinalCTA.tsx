"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FinalCTA.css";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Efeito do Orb reagindo ao mouse de forma suave
  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    // Configura o ponto inicial do Orb bem no centro da tela
    gsap.set(orb, { xPercent: -50, yPercent: -50, left: "50%", top: "50%" });

    // quickTo permite atualizações de alta performance a 60fps+ sem travamentos
    const xTo = gsap.quickTo(orb, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(orb, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calcula o deslocamento baseado no centro da viewport
      const moveX = (clientX - innerWidth / 2) * 0.15; // Intensidade do movimento
      const moveY = (clientY - innerHeight / 2) * 0.15;

      xTo(moveX);
      yTo(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Partículas Cósmicas e Lentas no Fundo (Canvas 2D leve)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedY: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Criando array de partículas
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        speedY: -(Math.random() * 0.15 + 0.05), // Sobe bem devagar
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha})`; // Cor azulada suave
        ctx.fill();

        p.y += p.speedY;
        if (p.y < 0) p.y = canvas.height; // Loop infinito
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // 3. Revelação Cinemática com GSAP ScrollTrigger
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=200", // Inicia ao entrar na visão
        toggleActions: "play none none none", // Roda uma vez de forma performática
      },
    });

    // Revela a label inicial do capítulo
    tl.fromTo(".final-cta__label",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    // Revela o título mascarado linha por linha (Efeito de máscara/clip)
    tl.fromTo(".final-cta__title-line span",
      { yPercent: 100 },
      { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.15 },
      "-=0.4"
    );

    // Fade-in e elevação sutil da descrição
    tl.fromTo(".final-cta__description",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    // Os botões de ação e o status do projeto surgindo juntos
    tl.fromTo([".final-cta__button", ".final-cta__status"],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
      "-=0.4"
    );

    // Os pilares finais surgem um a um, criando a sensação de selo finalizado
    tl.fromTo(".final-cta__pillar",
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15 },
      "-=0.3"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="final-cta">
      {/* Canvas das partículas ao fundo */}
      <canvas ref={canvasRef} className="final-cta__particles" />

      <div className="final-cta__background" />

      {/* Orb interativo */}
      <div ref={orbRef} className="final-cta__orb">
        <div className="final-cta__orb-glow" />
      </div>

      <div className="final-cta__content">
        <span className="final-cta__label">FINAL CHAPTER</span>

        {/* Divisão estrutural em linhas separadas para o GSAP fazer a revelação cirúrgica */}
        <h2 className="final-cta__title">
          <div className="final-cta__title-line">
            <span>LET'S BUILD</span>
          </div>
          <div className="final-cta__title-line">
            <span>SOMETHING</span>
          </div>
          <div className="final-cta__title-line">
            <span>REMARKABLE.</span>
          </div>
        </h2>

        <p className="final-cta__description">
          From ideas to ecosystems. From concepts to products.
          <br />
          Let's create the next chapter together.
        </p>

        <div className="final-cta__actions">
          <a href="#contact" className="final-cta__button final-cta__button--primary">
            Start a Project
          </a>
          <a href="#contact" className="final-cta__button final-cta__button--secondary">
            Let's Talk
          </a>
        </div>

        <div className="final-cta__status">
          <span className="final-cta__status-dot" />
          Future In Progress
        </div>

        <div className="final-cta__pillars">
          <span className="final-cta__pillar">Experience</span>
          <span className="final-cta__pillar">Intelligence</span>
          <span className="final-cta__pillar">Control</span>
          <span className="final-cta__pillar">Vision</span>
        </div>
      </div>
    </section>
  );
}