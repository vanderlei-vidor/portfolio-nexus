import "./TechStack.css";

import {
  Server,
  Database,
  Monitor,
  FileOutput,
} from "lucide-react";

const stackGroups = [
  {
    id: "backend",
    icon: Server,
    title: "Backend",
    subtitle: "Core Runtime",
    status: "PRODUCTION READY",
    technologies: [
      { name: "Java 17", tag: "LTS" },
      { name: "Spring Boot 3", tag: "Latest" },
      { name: "Spring Security", tag: "Stable" },
      { name: "REST APIs", tag: "Standard" },
    ],
  },
  {
    id: "data",
    icon: Database,
    title: "Data Layer",
    subtitle: "Persistence & ORM",
    status: "ENTERPRISE GRADE",
    technologies: [
      { name: "PostgreSQL", tag: "ACID" },
      { name: "JPA", tag: "Standard" },
      { name: "Hibernate", tag: "Stable" },
    ],
  },
  {
    id: "frontend",
    icon: Monitor,
    title: "Frontend",
    subtitle: "Presentation Layer",
    status: "RESPONSIVE",
    technologies: [
      { name: "Thymeleaf", tag: "Template" },
      { name: "Bootstrap", tag: "Framework" },
      { name: "Chart.js", tag: "Visualization" },
    ],
  },
  {
    id: "reporting",
    icon: FileOutput,
    title: "Reporting",
    subtitle: "Document Generation",
    status: "AUDIT READY",
    technologies: [
      { name: "Apache POI", tag: "XLSX" },
      { name: "iText", tag: "PDF" },
    ],
  },
];

export function TechStack() {
  return (
    <section className="tech-stack">
      {/* Mesh gradient principal */}
      <div className="tech-stack-bg" />

      <div className="container">
        <div className="tech-stack-header">
          <span className="tech-badge">
            <span className="tech-badge-code">&lt;/&gt;</span>
            Development Stack
          </span>

          <h2 className="section-title">
            Technology{" "}
            <span className="title-accent">Stack</span>
          </h2>

          <p className="section-description">
            Modern enterprise-grade technologies carefully
            selected to provide reliability, maintainability
            and long-term scalability.
          </p>
        </div>

        <div className="tech-stack-grid">
          {stackGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <div
                key={group.id}
                className={`stack-card stack-card-${group.id}`}
                data-group={group.id}
                style={{ animationDelay: `${0.1 + groupIndex * 0.1}s` }}
              >
                {/* Terminal header */}
                <div className="stack-card-header">
                  <div className="stack-card-dots">
                    <span className="dot-red" />
                    <span className="dot-yellow" />
                    <span className="dot-green" />
                  </div>

                  <span className="stack-card-path">
                    ~/{group.id}/config
                  </span>
                </div>

                {/* Título + ícone + status */}
                <div className="stack-card-info">
                  <div className="stack-card-icon-wrapper">
                    <Icon className="stack-card-icon" />
                  </div>

                  <div className="stack-card-text">
                    <h3 className="stack-card-title">
                      {group.title}
                    </h3>
                    <span className="stack-card-subtitle">
                      {group.subtitle}
                    </span>
                  </div>

                  <span className="stack-card-status">
                    {group.status}
                  </span>
                </div>

                {/* Lista de tecnologias */}
                <div className="stack-list">
                  {group.technologies.map((tech, techIndex) => (
                    <span
                      key={tech.name}
                      className="stack-item"
                      style={{
                        animationDelay: `${
                          0.3 + groupIndex * 0.1 + techIndex * 0.05
                        }s`,
                      }}
                    >
                      <span className="stack-item-name">
                        {tech.name}
                      </span>
                      <span className="stack-item-tag">
                        {tech.tag}
                      </span>
                    </span>
                  ))}
                </div>

                {/* Glow da cor da categoria */}
                <div className="stack-card-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}