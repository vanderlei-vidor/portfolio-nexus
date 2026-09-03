import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  index?: number;
}

export function MetricCard({
  value,
  label,
  icon: Icon,
  trend,
  index = 0,
}: MetricCardProps) {
  return (
    <article
      className="metric-card"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
      aria-label={`${label}: ${value}`}
    >
      <div className="metric-card-header">
        <div className="metric-icon-wrapper" aria-hidden="true">
          <Icon className="metric-icon" />
        </div>

        {trend && (
          <span className={`metric-trend ${trend.positive ? "trend-positive" : "trend-negative"}`}>
            {trend.positive ? (
              <ArrowUpRight size={14} aria-hidden="true" />
            ) : (
              <ArrowDownRight size={14} aria-hidden="true" />
            )}
            {trend.value}
          </span>
        )}
      </div>

      <h3 className="metric-value">{value}</h3>
      <span className="metric-label">{label}</span>

      <div className="metric-card-glow" aria-hidden="true" />
    </article>
  );
}
