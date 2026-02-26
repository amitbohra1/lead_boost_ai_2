import { FilterPayload } from "@/interface/interface";
import { apicall } from "@/services/apicall";
// import { apiRequest } from "@/services/apirequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useDashboardBody = () => {
  return useQuery({
    queryKey: ["bodyType"],
    queryFn: async () => {
      const response = await apicall("get", "/dashboard/body", {});
      const resData = response.data;
      return resData;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

};

export const useGetStore = () => {
  return useQuery({
    queryKey: ["store"],
    queryFn: async () => {
      const response = await apicall("get", "/dashboard/store", {});
      const resData = response.data;
      return resData;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useGetVin = () => {
  return useQuery({
    queryKey: ["vin"],
    queryFn: async () => {
      const response = await apicall("get", "/dashboard/vin", {});
      const resData = response.data;
      return resData;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useApplyFilters = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FilterPayload) => {
      const response = await apicall("post", "/dashboard/filter", payload);
      const resData = response.data;
      return resData;
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        queryClient.invalidateQueries({
          queryKey: [""],
        });
      }
    }
  });
};

export const useGetFilter = (
  payload?: Partial<FilterPayload>,
  enabled = true
) => {
  const defaultPayload: FilterPayload = {
    token: payload?.token ?? "",  
    body_type: payload?.body_type ?? "",
    demand_level: payload?.demand_level ?? "",
    vin: payload?.vin ?? "",
    store: payload?.store ?? "",
    leads_per_day: payload?.leads_per_day ?? "",
  };

  return useQuery({
    queryKey: ["get-filter", defaultPayload],
    queryFn: async () => {
      const response = await apicall(
        "post",
        "/dashboard/filter",
        defaultPayload
      );
      return response.data;
    },
    enabled,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};


export const useGetLeadPerformance = (
  payload?: Partial<FilterPayload>,
  enabled = true
) => {
  const defaultPayload: FilterPayload = {
   token: payload?.token ?? "",  
    body_type: payload?.body_type ?? "",
    demand_level: payload?.demand_level ?? "",
    vin: payload?.vin ?? "",
    store: payload?.store ?? "",
    leads_per_day: payload?.leads_per_day ?? "",
  };

  return useQuery({
    queryKey: ["get-leadperformance", defaultPayload],
    queryFn: async () => {
      const response = await apicall(
        "post",
        "/dashboard/leadperformance",
        defaultPayload
      );
      return response.data;
    },
    enabled,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useApplyFilterForLeads = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FilterPayload) => {
      const response = await apicall("post", "/dashboard/leadperformance", payload);
      const resData = response.data;
      return resData;
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        queryClient.invalidateQueries({
          queryKey: [""],
        });
      }
    }
  });
};

export const useGetJobHealth = () => {
  return useQuery({
    queryKey: ["job-health"],
    queryFn: async () => {
      const response = await apicall("get", "/dashboard/job_health", {});
      const resData = response.data;
      return resData;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useGetLeadPerDay = () => {
  return useQuery({
    queryKey: ["lead-per-day"],
    queryFn: async () => {
      const response = await apicall("get", "/dashboard/lead_per_day", {});
      const resData = response.data;
      return resData;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useGetOverallMetrics = (token: string) => {
  return useQuery({
    queryKey: ["overall-metrics", token],   
    queryFn: async () => {
      const response = await apicall("post", "/dashboard/overall_metrics", {
        token: "",   
      });

      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
};


export const useGetInventoryOverview = (
  payload?: Partial<FilterPayload>,
  enabled = true
) => {
  const defaultPayload: FilterPayload = {
   token: payload?.token ?? "",  
    body_type: payload?.body_type ?? "",
    demand_level: payload?.demand_level ?? "",
    vin: payload?.vin ?? "",
    store: payload?.store ?? "",
    leads_per_day: payload?.leads_per_day ?? "",
  };

  return useQuery({
    queryKey: ["get-inventory-overview", defaultPayload],
    queryFn: async () => {
      const response = await apicall(
        "post",
        "/dashboard/inventory_overview",
        defaultPayload
      );
      return response.data;
    },
    enabled,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useGetDemandCount = () => {
  return useQuery({
    queryKey: ["demand-count"],
    queryFn: async () => {
      const response = await apicall("get", "/dashboard/demand_count", {})

      const demandData = response.data.response.demand_count

      const weeks = demandData.map((item: any) => item.label)
      const highDemand = demandData.map((item: any) => item.high_demand_pct)
      const lowDemand = demandData.map((item: any) => item.low_demand_pct)

      return { weeks, highDemand, lowDemand }
    },
    refetchOnWindowFocus: false,
    retry: 1,
  })
}
