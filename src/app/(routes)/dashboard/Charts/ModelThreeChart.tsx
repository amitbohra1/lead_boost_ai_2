"use client";

import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppSelector } from "@/store/hooks";
import { selectTheme } from "@/store/slices/themeSlice";
import { getChartColors } from "@/theme/chartColors";
import { useGetDemandCount } from "../api/api";
import { Spinner } from "@/components/ui/spinner";

export function ModelThreeChart() {
  const theme = useAppSelector(selectTheme);
  const { data, isLoading } = useGetDemandCount();

  const options = useMemo(() => {
    const colors = getChartColors(theme);

    return {
      chart: {
        type: "line",
        backgroundColor: colors.backgroundColor,
        height: 400,
      },
      title: { text: undefined },
      credits: { enabled: false },

      xAxis: {
        categories: data?.weeks || [],
        labels: {
          style: { color: colors.textColor },
        },
      },

      yAxis: {
        title: { text: "Percentage (%)" },
        min: 0,
        max: 100,
      },

      tooltip: {
        shared: true,
        valueSuffix: "%",
      },

      series: [
        {
          type: "line",
          name: "High Demand",
          data: data?.highDemand || [],
          color: "#3b82f6",
        },
        {
          type: "line",
          name: "Low Demand",
          data: data?.lowDemand || [],
          color: "#ef4444",
        },
      ],
    } as Highcharts.Options;
  }, [theme, data]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
