"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Activity,
} from "lucide-react";

interface ApiInventoryItem {
  stock: string;
  vehicle: string;
  age: number;
  total_leads: number;
  avg_leads_per_day: number;
  VIN: string;
  current_price: string;
  purchase_price: string;
  trend: string;
  demand: string;
  ai_suggestion: string;
  final_demand_prediction: string;
}

interface InventoryDataCardsProps {
  data: any;
}

type InventoryCard = {
  id: string;
  carName: string;
  currentPrice: number;
  daysUnsold: number;
  totalLeads: number;
  trend: string;
  demand: string;
  aiSuggestion: string;
};

export function InventoryDataCards({ data }: InventoryDataCardsProps) {
  // ✅ Map API response
  const inventoryData: InventoryCard[] = useMemo(() => {
    const apiData: ApiInventoryItem[] =
      data?.response?.overall_stock_data_combined || [];

    return apiData.map((item) => ({
      id: item.stock,
      carName: item.vehicle,
      currentPrice: Number(item.current_price || 0),
      daysUnsold: item.age,
      totalLeads: item.total_leads,
      trend: item.trend?.toLowerCase() === "up" ? "Up" : "Down",
      demand:
        item.final_demand_prediction === "High Demand" ? "High" : "Medium",
      aiSuggestion: item.ai_suggestion,
    }));
  }, [data]);

  return (
    <div className="overflow-auto max-h-[450px]">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {inventoryData.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
          >
            <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-2xl transition-all group-hover:scale-150" />

            <div className="relative space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-6 w-6 text-primary" />

                  <Badge
                    variant="outline"
                    className={
                      item.demand === "High"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-warning/10 text-warning border-warning/20"
                    }
                  >
                    {item.demand} Demand
                  </Badge>
                </div>

                {item.trend === "Up" ? (
                  <TrendingUp className="h-5 w-5 text-success" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>

              {/* Car Name */}
              <div>
                <h3 className="text-lg font-semibold leading-tight text-card-foreground">
                  {item.carName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Stock ID: {item.id}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">Current Price</span>
                  </div>
                  <span className="font-semibold text-primary">
                    ${item.currentPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Days Unsold</span>
                  </div>
                  <span className="font-semibold text-card-foreground">
                    {item.daysUnsold} days
                  </span>
                </div>

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

              {/* AI Suggestion */}
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  AI Suggestion:
                </p>
                <p className="text-xs text-card-foreground">
                  {item.aiSuggestion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
