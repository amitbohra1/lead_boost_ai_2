// "use client"

// import dynamic from "next/dynamic"
// import { useAppSelector } from "@/store/hooks"
// import { selectTheme } from "@/store/slices/themeSlice"
// import { leadPerformanceMockData } from "@/data/lead-performance"

// const HighchartsWrapper = dynamic(() => import("./HighchartsWrapper"), {
//   ssr: false,
// })

// export function LeadSourceChart() {
//   const theme = useAppSelector(selectTheme)

//   // Use the lead performance data from the mock (Website, Email Campaign, etc.)
//   const chartData = leadPerformanceMockData.map((item) => ({
//     category: item.category,
//     value: item.value,
//   }))

//   return (
//     <div className="space-y-4">
//       <h2 className="text-lg font-semibold text-card-foreground">Lead Performance Analytics</h2>

//       <div className="rounded-lg border border-border bg-background p-4">
//         <HighchartsWrapper data={chartData} chartType="column" theme={theme} yAxisTitle="Leads" />
//       </div>
//     </div>
//   )
// }
