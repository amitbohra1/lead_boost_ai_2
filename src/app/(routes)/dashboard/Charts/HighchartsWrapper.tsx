// "use client"

// import { useEffect, useRef } from "react"
// import Highcharts from "highcharts"
// import HighchartsReact from "highcharts-react-official"
// import { getChartOptions } from "@/components/charts/chartOptions"

// interface HighchartsWrapperProps {
//   data: Array<{ category: string; value: number }>
//   chartType: "column" | "bar" | "line" | "area" | "pie"
//   theme: "light" | "dark"
//   yAxisTitle?: string // Add optional prop for custom y-axis title
// }

// export default function HighchartsWrapper({ data, chartType, theme, yAxisTitle }: HighchartsWrapperProps) {
//   const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

//   const options = getChartOptions(chartType, data, theme, yAxisTitle)

//   useEffect(() => {
//     if (chartComponentRef.current) {
//       chartComponentRef.current.chart.reflow()
//     }
//   }, [chartType, theme])

//   return (
//     <HighchartsReact
//       highcharts={Highcharts}
//       options={options}
//       ref={chartComponentRef}
//       containerProps={{ style: { height: "100%", width: "100%" } }}
//     />
//   )
// }
