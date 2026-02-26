import type * as Highcharts from "highcharts"
import { getChartColors } from "@/theme/chartColors"

export function getChartOptions(
  type: "column" | "bar" | "line" | "area" | "pie",
  data: Array<{ category: string; value: number }>,
  theme: "light" | "dark",
  yAxisTitle?: string, 
): Highcharts.Options {
  const colors = getChartColors(theme)
  const chartColors = [colors.chart1, colors.chart2, colors.chart3, colors.chart4, colors.chart5]

  const baseOptions: Highcharts.Options = {
    chart: {
      type,
      backgroundColor: colors.backgroundColor,
      style: {
        fontFamily: "Geist, sans-serif",
      },
      height: 400,
    },
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    colors: chartColors,
    xAxis: {
      categories: data.map((d) => d.category),
      labels: {
        style: {
          color: colors.textColor,
          fontSize: "12px",
        },
      },
      gridLineColor: colors.gridColor,
      lineColor: colors.gridColor,
    },
    yAxis: {
      title: {
        text: yAxisTitle || "Value",
        style: {
          color: colors.textColor,
        },
      },
      labels: {
        style: {
          color: colors.textColor,
        },
      },
      gridLineColor: colors.gridColor,
    },
    legend: {
      itemStyle: {
        color: colors.textColor,
      },
      itemHoverStyle: {
        color: colors.chart1,
      },
    },
    tooltip: {
      backgroundColor: colors.backgroundColor,
      borderColor: colors.gridColor,
      style: {
        color: colors.textColor,
      },
    },
    plotOptions: {
      series: {
        // borderRadius: 4,
        dataLabels: {
          enabled: false,
        },
      },
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f}%",
          style: {
            color: theme === "light" ? "#000000" : colors.textColor,
            fontSize: "12px",
            textOutline: "none",
            fontWeight: "600",
          },
          distance: 20,
        },
        showInLegend: true,
      },
    },
  }

  if (type === "pie") {
    return {
      ...baseOptions,
      series: [
        {
          type: "pie",
          name: "Value",
          data: data.map((d) => ({
            name: d.category,
            y: d.value,
          })),
        },
      ],
    }
  }

  return {
    ...baseOptions,
    series: [
      {
        type: type === "area" ? "area" : type,
        name: "Leads",
        data: data.map((d) => d.value),
      },
    ],
  }
}
