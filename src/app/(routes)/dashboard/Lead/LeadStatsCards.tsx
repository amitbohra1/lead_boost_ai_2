"use client";

import { Spinner } from "@/components/ui/spinner";
import { StatCard } from "@/components/ui/stat-card";
import { Car, Users, TrendingUp, AlertCircle } from "lucide-react";
import { useGetInventoryOverview, useGetOverallMetrics } from "../api/api";

export function LeadStatsCards({ data, isLoading, token }: any) {
  const metrics = data?.response?.metrics;
const {
    data: overallData,
    isLoading: isOverallLoading,
  } = useGetOverallMetrics(token);


  const { data: actionData } = useGetInventoryOverview(token);
  console.log("Action Data:", actionData);
  const overallMetrics = overallData?.response?.metrics;
  if (isLoading || isOverallLoading) {
    return <div className="flex justify-center items-center"><Spinner /></div>;
  }
  if (isLoading) {
    return <div className="flex justify-center items-center"><Spinner /></div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Total Unsold Cars"
        value={metrics?.total_unsold_cars?.toLocaleString() || 0}
        subtitle="Compared to last week"
        icon={Car}
        colorScheme="primary"
        trend={{
          value: metrics?.total_unsold_cars_pct_compared_to_last_week || 0,
          isPositive:
            (metrics?.total_unsold_cars_pct_compared_to_last_week ?? 0) > 0,
          format: "badge",
        }}
      />

      <StatCard
        title="Total Leads"
        value={metrics?.total_leads_per_week?.toLocaleString() || 0}
        subtitle="Compared to last week"
        icon={Users}
        colorScheme="success"
        trend={{
          value:
            metrics?.total_leads_pct_compared_to_last_week || 0,
          isPositive:
            (metrics?.total_leads_pct_compared_to_last_week ?? 0) > 0,
          format: "badge",
        }}
      />

      <StatCard
        title="Avg Leads / Day"
        value={metrics?.avg_leads_per_day || 0}
        subtitle="Compared to last week"
        icon={TrendingUp}
        colorScheme="accent"
        trend={{
          value:
            metrics?.avg_leads_pct_compared_to_last_week || 0,
          isPositive:
            (metrics?.avg_leads_pct_compared_to_last_week ?? 0) > 0,
          format: "badge",
        }}
      />

      <StatCard
        title="Overall Avg / Day"
        value={overallMetrics?.overall_avg_leads?.toLocaleString() || 0}
        // subtitle={`Avg Leads: ${overallMetrics?.overall_avg_leads || 0}`}
        icon={TrendingUp}
        colorScheme="secondary"
      />

      <StatCard
        title="Action Items"
        value={actionData?.response?.action_items || 0}
        subtitle="Require price adjustment"
        icon={AlertCircle}
        colorScheme="warning"
      />
    </div>
  );
}
