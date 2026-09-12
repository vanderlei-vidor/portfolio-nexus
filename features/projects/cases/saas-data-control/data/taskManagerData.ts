import { AlertTriangle, CheckCircle, ClipboardList, Clock } from "lucide-react";

export const metrics = [
  {
    value: "Scope",
    label: "Task Ownership",
    icon: ClipboardList,
    trend: { value: "User", positive: true },
  },
  {
    value: "Flow",
    label: "Status Tracking",
    icon: CheckCircle,
    trend: { value: "Live", positive: true },
  },
  {
    value: "Risk",
    label: "Access Boundaries",
    icon: Clock,
    trend: { value: "Scoped", positive: true },
  },
  {
    value: "Docs",
    label: "Reports",
    icon: AlertTriangle,
    trend: { value: "Export", positive: true },
  },
];