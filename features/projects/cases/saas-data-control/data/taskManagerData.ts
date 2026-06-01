import { ClipboardList, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export const metrics = [
  {
    value: "127",
    label: "Total Tasks",
    icon: ClipboardList,
    trend: { value: "12%", positive: true }
  },
  {
    value: "94",
    label: "Completed",
    icon: CheckCircle,
    trend: { value: "8%", positive: true }
  },
  {
    value: "23",
    label: "In Progress",
    icon: Clock,
    trend: { value: "3%", positive: false }
  },
  {
    value: "10",
    label: "Overdue",
    icon: AlertTriangle,
    trend: { value: "5%", positive: false }
  }
];