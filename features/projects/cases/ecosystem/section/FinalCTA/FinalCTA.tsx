"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { ecosystemContent } from "../../content";
import "./FinalCTA.css";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const content = ecosystemContent[locale].final;

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    gsap.set(orb, { xPercent: -50, yPercent: -50, left: "50%", top: "50%" });
    const xTo = gsap.quickTo(orb, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(orb, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (event: MouseEvent) => {
      xTo((event.clientX - window.innerWidth / 2) * 0.15);
      yTo((event.clientY - window.innerHeight / 2) * 0.15);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    const particles: Array<{ x: number; y: number; radius: number; alpha: number; speedY: number }> = [];

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    for (let index = 0; index < 45; index += 1) {
      particles.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, radius: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.5 + 0.1, speedY: -(Math.random() * 0.15 + 0.05) });
    }

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${particle.alpha})`;
        ctx.fill();
        particle.y += particle.speedY;
        if (particle.y < 0) particle.y = window.innerHeight;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("resize", resizeCanvas); };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top center+=200", toggleActions: "play none none none" } });
    tl.fromTo(".final-cta__label", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(".final-cta__title-line span", { yPercent: 100 }, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.15 }, "-=0.4")
      .fromTo(".final-cta__description", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo([".final-cta__button", ".final-cta__status"], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }, "-=0.4")
      .fromTo(".final-cta__pillar", { opacity: 0, scale: 0.9, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15 }, "-=0.3");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="final-cta" aria-labelledby="portfolio-nexus-final-title">
      <canvas ref={canvasRef} className="final-cta__particles" aria-hidden="true" />
      <div className="final-cta__background" aria-hidden="true" />
      <div ref={orbRef} className="final-cta__orb" aria-hidden="true"><div className="final-cta__orb-glow" /></div>

      <div className="final-cta__content">
        <span className="final-cta__label">{content.label}</span>
        <h2 id="portfolio-nexus-final-title" className="final-cta__title">
          {content.titleLines.map((line) => <div key={line} className="final-cta__title-line"><span>{line}</span></div>)}
        </h2>
        <p className="final-cta__description">{content.descriptionLine1}<br />{content.descriptionLine2}</p>
        <div className="final-cta__actions"><Link href="/contact" className="final-cta__button final-cta__button--primary">{t("contact.startProject")}</Link></div>
        <div className="final-cta__status"><span className="final-cta__status-dot" aria-hidden="true" />{content.status}</div>
        <div className="final-cta__pillars">{content.pillars.map((pillar) => <span key={pillar} className="final-cta__pillar">{pillar}</span>)}</div>
      </div>
    </section>
  );
}
