"use client";

import {
  Cylinder,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  Layout,
  Layers,
  Monitor,
  Server,
  Settings,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { saasDataControlContent } from "../../content";
import "./EnterpriseArchitecture.css";

const architectureFlowIcons = [Monitor, Server, Layers, GitBranch, Cylinder] as const;
const architectureFeatureIcons = [Shield, Globe, Layout, Database, HardDrive] as const;

export function EnterpriseArchitecture() {
  const { locale } = useLanguage();
  const content = saasDataControlContent[locale].architecture;

  return (
    <section className="enterprise-architecture" aria-labelledby="saas-data-control-architecture-title">
      <div className="architecture-bg" aria-hidden="true" />

      <div className="container">
        <div className="architecture-header">
          <span className="architecture-badge">
            <Settings className="badge-icon" size={14} aria-hidden="true" />
            {content.badge}
          </span>

          <h2 id="saas-data-control-architecture-title" className="section-title">
            {content.title} <span className="title-accent">{content.titleAccent}</span>
          </h2>

          <p className="section-description">{content.description}</p>
        </div>

        <div className="architecture-content">
          <div className="architecture-flow">
            <div className="flow-header">
              <span className="flow-label">{content.flowLabel}</span>
              <span className="flow-sublabel">{content.flowSublabel}</span>
            </div>

            <div className="flow-nodes">
              {content.flow.map((item, index) => {
                const Icon = architectureFlowIcons[index];
                const isLast = index === content.flow.length - 1;

                return (
                  <div
                    key={item.label}
                    className="flow-node-wrapper"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <article className="architecture-node">
                      <div className="node-index">{String(index + 1).padStart(2, "0")}</div>

                      <div className="node-icon" aria-hidden="true">
                        <Icon />
                      </div>

                      <div className="node-content">
                        <h4 className="node-label">{item.label}</h4>
                        <span className="node-desc">{item.desc}</span>
                      </div>
                    </article>

                    {!isLast && (
                      <div className="architecture-connector" aria-hidden="true">
                        <div className="connector-line" />
                        <div className="connector-dot" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="architecture-features-wrapper">
            <div className="features-header">
              <span className="features-label">{content.coreLabel}</span>
              <h3 className="features-title">{content.coreTitle}</h3>
            </div>

            <div className="architecture-features">
              {content.features.map((feature, index) => {
                const Icon = architectureFeatureIcons[index];

                return (
                  <article
                    key={feature.label}
                    className="architecture-feature"
                    style={{ animationDelay: `${0.2 + index * 0.08}s` }}
                  >
                    <div className="feature-icon" aria-hidden="true">
                      <Icon />
                    </div>

                    <div className="feature-content">
                      <h4>{feature.label}</h4>
                      <span>{feature.desc}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
