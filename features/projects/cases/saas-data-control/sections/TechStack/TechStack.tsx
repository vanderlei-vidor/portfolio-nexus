"use client";

import { Database, FileOutput, Monitor, Server } from "lucide-react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { saasDataControlContent } from "../../content";
import "./TechStack.css";

const stackIcons = {
  backend: Server,
  data: Database,
  frontend: Monitor,
  reporting: FileOutput,
} as const;

export function TechStack() {
  const { locale } = useLanguage();
  const content = saasDataControlContent[locale].stack;

  return (
    <section className="tech-stack" aria-labelledby="saas-data-control-stack-title">
      <div className="tech-stack-bg" aria-hidden="true" />

      <div className="container">
        <div className="tech-stack-header">
          <span className="tech-badge">
            <span className="tech-badge-code" aria-hidden="true">
              &lt;/&gt;
            </span>
            {content.badge}
          </span>

          <h2 id="saas-data-control-stack-title" className="section-title">
            {content.title} <span className="title-accent">{content.titleAccent}</span>
          </h2>

          <p className="section-description">{content.description}</p>
        </div>

        <div className="tech-stack-grid">
          {content.groups.map((group, groupIndex) => {
            const Icon = stackIcons[group.id];

            return (
              <article
                key={group.id}
                className={`stack-card stack-card-${group.id}`}
                data-group={group.id}
                style={{ animationDelay: `${0.1 + groupIndex * 0.1}s` }}
              >
                <div className="stack-card-header">
                  <div className="stack-card-dots" aria-hidden="true">
                    <span className="dot-red" />
                    <span className="dot-yellow" />
                    <span className="dot-green" />
                  </div>

                  <span className="stack-card-path">~/{group.id}/config</span>
                </div>

                <div className="stack-card-info">
                  <div className="stack-card-icon-wrapper" aria-hidden="true">
                    <Icon className="stack-card-icon" />
                  </div>

                  <div className="stack-card-text">
                    <h3 className="stack-card-title">{group.title}</h3>
                    <span className="stack-card-subtitle">{group.subtitle}</span>
                  </div>

                  <span className="stack-card-status">{group.status}</span>
                </div>

                <div className="stack-list">
                  {group.technologies.map((tech, techIndex) => (
                    <span
                      key={tech.name}
                      className="stack-item"
                      style={{
                        animationDelay: `${0.3 + groupIndex * 0.1 + techIndex * 0.05}s`,
                      }}
                    >
                      <span className="stack-item-name">{tech.name}</span>
                      <span className="stack-item-tag">{tech.tag}</span>
                    </span>
                  ))}
                </div>

                <div className="stack-card-glow" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
