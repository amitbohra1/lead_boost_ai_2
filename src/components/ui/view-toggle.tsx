"use client"

import { LayoutGrid, Table } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface ViewToggleProps {
  view: "table" | "card"
  onViewChange: (view: "table" | "card") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("card")}
        className={cn(
          "h-8 gap-2 transition-all",
          view === "card" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="text-xs font-medium">Card</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("table")}
        className={cn(
          "h-8 gap-2 transition-all",
          view === "table" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Table className="h-4 w-4" />
        <span className="text-xs font-medium">Table</span>
      </Button>
    </div>
  )
}
