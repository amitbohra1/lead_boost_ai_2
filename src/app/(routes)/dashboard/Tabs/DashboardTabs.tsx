"use client"

import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectActiveTab, setActiveTab } from "@/store/slices/uiSlice"
import { InventoryOverviewTab } from "./InventoryOverviewTab"
import { Button } from "@/components/ui/button"
import { StatusRecodeTab } from "./StatusRecodeTab"
import { LeadPerformanceTab } from "./LeadPerformanceTab"
import { PerformanceTab } from "./PerformanceTab"

export function DashboardTabs() {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector(selectActiveTab)

  return (
    <div className="space-y-6">
      {/* Tab Switcher and Content */}
      <div className="rounded-2xl border border-border bg-card shadow-lg">
        {/* Tab Switcher */}
        <div className="border-b border-border px-6 py-4">
          <nav className="flex items-center gap-2">
            <Button
              variant={activeTab === "lead-performance" ? "default" : "ghost"}
              onClick={() => dispatch(setActiveTab("lead-performance"))}
              className="text-sm font-medium"
            >
              Lead Performance
            </Button>
            <Button
              variant={activeTab === "inventory-overview" ? "default" : "ghost"}
              onClick={() => dispatch(setActiveTab("inventory-overview"))}
              className="text-sm font-medium"
            >
              Inventory Overview
            </Button>
            <Button
              variant={activeTab === "performance" ? "default" : "ghost"}
              onClick={() => dispatch(setActiveTab("performance"))}
              className="text-sm font-medium"
            >
              Performance
            </Button>
            <Button
              variant={activeTab === "status-recode" ? "default" : "ghost"}
              onClick={() => dispatch(setActiveTab("status-recode"))}
              className="text-sm font-medium"
            >
              Jobs Health
            </Button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "lead-performance" && <LeadPerformanceTab />}
          {activeTab === "inventory-overview" && <InventoryOverviewTab />}
          {activeTab === "performance" && <PerformanceTab />}
          {activeTab === "status-recode" && <StatusRecodeTab />}
        </div>
      </div>
    </div>
  )
}
