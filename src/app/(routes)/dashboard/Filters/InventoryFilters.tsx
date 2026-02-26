// "use client"

// import { useAppDispatch, useAppSelector } from "@/store/hooks"
// import {
//   setBodyType,
//   setDemandLevel,
//   setVinNumber,
//   setMaxWeeksUnsold,
//   setLeadsPerDay,
//   selectFilters,
// } from "@/store/slices/filterSlice"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search } from "lucide-react"
// import { useState } from "react"
// import { Input } from "@/components/ui/input"

// export function InventoryFilters() {
//   const dispatch = useAppDispatch()
//   const filters = useAppSelector(selectFilters)
//   const [vinSearch, setVinSearch] = useState("")

//   const vinOptions = ["All", "KER5478300", "DT834873", "63473WET"]
//   const filteredVinOptions = vinOptions.filter((vin) => vin.toLowerCase().includes(vinSearch.toLowerCase()))

//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//       {/* Body Type Filter */}
//       <div className="space-y-2">
//         <Label htmlFor="body-type" className="text-sm font-medium">
//           Body Type
//         </Label>
//         <Select value={filters.bodyType} onValueChange={(value) => dispatch(setBodyType(value))}>
//           <SelectTrigger id="body-type" className="w-auto min-w-full">
//             <SelectValue placeholder="All Types" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Types</SelectItem>
//             <SelectItem value="Sedan">Sedan</SelectItem>
//             <SelectItem value="SUV">SUV</SelectItem>
//             <SelectItem value="Truck">Truck</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Demand Level Filter - Updated options */}
//       <div className="space-y-2">
//         <Label htmlFor="demand-level" className="text-sm font-medium">
//           Demand Level
//         </Label>
//         <Select value={filters.demandLevel} onValueChange={(value) => dispatch(setDemandLevel(value))}>
//           <SelectTrigger id="demand-level" className="w-auto min-w-full">
//             <SelectValue placeholder="All Levels" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Levels</SelectItem>
//             <SelectItem value="Low">Low</SelectItem>
//             <SelectItem value="High Borderline">High Borderline</SelectItem>
//             <SelectItem value="High">High</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* VIN Number Filter - New searchable dropdown */}
//       <div className="space-y-2">
//         <Label htmlFor="vin-number" className="text-sm font-medium">
//           VIN Number
//         </Label>
//         <Select value={filters.vinNumber} onValueChange={(value) => dispatch(setVinNumber(value))}>
//           <SelectTrigger id="vin-number" className="w-auto min-w-full">
//             <SelectValue placeholder="All" />
//           </SelectTrigger>
//           <SelectContent>
//             <div className="flex items-center border-b px-3 pb-2">
//               <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
//               <Input
//                 placeholder="Search VIN..."
//                 value={vinSearch}
//                 onChange={(e) => setVinSearch(e.target.value)}
//                 className="h-8 border-0 bg-transparent p-0 focus-visible:ring-0"
//               />
//             </div>
//             {filteredVinOptions.map((vin) => (
//               <SelectItem key={vin} value={vin.toLowerCase()}>
//                 {vin}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Max Weeks Unsold Filter - Changed from input to dropdown */}
//       <div className="space-y-2">
//         <Label htmlFor="max-weeks" className="text-sm font-medium">
//           Max Weeks Unsold
//         </Label>
//         <Select value={filters.maxWeeksUnsold} onValueChange={(value) => dispatch(setMaxWeeksUnsold(value))}>
//           <SelectTrigger id="max-weeks" className="w-auto min-w-full">
//             <SelectValue placeholder="All" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="1">1</SelectItem>
//             <SelectItem value="2">2</SelectItem>
//             <SelectItem value="3">3</SelectItem>
//             <SelectItem value="4">4</SelectItem>
//             <SelectItem value="5">5</SelectItem>
//             <SelectItem value="6">6</SelectItem>
//             <SelectItem value="7">7</SelectItem>
//             <SelectItem value="7+">7+</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Leads Per Day Filter - New dropdown replacing date filters */}
//       <div className="space-y-2">
//         <Label htmlFor="leads-per-day" className="text-sm font-medium">
//           Leads Per Day
//         </Label>
//         <Select value={filters.leadsPerDay} onValueChange={(value) => dispatch(setLeadsPerDay(value))}>
//           <SelectTrigger id="leads-per-day" className="w-auto min-w-full">
//             <SelectValue placeholder="All" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="1">1</SelectItem>
//             <SelectItem value="2">2</SelectItem>
//             <SelectItem value="3">3</SelectItem>
//             <SelectItem value="4">4</SelectItem>
//             <SelectItem value="5">5</SelectItem>
//             <SelectItem value="6">6</SelectItem>
//             <SelectItem value="7">7</SelectItem>
//             <SelectItem value="8">8</SelectItem>
//             <SelectItem value="9">9</SelectItem>
//             <SelectItem value="10">10</SelectItem>
//             <SelectItem value="10+">10+</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   )
// }
