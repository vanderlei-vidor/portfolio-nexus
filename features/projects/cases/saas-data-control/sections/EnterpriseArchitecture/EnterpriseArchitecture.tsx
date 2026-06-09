import "./EnterpriseArchitecture.css";

import {
  Monitor,
  Server,
  Layers,
  Database,
  Cylinder,
  Shield,
  Globe,
  Layout,
  GitBranch,
  HardDrive,
} from "lucide-react";

const architectureFlow = [
  { label: "Interface Web", icon: Monitor, desc: "React + TypeScript" },
  { label: "Spring Boot", icon: Server, desc: "REST API Gateway" },
  { label: "Camada de Serviços", icon: Layers, desc: "Business Logic" },
  { label: "JPA / Hibernate", icon: GitBranch, desc: "ORM Layer" },
  { label: "PostgreSQL", icon: Cylinder, desc: "Persistent Storage" },
];

const architectureFeatures = [
  { label: "Spring Security", icon: Shield, desc: "JWT + OAuth2" },
  { label: "REST APIs", icon: Globe, desc: "RESTful endpoints" },
  { label: "MVC Pattern", icon: Layout, desc: "Clean architecture" },
  { label: "JPA", icon: Database, desc: "Data persistence" },
  { label: "PostgreSQL", icon: HardDrive, desc: "ACID compliance" },
];

export function EnterpriseArchitecture() {
  return (
    <section className="enterprise-architecture">
      {/* Mesh gradient sutil */}
      <div className="architecture-bg" />

      <div className="container">
        <div className="architecture-header">
          <span className="architecture-badge">
            <span className="badge-icon">⚙</span>
            System Architecture
          </span>

          <h2 className="section-title">
            Architecture{" "}
            <span className="title-accent">Enterprise</span>
          </h2>

          <p className="section-description">
            A layered structure designed for scalability, maintainability, and continuous evolution in high-availability environments.
          </p>
        </div>

        <div className="architecture-content">
          {/* FLUXO VERTICAL */}
          <div className="architecture-flow">
            <div className="flow-header">
              <span className="flow-label">DATA FLOW</span>
              <span className="flow-sublabel">
                Request → Response Pipeline
              </span>
            </div>

            <div className="flow-nodes">
              {architectureFlow.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === architectureFlow.length - 1;

                return (
                  <div
                    key={item.label}
                    className="flow-node-wrapper"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <div className="architecture-node">
                      <div className="node-index">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="node-icon">
                        <Icon />
                      </div>

                      <div className="node-content">
                        <h4 className="node-label">{item.label}</h4>
                        <span className="node-desc">{item.desc}</span>
                      </div>
                    </div>

                    {!isLast && (
                      <div className="architecture-connector">
                        <div className="connector-line" />
                        <div className="connector-dot" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* FEATURES GRID */}
          <div className="architecture-features-wrapper">
            <div className="features-header">
              <span className="features-label">CORE STACK</span>
              <h3 className="features-title">
                Technologies Enterprise
              </h3>
            </div>

            <div className="architecture-features">
              {architectureFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.label}
                    className="architecture-feature"
                    style={{ animationDelay: `${0.2 + index * 0.08}s` }}
                  >
                    <div className="feature-icon">
                      <Icon />
                    </div>

                    <div className="feature-content">
                      <h4>{feature.label}</h4>
                      <span>{feature.desc}</span>
                    </div>
                    {/* flecha no hover
                    <div className="feature-arrow">→</div>  */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}