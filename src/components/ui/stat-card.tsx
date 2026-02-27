import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    format?: "badge" | "arrow";
  };
  colorScheme?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "info";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = "primary",
}: StatCardProps) {
  const colorClasses = {
    primary: "from-primary/10 to-primary/5 text-primary border-primary/20",
    secondary:
      "from-secondary/10 to-secondary/5 text-secondary border-secondary/20",
    accent: "from-accent/10 to-accent/5 text-accent border-accent/20",
    success: "from-success/10 to-success/5 text-success border-success/20",
    warning: "from-warning/10 to-warning/5 text-warning border-warning/20",
    info: "from-info/10 to-info/5 text-info border-info/20",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br p-3 transition-all hover:shadow-lg",
        colorClasses[colorScheme],
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-card-foreground">
            {value}
          </p>
          {trend && trend.format === "badge" && (
            <div>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    trend.isPositive
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive",
                  )}
                >
                  <span>{trend.isPositive ? "↑" : "↓"}</span>
                  <span>{Math.abs(trend.value)}%</span>
                </div>
                {subtitle && (
                  <p className="text-xs text-muted-foreground hidden xl:block">
                    {subtitle}
                  </p>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-muted-foreground block xl:hidden mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {subtitle && (!trend || trend.format !== "badge") && (
            <p
              className={cn(
                "text-xs",
                trend && trend.format === "arrow"
                  ? trend.isPositive
                    ? "text-success"
                    : "text-destructive"
                  : "text-muted-foreground",
              )}
            >
              {trend && trend.format === "arrow" && (
                <span className="mr-1">{trend.isPositive ? "↑" : "↓"}</span>
              )}
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn("rounded-lg", colorClasses[colorScheme])}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
