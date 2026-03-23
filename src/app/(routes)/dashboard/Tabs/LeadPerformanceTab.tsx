"use client"

import { LeadChart } from "../Charts/LeadChart"

interface LeadPerformanceTabProps {
isLoading: boolean;
}
export function LeadPerformanceTab({ isLoading }: LeadPerformanceTabProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 shadow-sm">
        <LeadChart isLoadingApi={isLoading} />
      </div>
    </div>
  )
}
