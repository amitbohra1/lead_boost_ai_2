"use client";

import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppSelector } from "@/store/hooks";
import { selectTheme } from "@/store/slices/themeSlice";
import { selectLeadFilterData } from "@/store/slices/leadSlice";
import { getChartColors } from "@/theme/chartColors";
import { useGetLeadPerformance } from "../api/api";
import { Spinner } from "@/components/ui/spinner";

interface LeadChartProps {
  isLoadingApi: boolean; 
}
export function LeadChart( { isLoadingApi }: LeadChartProps) {
  const theme = useAppSelector(selectTheme);
  const reduxLead = useAppSelector(selectLeadFilterData);

  const { data: defaultLead, isLoading } = useGetLeadPerformance();
  const lead = reduxLead || defaultLead;
  const graphData = lead?.response?.graph_data || [];

  const options = useMemo(() => {
    const colors = getChartColors(theme);
    const categories = graphData.map((item: any) => item.label);
    const chartData = graphData.map((item: any) => ({
      y: item.value,
      customDate: item.date,
      totalLeads: item.total_leads,
    }));

    return {
      chart: {
        type: "line",
        backgroundColor: colors.backgroundColor,
        height: 400,
      },
      title: { text: undefined },
      credits: { enabled: false },

      xAxis: {
        categories,
        labels: { style: { color: colors.textColor } },
        gridLineColor: colors.gridColor,
        lineColor: colors.gridColor,
      },

      yAxis: {
        title: { text: "Avg Leads / Day" },
        min: 0,
        labels: { style: { color: colors.textColor } },
        gridLineColor: colors.gridColor,
      },

      tooltip: {
        formatter: function () {
          const point = this as any;

          const formattedDate = new Date(
            point.point.options.customDate
          ).toLocaleDateString();

          return `
            <b>Date :</b> ${formattedDate}<br/><b>Avg Leads / Day :</b> ${point.y}<br/><b>Total Leads :</b> ${point.point.options.totalLeads}`;
        },
      },
      series: [
        {
          type: "line",
          name: "Avg Leads / Day",
          data: chartData,
          color: colors.chart1,
        },
      ],
    };
  }, [theme, graphData]);

  if (isLoading || isLoadingApi) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (!graphData || graphData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 border rounded-lg bg-background">
        <p className="text-muted-foreground text-sm font-medium">
          No Chart Found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-card-foreground">
        Vehicle Leads / Day Trends
      </h2>

      <div className="rounded-lg border border-border bg-background p-4">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
