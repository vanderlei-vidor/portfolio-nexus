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
    <div
      className="metric-card"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      <div className="metric-card-header">
        <div className="metric-icon-wrapper">
          <Icon className="metric-icon" />
        </div>

        {trend && (
          <span
            className={`metric-trend ${
              trend.positive ? "trend-positive" : "trend-negative"
            }`}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>

      <h3 className="metric-value">{value}</h3>
      <span className="metric-label">{label}</span>

      <div className="metric-card-glow" />
    </div>
  );
}