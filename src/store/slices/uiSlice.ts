import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store/redux/store"

interface UiState {
  activeTab: "lead-performance" | "inventory-overview" | "performance" | "status-recode" | "bid-overview"
  chartType: "column" | "bar" | "line" | "area" | "pie"
  leadPerformanceView: "table" | "card"
  inventoryView: "table" | "card"
  activeStatusRecodeDay: number
  activeBidOverviewDay: "column" | "bar" | "line" | "area" | "pie"
}

const initialState: UiState = {
  activeTab: "lead-performance",
  chartType: "line",
  leadPerformanceView: "table",
  inventoryView: "table",
  activeStatusRecodeDay: 0,
  activeBidOverviewDay: "line",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setChartType: (state, action) => {
      state.chartType = action.payload
    },
    setLeadPerformanceView: (state, action) => {
      state.leadPerformanceView = action.payload
    },
    setInventoryView: (state, action) => {
      state.inventoryView = action.payload
    },
    setActiveStatusRecodeDay: (state, action) => {
      state.activeStatusRecodeDay = action.payload
    },
    setActiveBidOverviewDay: (state, action) => {
      state.activeBidOverviewDay = action.payload
    },
  },
})

export const { setActiveTab, setChartType, setLeadPerformanceView, setInventoryView, setActiveStatusRecodeDay, setActiveBidOverviewDay } =
  uiSlice.actions

export const selectActiveTab = (state: RootState) => state.ui.activeTab
export const selectChartType = (state: RootState) => state.ui.chartType
export const selectLeadPerformanceView = (state: RootState) => state.ui.leadPerformanceView
export const selectInventoryView = (state: RootState) => state.ui.inventoryView
export const selectActiveStatusRecodeDay = (state: RootState) => state.ui.activeStatusRecodeDay
export const selectActiveBidOverviewDay = (state: RootState) => state.ui.activeBidOverviewDay

export default uiSlice.reducer
