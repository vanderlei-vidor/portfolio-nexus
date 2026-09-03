"use client";

import Image from "next/image";
import { AlertTriangle, CheckCircle, ClipboardList, Clock } from "lucide-react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { saasDataControlContent } from "../../content";
import { MetricCard } from "./MetricCard";
import "./DashboardAnalytics.css";

const metricIcons = [ClipboardList, CheckCircle, Clock, AlertTriangle] as const;

export function DashboardAnalytics() {
  const { locale } = useLanguage();
  const content = saasDataControlContent[locale].analytics;

  return (
    <section className="dashboard-analytics" aria-labelledby="saas-data-control-analytics-title">
      <div className="analytics-bg-gradient" aria-hidden="true" />

      <div className="container">
        <div className="dashboard-header">
          <span className="dashboard-badge">
            <span className="badge-pulse" aria-hidden="true" />
            {content.badge}
          </span>

          <h2 id="saas-data-control-analytics-title" className="section-title">
            {content.title} <span className="title-accent">{content.titleAccent}</span>
          </h2>

          <p className="section-description">{content.description}</p>
        </div>

        <div className="metrics-grid" aria-label={content.badge}>
          {content.metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              value={metric.value}
              label={metric.label}
              icon={metricIcons[index]}
              trend={metric.trend}
              index={index}
            />
          ))}
        </div>

        <div className="dashboard-preview-wrapper">
          <div className="dashboard-preview-glow" aria-hidden="true" />
          <div className="dashboard-preview">
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
              src="/projects/saas-data-control/textures/reports-month-light-tela-inferior.webp"
              alt={content.imageAlt}
              width={800}
              height={400}
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
