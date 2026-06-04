import "./DashboardAnalytics.css";

import { ClipboardList, CheckCircle, Clock, AlertTriangle } from "lucide-react";
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
            Indicadores em{" "}
            <span className="title-accent">Tempo Real</span>
          </h2>

          <p className="section-description">
            Acompanhe métricas operacionais, produtividade e
            andamento das tarefas em um único ambiente
            corporativo de alta performance.
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

            <img
              src="/projects/saas-data-control/textures/hero-dashboard.webp"
              alt="Dashboard Analytics"
            />
          </div>
        </div>
      </div>
    </section>
  );
}