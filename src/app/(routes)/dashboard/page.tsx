"use client";

import { LeadFilters } from "./Filters/LeadFilters";
// import { InventoryFilters } from "./Filters/InventoryFilters";
import { LeadStatsCards } from "./Lead/LeadStatsCards";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DashboardTabs } from "./Tabs/DashboardTabs";
import { Button } from "@/components/ui/button";
import {
  useApplyFilterForLeads,
  useApplyFilters,
  useGetFilter,
} from "./api/api";
import { resetFilters, selectFilters } from "@/store/slices/filterSlice";
import { setLeadFilterData } from "@/store/slices/leadSlice";
import { useEffect, useState } from "react";
import { aesDecrypt } from "@/app/(auth)/crypto";
import { useFeatureList } from "../user-management/component/api";
import { setFeatures } from "@/store/redux/featureSlice";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [roleId, setRoleId] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("authorization");

    if (!auth) return;
    try {
      const decrypted = aesDecrypt(auth);
      const data = JSON.parse(decrypted);
      setRoleId(data?.role_id || "");
    } catch (error) {
      console.error("Invalid auth data");
    }
  }, []);

  const { data: features } = useFeatureList(roleId, !!roleId);

  useEffect(() => {
    if (features) {
      dispatch(setFeatures(features));
    }
  }, [features, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const {
    mutate: applyFilter,
    data: appliedData,
    isPending: isApplying,
  } = useApplyFilters();

  const { mutate: applyFilterForLeads } = useApplyFilterForLeads();

  const { data: defaultData, isLoading: isDefaultLoading } = useGetFilter({
    token: "",
    body_type: "",
    demand_level: "",
    vin: "",
    store: "",
    leads_per_day: "",
  });

  const handleApplyFilters = () => {
    const payload = {
      token: "",
      body_type: filters.body_type,
      demand_level: filters.demand_level,
      vin: filters.vin,
      store: filters.store,
      leads_per_day: filters.leads_per_day,
    };

    applyFilter(payload);

    applyFilterForLeads(payload, {
      onSuccess: (data) => {
        dispatch(setLeadFilterData(data));
      },
    });
  };

  const handleClearFilters = () => {
  dispatch(resetFilters());
};

  const finalData = appliedData || defaultData;
  const isLoading = isApplying || isDefaultLoading;
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="rounded-xl border border-border bg-primary-foreground p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">
              Filters
            </h2>
            <div className="flex gap-2">
            <Button variant={"default"} onClick={handleClearFilters}>
              Clear
            </Button>
            <Button variant={"default"} onClick={handleApplyFilters}>
              Apply
            </Button>
            </div>
          </div>
          <LeadFilters />
        </div>

        <LeadStatsCards data={finalData} isLoading={isLoading} />
        <DashboardTabs />
      </main>
    </div>
  );
}
