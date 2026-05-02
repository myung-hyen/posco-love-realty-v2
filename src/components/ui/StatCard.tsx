import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-brand-500",
  iconBg = "bg-brand-50",
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
          <Icon size={20} className={iconColor} />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <div className="flex items-center gap-2">
        {change && (
          <span
            className={cn(
              "text-xs font-medium px-1.5 py-0.5 rounded",
              changeType === "up" && "text-emerald-700 bg-emerald-50",
              changeType === "down" && "text-red-700 bg-red-50",
              changeType === "neutral" && "text-slate-600 bg-slate-100"
            )}
          >
            {changeType === "up" && "▲ "}
            {changeType === "down" && "▼ "}
            {change}
          </span>
        )}
        {subtitle && <span className="text-xs text-slate-400">{subtitle}</span>}
      </div>
    </div>
  );
}
