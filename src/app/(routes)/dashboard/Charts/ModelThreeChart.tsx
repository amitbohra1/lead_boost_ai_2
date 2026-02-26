"use client"

import { useMemo } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useAppSelector } from "@/store/hooks"
import { selectTheme } from "@/store/slices/themeSlice"
import { getChartColors } from "@/theme/chartColors"
import { modelThreeData } from "@/data/performance"

export function ModelThreeChart() {
  const theme = useAppSelector(selectTheme)

  const options = useMemo(() => {
    const colors = getChartColors(theme)

    const chartOptions: Highcharts.Options = {
      chart: {
        type: "line",
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
      xAxis: {
        categories: modelThreeData.weeks,
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
          text: "Percentage (%)",
          style: {
            color: colors.textColor,
          },
        },
        min: 0,
        max: 100,
        tickInterval: 10,
        labels: {
          style: {
            color: colors.textColor,
          },
        },
        gridLineColor: colors.gridColor,
      },
      legend: {
        enabled: true,
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
        shared: true,
        formatter: function () {
          let s = `<b>${this.x}</b>`
          this.points?.forEach((point) => {
            s += `<br/><span style="color:${point.color}">\u25CF</span> ${point.series.name}: ${point.y}%`
          })
          return s
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false,
          },
          enableMouseTracking: true,
          marker: {
            enabled: true,
            radius: 4,
          },
        },
      },
      series: [
        {
          type: "line",
          name: "High Demand",
          data: modelThreeData.highDemand,
          color: "#3b82f6", 
        },
        {
          type: "line",
          name: "Low Demand",
          data: modelThreeData.lowDemand,
          color: "#ef4444", 
        },
      ],
    }

    return chartOptions
  }, [theme])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-card-foreground">Performance</h2>

      <div className="rounded-lg border border-border bg-background p-4">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  )
}
