"use client";

import { useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Activity,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { vi } from "date-fns/locale";
import { ApiInventoryItem } from "@/interface/interface";

interface InventoryDataCardsProps {
  data: any;
}

export function InventoryDataCards({ data }: InventoryDataCardsProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 27;

  const safeValue = (value: any) => {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return "";
    }
    return value;
  };

  const formatCurrency = (value: any) => {
    if (value === null || value === undefined) return "";

    const num = Number(value);

    if (isNaN(num)) return value;

    return `$${num.toLocaleString()}`;
  };

  const inventoryData: Inventory[] = useMemo(() => {
    const apiData: ApiInventoryItem[] =
      data?.response?.overall_stock_data_combined || [];

    return apiData.map((item) => ({
      vehicleName: item.vehicle ?? "",
      vin: item.VIN ?? "",
      purchasePrice: safeValue(item.purchase_price),
      currentPrice: safeValue(item.current_price),
      daysUnsold: safeValue(item.age),
      avgLeadsPerDay: safeValue(item.avg_leads_per_day),
      totalLeads: safeValue(item.total_leads),
      trend: item.trend ?? "",
      demand: item.final_demand_prediction ?? "",
      aiSuggestion: item.ai_suggestion ?? "",
    }));
  }, [data]);

  const filteredInventoryData = useMemo(() => {
    if (!globalFilter.trim()) return inventoryData;

    const searchValue = globalFilter.toLowerCase();

    return inventoryData.filter(
      (item) =>
        item.vehicleName.toLowerCase().includes(searchValue) ||
        item.demand.toLowerCase().includes(searchValue) ||
        item.trend.toLowerCase().includes(searchValue),
    );
  }, [inventoryData, globalFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [globalFilter]);

  const totalPages = Math.ceil(filteredInventoryData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredInventoryData.slice(start, end);
  }, [filteredInventoryData, currentPage]);

  return (
    <div className="w-full">
      {/* SEARCH */}
      <div className="bg-muted/20 py-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="overflow-auto max-h-[80vh] h-screen py-4">
        {paginatedData.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            No vehicles found
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {paginatedData.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-2xl transition-all group-hover:scale-150" />

                  <div className="relative space-y-4">
                    {/* HEADER */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="h-6 w-6 text-primary" />

                        <Badge
                          className={
                            item.demand.toLowerCase().includes("high")
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-warning/10 text-warning border-warning/20"
                          }
                        >
                          {String(item.demand).replace(" Demand", "")}
                          {/* {item.demand} */}
                        </Badge>
                      </div>

                      {item.trend.toLowerCase() === "up" ? (
                        <Badge className="bg-success/10 text-success border-success/20">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          {item.trend}
                        </Badge>
                      ) : (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                          <TrendingDown className="mr-1 h-3 w-3" />
                          {item.trend}
                        </Badge>
                      )}
                    </div>

                    {/* VEHICLE */}
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {item.vehicleName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        <strong>VIN:</strong> {item.vin}
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-border pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-sm">Purchase Price</span>
                        </div>

                        <span className="font-semibold">
                          {formatCurrency(item.purchasePrice)}
                        </span>
                      </div>

                      {/* Current Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-sm">Current Price</span>
                        </div>

                        <span className="font-semibold text-primary">
                          {formatCurrency(item.currentPrice)}
                        </span>
                      </div>

                      {/* Days Unsold */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">Days Unsold</span>
                        </div>

                        <span className="font-semibold">
                          {item.daysUnsold} days
                        </span>
                      </div>

                      {/* Avg Leads Per Day */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Activity className="h-4 w-4" />
                          <span className="text-sm">Avg Leads/Day</span>
                        </div>

                        <span className="font-semibold">
                          {item.avgLeadsPerDay}
                        </span>
                      </div>

                      {/* Total Leads */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Activity className="h-4 w-4" />
                          <span className="text-sm">Total Leads</span>
                        </div>

                        <span className="font-semibold text-accent">
                          {item.totalLeads}
                        </span>
                      </div>
                    </div>

                    {/* AI SUGGESTION */}
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        AI Suggestion
                      </p>

                      <p className="text-xs text-card-foreground">
                        {item.aiSuggestion || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
