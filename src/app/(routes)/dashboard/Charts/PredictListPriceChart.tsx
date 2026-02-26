"use client"

import { useMemo } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useAppSelector } from "@/store/hooks"
import { selectTheme } from "@/store/slices/themeSlice"
import { getChartColors } from "@/theme/chartColors"
import { predictListPriceData } from "@/data/performance"

export function PredictListPriceChart() {
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
        categories: predictListPriceData.weeks,
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
          text: "MAPE (%)",
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
        formatter: function () {
          return `<b>${this.series.name}</b><br/>MAPE: ${this.y}%`
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
          name: "Error Rate",
          data: predictListPriceData.mape,
          color: "#3b82f6",
        },
      ],
    }

    return chartOptions
  }, [theme])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-card-foreground">Predict List Price – Model Two</h2>

      <div className="rounded-lg border border-border bg-background p-4">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  )
}
