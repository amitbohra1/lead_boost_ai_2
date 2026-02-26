export interface InventoryItem {
  price: number
  stock: number
  status: string
  id: string
  carName: string
  bodyType: "Sedan" | "SUV" | "Truck"
  purchasePrice: number
  currentPrice: number
  daysUnsold: number
  avgLeadsPerDay: number
  totalLeads: number
  trend: "Up" | "Down"
  demand: "High" | "Low"
  aiSuggestion: string
  dateAdded: string
}

export const inventoryMockData: InventoryItem[] = [
  {
    id: "INV-001",
    carName: "2022 Honda Civic",
    bodyType: "Sedan",
    purchasePrice: 18500,
    currentPrice: 22500,
    price: 22500,
    stock: 5,
    status: "Available",
    daysUnsold: 89,
    avgLeadsPerDay: 12.5,
    totalLeads: 1113,
    trend: "Up",
    demand: "High",
    aiSuggestion: "Maintain current price - high demand",
    dateAdded: "2024-10-03",
  },
  {
    id: "INV-002",
    carName: "2021 Toyota RAV4",
    bodyType: "SUV",
    purchasePrice: 24000,
    currentPrice: 26500,
    price: 26500,
    stock: 2,
    status: "Reserved",
    daysUnsold: 125,
    avgLeadsPerDay: 3.2,
    totalLeads: 400,
    trend: "Down",
    demand: "Low",
    aiSuggestion: "Reduce price to $24,500 to increase demand - Suggested: $24,500",
    dateAdded: "2024-08-28",
  },
  {
    id: "INV-003",
    carName: "2023 Ford F-150",
    bodyType: "Truck",
    purchasePrice: 32000,
    currentPrice: 38500,
    price: 38500,
    stock: 3,
    status: "Available",
    daysUnsold: 72,
    avgLeadsPerDay: 15.8,
    totalLeads: 1138,
    trend: "Up",
    demand: "High",
    aiSuggestion: "Consider premium listing - excellent performance",
    dateAdded: "2024-10-19",
  },
  {
    id: "INV-004",
    carName: "2020 Nissan Altima",
    bodyType: "Sedan",
    purchasePrice: 15500,
    currentPrice: 17800,
    price: 17800,
    stock: 1,
    status: "Available",
    daysUnsold: 145,
    avgLeadsPerDay: 2.1,
    totalLeads: 304,
    trend: "Down",
    demand: "Low",
    aiSuggestion: "Urgent: Reduce price or consider auction - Suggested: $16,200",
    dateAdded: "2024-08-08",
  },
  {
    id: "INV-005",
    carName: "2022 Chevrolet Equinox",
    bodyType: "SUV",
    purchasePrice: 21000,
    currentPrice: 25200,
    price: 25200,
    stock: 4,
    status: "Sold",
    daysUnsold: 79,
    avgLeadsPerDay: 11.3,
    totalLeads: 893,
    trend: "Up",
    demand: "High",
    aiSuggestion: "Strong performance - maintain strategy",
    dateAdded: "2024-10-13",
  },
]


export function getFilteredInventoryData(filters: {
  bodyType: string
  demandLevel: string
  vinNumber: string
  maxWeeksUnsold: string
  leadsPerDay: string
}): InventoryItem[] {
  let data = [...inventoryMockData]

  // Filter by body type
  if (filters.bodyType && filters.bodyType !== "all") {
    data = data.filter((item) => item.bodyType === filters.bodyType)
  }

  // Filter by demand level
  if (filters.demandLevel && filters.demandLevel !== "all") {
    if (filters.demandLevel === "High Borderline") {
      // Show items with moderate performance
      data = data.filter((item) => item.avgLeadsPerDay >= 5 && item.avgLeadsPerDay < 10)
    } else {
      data = data.filter((item) => item.demand === filters.demandLevel)
    }
  }

  // Filter by VIN number (if specific car selected)
  if (filters.vinNumber && filters.vinNumber !== "all") {
    data = data.filter((item) => item.id === filters.vinNumber)
  }

  // Filter by max weeks unsold
  if (filters.maxWeeksUnsold && filters.maxWeeksUnsold !== "all") {
    const maxDays = Number.parseInt(filters.maxWeeksUnsold) * 7
    data = data.filter((item) => item.daysUnsold <= maxDays)
  }

  // Filter by leads per day
  if (filters.leadsPerDay && filters.leadsPerDay !== "all") {
    const minLeads = Number.parseInt(filters.leadsPerDay)
    data = data.filter((item) => item.avgLeadsPerDay >= minLeads)
  }

  return data
}
