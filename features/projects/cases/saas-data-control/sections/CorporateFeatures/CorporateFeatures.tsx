"use client";

import { BarChart3, Database, Diamond, FileSpreadsheet, FileText, ShieldCheck, Smartphone } from "lucide-react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { saasDataControlContent } from "../../content";
import "./CorporateFeatures.css";

const featureIcons = [ShieldCheck, BarChart3, FileText, FileSpreadsheet, Smartphone, Database] as const;

export function CorporateFeatures() {
  const { locale } = useLanguage();
  const content = saasDataControlContent[locale].features;

  return (
    <section className="corporate-features" aria-labelledby="saas-data-control-features-title">
      <div className="corp-features-bg" aria-hidden="true" />

      <div className="container">
        <div className="features-header">
          <span className="corp-badge">
            <Diamond className="corp-badge-icon" size={13} aria-hidden="true" />
            {content.badge}
          </span>

          <h2 id="saas-data-control-features-title" className="section-title">
            {content.title} <span className="title-accent">{content.titleAccent}</span>
            <br />
            {content.titleLine2}
          </h2>

          <p className="section-description">{content.description}</p>
        </div>

        <div className="features-list">
          {content.items.map((feature, index) => {
            const Icon = featureIcons[index];
            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                key={feature.title}
                className="feature-item"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <span className="feature-number-bg" aria-hidden="true">
                  {number}
                </span>

                <div className="feature-item-inner">
                  <div className="feature-visual">
                    <span className="feature-number" aria-hidden="true">
                      {number}
                    </span>

                    <div className="feature-icon-wrapper" aria-hidden="true">
                      <Icon className="feature-icon-svg" />
                    </div>
                  </div>

                  <div className="feature-content">
                    <span className="feature-tag">{feature.tag}</span>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>

                <div className="feature-glow" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
