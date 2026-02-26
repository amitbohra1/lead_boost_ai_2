import { createSlice } from "@reduxjs/toolkit"
import { leadPerformanceMockData } from "@/data/lead-performance"
import { RootState } from "../redux/store"

interface LeadData {
  category: string
  value: number
  status?: string
  source?: string
}

interface LeadPerformanceState {
  data: LeadData[]
  loading: boolean
}

const initialState: LeadPerformanceState = {
  data: leadPerformanceMockData,
  loading: false,
}

const leadPerformanceSlice = createSlice({
  name: "leadPerformance",
  initialState,
  reducers: {
    refreshData: (state) => {
      state.loading = true
      state.data = leadPerformanceMockData
      state.loading = false
    },
  },
})

export const { refreshData } = leadPerformanceSlice.actions
export const selectLeadPerformanceData = (state: RootState) => state.leadPerformance.data
export const selectLeadPerformanceLoading = (state: RootState) => state.leadPerformance.loading
export default leadPerformanceSlice.reducer
