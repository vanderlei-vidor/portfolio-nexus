import "./CentralizedSolution.css";

import {
  CheckSquare,
  BarChart3,
  FileDown,
  TrendingUp,
  Layers,
} from "lucide-react";

const solutions = [
  {
    icon: CheckSquare,
    label: "Task Management",
    description: "Centralized control over all operational tasks",
  },
  {
    icon: BarChart3,
    label: "Real-Time Dashboard",
    description: "Live monitoring of KPIs and team performance",
  },
  {
    icon: FileDown,
    label: "Exportable Reports",
    description: "One-click generation of professional reports",
  },
  {
    icon: TrendingUp,
    label: "Productivity Tracking",
    description: "Data-driven insights on operational efficiency",
  },
  {
    icon: Layers,
    label: "Centralized Information",
    description: "Single source of truth for the entire team",
  },
];

export function CentralizedSolution() {
  return (
    <section className="centralized-solution">
      {/* Mesh gradient esmeralda sutil (vibe "solução/resolução") */}
      <div className="solution-bg" />

      <div className="container">
        <div className="solution-content">
          {/* TEXTO */}
          <div className="solution-text">
            <span className="solution-badge">
              <span className="badge-solution-icon">✓</span>
              The Solution
            </span>

            <h2 className="section-title">
              A{" "}
              <span className="title-accent-emerald">
                Centralized
              </span>
              <br />
              Platform for
              <br />
              <span className="title-accent">Operations</span>
            </h2>

            <p className="section-description">
              A single enterprise platform designed to organize
              workflows, monitor progress and restore full
              operational visibility across your organization.
            </p>

            {/* LISTA DE FEATURES */}
            <div className="solution-list">
              {solutions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="solution-item"
                    style={{ animationDelay: `${0.3 + index * 0.08}s` }}
                  >
                    <div className="solution-item-check">
                      <Icon className="solution-item-icon" />
                    </div>

                    <div className="solution-item-content">
                      <h4>{item.label}</h4>
                      <span>{item.description}</span>
                    </div>

                    <div className="solution-item-arrow">
                      →
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* IMAGEM COM TRATAMENTO PREMIUM */}
          <div className="solution-image-wrapper">
            <div className="solution-image-glow" />
            <div className="solution-image-decoration" />

            <div className="solution-image">
              <div className="preview-header">
                <div className="preview-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="preview-title">
                  solution.dashboard.app
                </span>
                <div className="preview-placeholder" />
              </div>

              <img
                src="/projects/saas-data-control/textures/solution-dashboard.png"
                alt="Centralized Solution"
              />
            </div>

            {/* Floating stat card (detalhe cinematográfico) */}
            <div className="floating-stat floating-stat-1">
              <span className="floating-stat-label">
                Operational Efficiency
              </span>
              <span className="floating-stat-value">
                +87%
                <span className="floating-stat-trend">↑</span>
              </span>
            </div>

            <div className="floating-stat floating-stat-2">
              <span className="floating-stat-label">
                Tasks Completed
              </span>
              <span className="floating-stat-value">
                1,247
                <span className="floating-stat-trend">↑</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}