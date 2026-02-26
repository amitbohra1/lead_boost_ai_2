// "use client"

// import { useAppSelector } from "@/store/hooks"
// import { selectFilters } from "@/store/slices/filterSlice"
// import { getFilteredLeadData } from "@/data/lead-performance"
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"

// export function LeadDataCards() {
//   const filters = useAppSelector(selectFilters)
//   const data = getFilteredLeadData(filters)

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "qualified":
//         return "bg-success/10 text-success border-success/20"
//       case "contacted":
//         return "bg-info/10 text-info border-info/20"
//       case "new":
//         return "bg-warning/10 text-warning border-warning/20"
//       default:
//         return "bg-muted/10 text-muted-foreground border-muted/20"
//     }
//   }

//   const getSourceIcon = (source: string) => {
//     const icons: Record<string, string> = {
//       organic: "🌐",
//       email: "📧",
//       social: "📱",
//       referral: "👥",
//       direct: "🎯",
//       paid: "💰",
//       partner: "🤝",
//       event: "🎪",
//     }
//     return icons[source] || "📊"
//   }

//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {data.map((item, index) => (
//         <div
//           key={index}
//           className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
//         >
//           <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl transition-all group-hover:scale-150" />

//           <div className="relative space-y-4">
//             <div className="flex items-start justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl">{getSourceIcon(item.source)}</span>
//                 <Badge variant="outline" className={cn("text-xs", getStatusColor(item.status))}>
//                   {item.status}
//                 </Badge>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-card-foreground">{item.category}</h3>
//               <p className="text-xs text-muted-foreground capitalize">{item.source} source</p>
//             </div>

//             <div className="flex items-end justify-between border-t border-border pt-4">
//               <div>
//                 <p className="text-xs text-muted-foreground">Lead Count</p>
//                 <p className="text-2xl font-bold text-primary">{item.value.toLocaleString()}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-muted-foreground">Status</p>
//                 <p className="text-sm font-medium capitalize text-card-foreground">{item.status}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
