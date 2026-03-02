"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setBodyType,
  setDemandLevel,
  setVinNumber,
  setLeadsPerDay,
  selectFilters,
  setStore,
} from "@/store/slices/filterSlice";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDashboardBody,
  useGetLeadPerDay,
  useGetStore,
  useGetVin,
} from "../api/api";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function LeadFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const { data: body, isLoading, isError } = useDashboardBody();
  const { data: store } = useGetStore();
  const { data: vin } = useGetVin();
  const { data: leadPerDay } = useGetLeadPerDay();
  const [vinSearch, setVinSearch] = useState("");
  const [visibleCounts, setVisibleCounts] = useState({
    vin: 20,
    body: 20,
    lead: 20,
  });
  const allBodies = body?.response?.bodies || [];
  const allLeads = leadPerDay?.response?.lead_per_day || [];
  const filteredVins =
    vin?.response?.vins?.filter((v: string) =>
      v.toLowerCase().includes(vinSearch.toLowerCase()),
    ) || [];

  const visibleBodies = allBodies.slice(0, visibleCounts.body);
  const visibleVins = filteredVins.slice(0, visibleCounts.vin);
  const visibleLeads = allLeads.slice(0, visibleCounts.lead);
  useEffect(() => {
    setVisibleCounts({
      vin: 20,
      body: 20,
      lead: 20,
    });
  }, [vinSearch, body]);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      <div className="space-y-2">
        <Label htmlFor="body-type" className="text-sm font-medium">
          Body Type
        </Label>

        <Select
          value={filters.body_type}
          onValueChange={(value) => dispatch(setBodyType(value))}
        >
          <SelectTrigger id="body-type" className="max-w-72 w-full">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>

          <SelectContent className="max-h-64">
            {isLoading && (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            )}

            {isError && (
              <SelectItem value="error" disabled>
                Failed to load
              </SelectItem>
            )}

            <div
              className="max-h-56 overflow-y-auto"
              onScroll={(e) => {
                const target = e.currentTarget;

                if (
                  target.scrollTop + target.clientHeight >=
                  target.scrollHeight - 5
                ) {
                  setVisibleCounts((prev) => ({
                    ...prev,
                    body: prev.body + 20,
                  }));
                }
              }}
            >
              {visibleBodies.map((bodyType: string) => (
                <SelectItem key={bodyType} value={bodyType}>
                 <p className="truncate max-w-72">{bodyType}</p>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      {/* Demand Level Filter */}
      <div className="space-y-2">
        <Label htmlFor="demand-level" className="text-sm font-medium">
          Demand Level
        </Label>
        <Select
          value={filters.demand_level}
          onValueChange={(value) => dispatch(setDemandLevel(value))}
        >
          <SelectTrigger id="demand-level" className="max-w-72 w-full">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem  value="Low"><p className="truncate max-w-72">Low</p></SelectItem>
            <SelectItem value="High"><p className="truncate max-w-72">High</p></SelectItem>
            <SelectItem value="High Borderline"><p className="truncate max-w-72">High Borderline</p></SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* VIN Number Filter */}
      <div className="space-y-2">
        <Label htmlFor="vin-number" className="text-sm font-medium">
          VIN Number
        </Label>

        <Select
          value={filters.vin}
          onValueChange={(value) => dispatch(setVinNumber(value))}
        >
          <SelectTrigger id="vin-number" className=" max-w-72 w-full">
            <SelectValue placeholder="Select VIN" />
          </SelectTrigger>

          <SelectContent className="max-h-64">
            <div className="flex items-center border-b px-3 pb-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                placeholder="Search VIN..."
                value={vinSearch}
                onChange={(e) => setVinSearch(e.target.value)}
                className="h-8 border-0 bg-transparent p-0 focus-visible:ring-0"
              />
            </div>
            <div
              className="max-h-56 overflow-y-auto"
              onScroll={(e) => {
                const target = e.currentTarget;

                if (
                  target.scrollTop + target.clientHeight >=
                  target.scrollHeight - 5
                ) {
                  setVisibleCounts((prev) => ({
                    ...prev,
                    vin: prev.vin + 20,
                  }));
                }
              }}
            >
              {visibleVins.map((vinNumber: string) => (
                <SelectItem key={vinNumber} value={vinNumber}>
                 <p className="truncate max-w-72">{vinNumber}</p>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      {/* Max Weeks Unsold Filter */}
      <div className="space-y-2">
        <Label htmlFor="max-weeks" className="text-sm font-medium">
          Store
        </Label>
        <Select
          value={filters.store}
          onValueChange={(value) => dispatch(setStore(value))}
        >
          <SelectTrigger id="max-weeks" className="max-w-72 w-full">
            <SelectValue placeholder="Select store" />
          </SelectTrigger>
          <SelectContent>
            {store?.response?.stores?.map((store: string) => (
              <SelectItem key={store} value={store}>
                <p className="truncate max-w-72">{store}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Leads Per Day Filter */}
      <div className="space-y-2">
        <Label htmlFor="leads-per-day" className="text-sm font-medium">
          Leads / Day
        </Label>
         <Select
          value={filters.leads_per_day}
          onValueChange={(value) => dispatch(setLeadsPerDay(value))}
        >
          <SelectTrigger id="leads-per-day" className="max-w-72 w-full">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>

          <SelectContent className="max-h-64">
            <div
              className="max-h-56 overflow-y-auto"
              onScroll={(e) => {
                const target = e.currentTarget;

                if (
                  target.scrollTop + target.clientHeight >=
                  target.scrollHeight - 5
                ) {
                  setVisibleCounts((prev) => ({
                    ...prev,
                    lead: prev.lead + 20,
                  }));
                }
              }}
            >
              {visibleLeads.map((range: string) => (
                <SelectItem key={range} value={range}>
                  <p className="truncate max-w-72"> ≤ {range}</p>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
