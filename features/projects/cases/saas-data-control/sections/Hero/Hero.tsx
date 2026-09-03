"use client";

import Image from "next/image";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { saasDataControlContent } from "../../content";
import "./Hero.css";

export function Hero() {
  const { locale } = useLanguage();
  const content = saasDataControlContent[locale].hero;

  return (
    <section className="task-manager-hero" aria-labelledby="saas-data-control-hero-title">
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />

      <div className="container">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true" />
              {content.badge}
            </span>

            <h1 id="saas-data-control-hero-title" className="hero-title">
              {content.title}
              <span className="hero-title-accent"> {content.titleAccent}</span>
            </h1>

            <p className="hero-description">{content.description}</p>

            <div className="hero-stack" aria-label="Technology stack">
              {content.stack.map((tech, index) => (
                <span key={tech} style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-glow" aria-hidden="true" />
            <div className="hero-image">
              <Image
                src="/projects/saas-data-control/textures/dashboard-light-tela.webp"
                alt={content.imageAlt}
                width={1200}
                height={750}
                sizes="(max-width: 968px) 100vw, 58vw"
                priority
                className="hero-dashboard-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
