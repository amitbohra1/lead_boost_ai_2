"use client";

import { InventoryTable } from "../Inventory/InventoryTable";
import { InventoryDataCards } from "../Inventory/InventoryDataCards";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectInventoryView, setInventoryView } from "@/store/slices/uiSlice";
import { ViewToggle } from "@/components/ui/view-toggle";
import { useGetInventoryOverview } from "../api/api";
import { Spinner } from "@/components/ui/spinner";

interface InventoryOverviewTabProps {
  filters: any;
  isLoadingInventory: boolean;
}
export function InventoryOverviewTab({ filters, isLoadingInventory }: InventoryOverviewTabProps) {
  const dispatch = useAppDispatch();
  const view = useAppSelector(selectInventoryView);
  const { data, isLoading } = useGetInventoryOverview(
   filters
  );

  if (isLoading || isLoadingInventory) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            Vehicle Inventory
          </h2>
          <ViewToggle
            view={view}
            onViewChange={(newView) => dispatch(setInventoryView(newView))}
          />
        </div>

        {view === "card" ? (
          <InventoryDataCards data={data} />
        ) : (
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <InventoryTable data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
