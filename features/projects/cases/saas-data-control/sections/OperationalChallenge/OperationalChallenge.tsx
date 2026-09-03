"use client";

import { EyeOff, FolderSearch, TimerOff, Workflow } from "lucide-react";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { saasDataControlContent } from "../../content";
import "./OperationalChallenge.css";

const challengeIcons = [Workflow, EyeOff, FolderSearch, TimerOff] as const;

export function OperationalChallenge() {
  const { locale } = useLanguage();
  const content = saasDataControlContent[locale].challenges;

  return (
    <section className="operational-challenge" aria-labelledby="saas-data-control-challenges-title">
      <div className="challenge-bg" aria-hidden="true" />

      <div className="container">
        <div className="challenge-header">
          <span className="challenge-badge">
            <span className="badge-warning-dot" aria-hidden="true" />
            {content.badge}
          </span>

          <h2 id="saas-data-control-challenges-title" className="section-title">
            {content.title} <span className="title-accent-warning">{content.titleAccent}</span>
          </h2>

          <p className="section-description">{content.description}</p>
        </div>

        <div className="challenge-grid">
          {content.items.map((challenge, index) => {
            const Icon = challengeIcons[index];
            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                key={challenge.title}
                className="challenge-card"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <span className="challenge-number" aria-hidden="true">
                  {number}
                </span>

                <div className="challenge-card-inner">
                  <div className="challenge-icon-wrapper" aria-hidden="true">
                    <Icon className="challenge-icon" />
                  </div>

                  <span className="challenge-tag">{challenge.tag}</span>

                  <h3 className="challenge-title">{challenge.title}</h3>

                  <p className="challenge-description">{challenge.description}</p>

                  <div className="challenge-footer">
                    <span className="challenge-status">
                      <span className="status-dot" aria-hidden="true" />
                      {content.status}
                    </span>
                  </div>
                </div>

                <div className="challenge-glow" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
