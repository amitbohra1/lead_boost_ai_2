// "use client"

// import { useState, useMemo } from "react"
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   useReactTable,
//   SortingState,
// } from "@tanstack/react-table"
// import { useAppSelector } from "@/store/hooks"
// import { selectFilters } from "@/store/slices/filterSlice"
// import { getFilteredLeadData } from "@/data/lead-performance"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { cn } from "@/lib/utils"
// import { ArrowUpDown, Search } from "lucide-react"

// type Lead = ReturnType<typeof getFilteredLeadData>[number]

// export function LeadDataTable() {
//   const filters = useAppSelector(selectFilters)
//   // ✅ Memoize data to prevent infinite re-render
//   const data = useMemo(() => {
//     return getFilteredLeadData(filters)
//   }, [filters])

//   const [sorting, setSorting] = useState<SortingState>([])
//   const [globalFilter, setGlobalFilter] = useState("")

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

//   const columns = useMemo<ColumnDef<Lead>[]>(
//     () => [
//       {
//         accessorKey: "category",
//         header: ({ column }) => (
//           <div
//             className="flex cursor-pointer items-center gap-2"
//             onClick={() => column.toggleSorting()}
//           >
//             Category
//             <ArrowUpDown className="size-3" />
//           </div>
//         ),
//       },
//       {
//         accessorKey: "source",
//         header: ({ column }) => (
//           <div
//             className="flex cursor-pointer items-center gap-2"
//             onClick={() => column.toggleSorting()}
//           >
//             Source
//             <ArrowUpDown className="size-3" />
//           </div>
//         ),
//       },
//       {
//         accessorKey: "status",
//         header: ({ column }) => (
//           <div
//             className="flex cursor-pointer items-center gap-2"
//             onClick={() => column.toggleSorting()}
//           >
//             Status
//             <ArrowUpDown className="size-3" />
//           </div>
//         ),
//         cell: ({ row }) => {
//           const status = row.getValue("status") as string
//           return (
//             <Badge
//               variant="outline"
//               className={cn("text-xs", getStatusColor(status))}
//             >
//               {status}
//             </Badge>
//           )
//         },
//       },
//       {
//         accessorKey: "value",
//         header: ({ column }) => (
//           <div
//             className="flex cursor-pointer items-center justify-end gap-2"
//             onClick={() => column.toggleSorting()}
//           >
//             Lead Count
//             <ArrowUpDown className="size-3" />
//           </div>
//         ),
//         cell: ({ row }) => (
//           <div className="text-right">
//             <span className="font-semibold text-primary">
//               {Number(row.getValue("value")).toLocaleString()}
//             </span>
//           </div>
//         ),
//       },
//     ],
//     [],
//   )

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//       globalFilter,
//     },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setGlobalFilter,
//     globalFilterFn: (row, columnId, filterValue) => {
//       const searchableColumns = ["category", "source", "status"]
//       return searchableColumns.some((col) =>
//         String(row.getValue(col))
//           .toLowerCase()
//           .includes(filterValue.toLowerCase()),
//       )
//     },
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   })

//   return (
//     <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
//       <div className="border-b border-border bg-muted/20 p-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search by category, source, or status..."
//             value={globalFilter ?? ""}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-muted/50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           <tbody className="divide-y divide-border bg-card">
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className="transition-colors hover:bg-muted/30"
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="px-6 py-4">
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   className="py-12 text-center text-muted-foreground"
//                 >
//                   No results found for "{globalFilter}"
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
