// "use client"

// import { StatCard } from "@/components/ui/stat-card"
// import { Car, Users, TrendingUp, AlertCircle } from "lucide-react"
// // import { inventoryMockData } from "@/data/inventory"

// export function InventoryStatsCards() {
//   // const totalProducts = inventoryMockData.length
//   // const totalValue = inventoryMockData.reduce((sum, item) => sum + item.price * item.stock, 0)
//   // const lowStockItems = inventoryMockData.filter((item) => item.status === "Low Stock").length
//   // const outOfStockItems = inventoryMockData.filter((item) => item.status === "Out of Stock").length
//   // const totalStock = inventoryMockData.reduce((sum, item) => sum + item.stock, 0)

//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <StatCard title="Total Unsold Cars" value={128} subtitle="+8 from last month" icon={Car} colorScheme="primary" />
//       <StatCard title="Total Leads" value={1420} subtitle="Last 30 days" icon={Users} colorScheme="success" />
//       <StatCard
//         title="Avg Leads / Car"
//         value={11.1}
//         subtitle="+2.3% from last week"
//         icon={TrendingUp}
//         colorScheme="accent"
//         trend={{ value: 2.3, isPositive: true }}
//       />
//       <StatCard
//         title="Action Items"
//         value={12}
//         subtitle="Require price adjustment"
//         icon={AlertCircle}
//         colorScheme="warning"
//       />
//     </div>
//   )
// }
