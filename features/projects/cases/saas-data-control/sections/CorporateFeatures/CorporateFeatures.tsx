import "./CorporateFeatures.css";

import {
  ShieldCheck,
  BarChart3,
  FileText,
  FileSpreadsheet,
  Smartphone,
  Database,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    number: "01",
    tag: "SECURITY",
    title: "Secure Authentication",
    description:
      "Role-based access control implemented with Spring Security and JWT token management.",
  },
  {
    icon: BarChart3,
    number: "02",
    tag: "ANALYTICS",
    title: "Analytics Dashboard",
    description:
      "Real-time metrics and operational visibility with customizable KPI monitoring.",
  },
  {
    icon: FileText,
    number: "03",
    tag: "REPORTING",
    title: "PDF Reports",
    description:
      "Generate professional reports for analysis, auditing and executive presentations.",
  },
  {
    icon: FileSpreadsheet,
    number: "04",
    tag: "EXPORT",
    title: "Excel Export",
    description:
      "Export structured data in XLSX format for external processing and integration.",
  },
  {
    icon: Smartphone,
    number: "05",
    tag: "UX",
    title: "Responsive Experience",
    description:
      "Consistent usability across desktop, tablet and mobile devices with adaptive layouts.",
  },
  {
    icon: Database,
    number: "06",
    tag: "STORAGE",
    title: "PostgreSQL Persistence",
    description:
      "Reliable data storage with scalable relational modeling and ACID compliance.",
  },
];

export function CorporateFeatures() {
  return (
    <section className="corporate-features">
      {/* Mesh gradient principal */}
      <div className="corp-features-bg" />

      <div className="container">
        <div className="features-header">
          <span className="corp-badge">
            <span className="corp-badge-icon">◆</span>
            Enterprise Capabilities
          </span>

          <h2 className="section-title">
            Built for{" "}
            <span className="title-accent">
              Corporate
            </span>
            <br />
            Operations
          </h2>

          <p className="section-description">
            A comprehensive suite of enterprise-grade features
            engineered to support operational efficiency,
            security compliance and long-term business growth.
          </p>
        </div>

        <div className="features-list">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-item"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                {/* Número editorial gigante no fundo */}
                <span className="feature-number-bg">
                  {feature.number}
                </span>

                <div className="feature-item-inner">
                  {/* Número pequeno + ícone */}
                  <div className="feature-visual">
                    <span className="feature-number">
                      {feature.number}
                    </span>

                    <div className="feature-icon-wrapper">
                      <Icon className="feature-icon-svg" />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="feature-content">
                    <span className="feature-tag">
                      {feature.tag}
                    </span>

                    <h3 className="feature-title">
                      {feature.title}
                    </h3>

                    <p className="feature-description">
                      {feature.description}
                    </p>
                  </div>

                  {/* Seta no hover 
                  <div className="feature-arrow">
                    <span>View details</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>*/}
                </div>

                {/* Glow no hover */}
                <div className="feature-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}