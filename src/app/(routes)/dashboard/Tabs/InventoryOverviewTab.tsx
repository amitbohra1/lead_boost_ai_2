"use client";

import { InventoryTable } from "../Inventory/InventoryTable";
import { InventoryDataCards } from "../Inventory/InventoryDataCards";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectInventoryView, setInventoryView } from "@/store/slices/uiSlice";
import { ViewToggle } from "@/components/ui/view-toggle";
import { selectFilters } from "@/store/slices/filterSlice";
import { useGetInventoryOverview } from "../api/api";
import { Spinner } from "@/components/ui/spinner";

export function InventoryOverviewTab() {
  const dispatch = useAppDispatch();
  const view = useAppSelector(selectInventoryView);
  const filters = useAppSelector(selectFilters);
  const { data, isLoading, isFetching, error } = useGetInventoryOverview(
    filters,
    true,
  );

  // ✅ Show spinner when API is pending (initial + refetch)
  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
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
