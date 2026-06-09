"use client";

import Image from "next/image";
import "./DashboardAnalytics.css";

import { metrics } from "../../data/taskManagerData";
import { MetricCard } from "./MetricCard";

export function DashboardAnalytics() {
  return (
    <section className="dashboard-analytics">
      {/* Mesh gradient decorativo */}
      <div className="analytics-bg-gradient" />

      <div className="container">
        <div className="dashboard-header">
          <span className="dashboard-badge">
            <span className="badge-pulse" />
            Live Metrics
          </span>

          <h2 className="section-title">
            Indicators in{" "}
            <span className="title-accent">Real Time</span>
          </h2>

          <p className="section-description">
            Track operational metrics, productivity, and task progress in a single, high-performance corporate environment.
          </p>
        </div>

        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              value={metric.value}
              label={metric.label}
              icon={metric.icon}
              trend={metric.trend}
              index={index}
            />
          ))}
        </div>

        <div className="dashboard-preview-wrapper">
          <div className="dashboard-preview-glow" />
          <div className="dashboard-preview">
            <div className="preview-header">
              <div className="preview-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="preview-title">
                analytics.dashboard.app
              </span>
              <div className="preview-placeholder" />
            </div>

            {/* --- IMPLEMENTAÇÃO COM NEXT/IMAGE PARA LAZY LOADING --- */}
            <Image
              src="/projects/saas-data-control/textures/hero-dashboard.webp"
              alt="Task Manager Analytics Dashboard"

              // Mantemos a mesma proporção widescreen do Hero (1200x750)
              width={800}
              height={400}

            // NÃO adicionamos 'priority' aqui. O Next.js vai segurar o download
            // até que o usuário faça scroll perto dessa seção (economia de banda pura!).
            />

          </div>
        </div>
      </div>
    </section>
  );
}