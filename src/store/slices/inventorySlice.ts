import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store/redux/store"
import { inventoryMockData } from "@/data/inventory"
import type { InventoryItem } from "@/data/inventory"

interface InventoryState {
  data: InventoryItem[]
  loading: boolean
}

const initialState: InventoryState = {
  data: inventoryMockData,
  loading: false,
}

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    refreshInventory: (state) => {
      state.loading = true
      state.data = inventoryMockData
      state.loading = false
    },
  },
})

export const { refreshInventory } = inventorySlice.actions
export const selectInventoryData = (state: RootState) => state.inventory.data
export const selectInventoryLoading = (state: RootState) => state.inventory.loading
export default inventorySlice.reducer
