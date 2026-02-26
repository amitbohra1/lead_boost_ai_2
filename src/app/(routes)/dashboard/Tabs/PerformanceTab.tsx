"use client"

import { DemandCategorisationChart } from "../Charts/DemandCategorisationChart"
import { ModelThreeChart } from "../Charts/ModelThreeChart"
import { PredictListPriceChart } from "../Charts/PredictListPriceChart"


export function PerformanceTab() {
  return (
    <div className="space-y-6">
      {/* Chart 1: Demand Categorisation */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 shadow-sm">
        <DemandCategorisationChart />
      </div>

      {/* Chart 2: Predict List Price */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 shadow-sm">
        <PredictListPriceChart />
      </div>

      {/* Chart 3: Model Three */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 shadow-sm">
        <ModelThreeChart />
      </div>
    </div>
  )
}
