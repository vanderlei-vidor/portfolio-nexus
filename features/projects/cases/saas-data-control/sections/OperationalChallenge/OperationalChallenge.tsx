import "./OperationalChallenge.css";

import {
  Workflow,
  EyeOff,
  FolderSearch,
  TimerOff,
} from "lucide-react";

const challenges = [
  {
    icon: Workflow,
    number: "01",
    title: "Decentralized Task Control",
    description:
      "Tasks spread across multiple tools and disconnected workflows creating operational chaos.",
    tag: "WORKFLOW",
  },
  {
    icon: EyeOff,
    number: "02",
    title: "Limited Operational Visibility",
    description:
      "Difficulty tracking progress, bottlenecks and real team productivity across departments.",
    tag: "VISIBILITY",
  },
  {
    icon: FolderSearch,
    number: "03",
    title: "Scattered Reporting",
    description:
      "Reports generated manually from multiple sources, resulting in delayed and inconsistent data.",
    tag: "DATA",
  },
  {
    icon: TimerOff,
    number: "04",
    title: "Manual Tracking Processes",
    description:
      "Operational activities monitored through repetitive manual tasks consuming valuable time.",
    tag: "EFFICIENCY",
  },
];

export function OperationalChallenge() {
  return (
    <section className="operational-challenge">
      {/* Mesh gradient âmbar sutil (vibe "alerta") */}
      <div className="challenge-bg" />

      <div className="container">
        <div className="challenge-header">
          <span className="challenge-badge">
            <span className="badge-warning-dot" />
            Pain Points
          </span>

          <h2 className="section-title">
            Operational{" "}
            <span className="title-accent-warning">Challenges</span>
          </h2>

          <p className="section-description">
            Many teams struggle with fragmented processes,
            limited visibility and manual task tracking
            that slow down business operations.
          </p>
        </div>

        <div className="challenge-grid">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <div
                key={challenge.title}
                className="challenge-card"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                {/* Número editorial no canto */}
                <span className="challenge-number">
                  {challenge.number}
                </span>

                <div className="challenge-card-inner">
                  <div className="challenge-icon-wrapper">
                    <Icon className="challenge-icon" />
                  </div>

                  <span className="challenge-tag">
                    {challenge.tag}
                  </span>

                  <h3 className="challenge-title">
                    {challenge.title}
                  </h3>

                  <p className="challenge-description">
                    {challenge.description}
                  </p>

                  <div className="challenge-footer">
                    <span className="challenge-status">
                      <span className="status-dot" />
                      Critical Issue
                    </span>
                  </div>
                </div>

                {/* Glow no hover */}
                <div className="challenge-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}