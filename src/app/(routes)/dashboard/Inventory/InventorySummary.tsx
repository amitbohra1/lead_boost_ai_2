// "use client"

// import { useAppSelector } from "@/store/hooks"
// import { selectInventoryData } from "@/store/slices/inventorySlice"
// import { Package, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

// export function InventorySummary() {
//   const inventoryData = useAppSelector(selectInventoryData)

//   const totalProducts = inventoryData.length
//   const totalStock = inventoryData.reduce((sum: any, item: { stock: any }) => sum + item.stock, 0)
//   const inStock = inventoryData.filter((item: { status: string }) => item.status === "In Stock").length
//   const lowStock = inventoryData.filter((item: { status: string }) => item.status === "Low Stock").length
//   const outOfStock = inventoryData.filter((item: { status: string }) => item.status === "Out of Stock").length
//   const totalValue = inventoryData.reduce((sum: number, item: { stock: number; price: number }) => sum + item.stock * item.price, 0)

//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <div className="rounded-lg border border-border bg-card p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-muted-foreground">Total Products</p>
//             <h3 className="mt-2 text-3xl font-bold text-card-foreground">{totalProducts}</h3>
//           </div>
//           <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
//             <Package className="size-6" />
//           </div>
//         </div>
//       </div>

//       <div className="rounded-lg border border-border bg-card p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-muted-foreground">Total Stock</p>
//             <h3 className="mt-2 text-3xl font-bold text-card-foreground">{totalStock}</h3>
//           </div>
//           <div className="flex size-12 items-center justify-center rounded-full bg-chart-3/20 text-chart-3">
//             <CheckCircle2 className="size-6" />
//           </div>
//         </div>
//       </div>

//       <div className="rounded-lg border border-border bg-card p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
//             <h3 className="mt-2 text-3xl font-bold text-card-foreground">${totalValue.toLocaleString()}</h3>
//           </div>
//           <div className="flex size-12 items-center justify-center rounded-full bg-chart-2/20 text-chart-2">
//             <Package className="size-6" />
//           </div>
//         </div>
//       </div>

//       <div className="rounded-lg border border-border bg-card p-6">
//         <div className="space-y-3">
//           <p className="text-sm font-medium text-muted-foreground">Status Overview</p>
//           <div className="space-y-2">
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="size-4 text-chart-3" />
//                 <span className="text-muted-foreground">In Stock</span>
//               </div>
//               <span className="font-semibold text-card-foreground">{inStock}</span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-2">
//                 <AlertTriangle className="size-4 text-chart-5" />
//                 <span className="text-muted-foreground">Low Stock</span>
//               </div>
//               <span className="font-semibold text-card-foreground">{lowStock}</span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-2">
//                 <XCircle className="size-4 text-destructive" />
//                 <span className="text-muted-foreground">Out of Stock</span>
//               </div>
//               <span className="font-semibold text-card-foreground">{outOfStock}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
