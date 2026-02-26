export interface LeadData {
  status: string
  source: string
  category: string
  value: number
}

export const leadPerformanceMockData: LeadData[] = [
  {
    category: "Website", value: 4250,
    status: "",
    source: ""
  },
  { category: "Email Campaign", value: 3100, status: "",
    source: ""},
  { category: "Social Media", value: 2850, status: "",
    source: "" },
  { category: "Referral", value: 1920, status: "",
    source: "" },
  { category: "Direct", value: 1560, status: "",
    source: "" },
  { category: "Paid Ads", value: 2340, status: "",
    source: "" },
  { category: "Partner", value: 1750, status: "",
    source: "" },
  { category: "Event", value: 980, status: "",
    source: "" },
]

export function getFilteredLeadData(filters: any): LeadData[] {
  return leadPerformanceMockData
}

export const getAllLeadData = () => leadPerformanceMockData
