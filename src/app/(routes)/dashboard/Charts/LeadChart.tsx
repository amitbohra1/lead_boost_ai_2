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

export function LeadChart() {
  const theme = useAppSelector(selectTheme);
  const reduxLead = useAppSelector(selectLeadFilterData);

  const { data: defaultLead, isLoading } = useGetLeadPerformance();
  const lead = reduxLead || defaultLead;

  const options = useMemo(() => {
    const colors = getChartColors(theme);

    const graphData = lead?.response?.graph_data || [];

    const categories = graphData.map((item: any) => item.label);
    const chartData = graphData.map((item: any) => ({
      y: item.value,
      customDate: item.date,
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
        title: { text: "Leads" },
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
            Date: ${formattedDate}<br/>
            Leads: <b>${point.y}</b>
          `;
        },
      },
      series: [
        {
          type: "line",
          name: "Leads",
          data: chartData,
          color: colors.chart1,
        },
      ],
    };
  }, [theme, lead]);

  if (isLoading && !reduxLead) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-card-foreground">
        Vehicle / Day Trends
      </h2>

      <div className="rounded-lg border border-border bg-background p-4">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
