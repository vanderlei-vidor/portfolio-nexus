"use client";

import Image from "next/image";
import { ArrowRight, BarChart3, Check, CheckSquare, FileDown, Layers, TrendingUp } from "lucide-react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { saasDataControlContent } from "../../content";
import "./CentralizedSolution.css";

const solutionIcons = [CheckSquare, BarChart3, FileDown, TrendingUp, Layers] as const;

export function CentralizedSolution() {
  const { locale } = useLanguage();
  const content = saasDataControlContent[locale].solution;

  return (
    <section className="centralized-solution" aria-labelledby="saas-data-control-solution-title">
      <div className="solution-bg" aria-hidden="true" />

      <div className="container">
        <div className="solution-content">
          <div className="solution-text">
            <span className="solution-badge">
              <span className="badge-solution-icon" aria-hidden="true">
                <Check size={12} />
              </span>
              {content.badge}
            </span>

            <h2 id="saas-data-control-solution-title" className="section-title">
              {content.titleLine1} <span className="title-accent-emerald">{content.titleAccent1}</span>
              <br />
              {content.titleLine2}
              <br />
              <span className="title-accent">{content.titleAccent2}</span>
            </h2>

            <p className="section-description">{content.description}</p>

            <div className="solution-list">
              {content.items.map((item, index) => {
                const Icon = solutionIcons[index];

                return (
                  <article
                    key={item.label}
                    className="solution-item"
                    style={{ animationDelay: `${0.3 + index * 0.08}s` }}
                  >
                    <div className="solution-item-check" aria-hidden="true">
                      <Icon className="solution-item-icon" />
                    </div>

                    <div className="solution-item-content">
                      <h4>{item.label}</h4>
                      <span>{item.description}</span>
                    </div>

                    <div className="solution-item-arrow" aria-hidden="true">
                      <ArrowRight size={18} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="solution-image-wrapper">
            <div className="solution-image-glow" aria-hidden="true" />
            <div className="solution-image-decoration" aria-hidden="true" />

            <div className="solution-image">
              <div className="preview-header">
                <div className="preview-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="preview-title">{content.previewTitle}</span>
                <div className="preview-placeholder" aria-hidden="true" />
              </div>

              <Image
                src="/projects/saas-data-control/textures/reports-quarter-light.webp"
                alt={content.imageAlt}
                width={1200}
                height={750}
                sizes="(max-width: 968px) 100vw, 54vw"
              />
            </div>

            {content.stats.map((stat, index) => (
              <div key={stat.label} className={`floating-stat floating-stat-${index + 1}`}>
                <span className="floating-stat-label">{stat.label}</span>
                <span className="floating-stat-value">
                  {stat.value}
                  <span className="floating-stat-trend" aria-hidden="true">
                    <ArrowRight size={12} />
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
