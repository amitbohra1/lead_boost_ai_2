import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../redux/store"

interface FilterState {
    body_type: string,
    demand_level: string,
    vin: string,
    store: string,
    leads_per_day: string,
    acquisition_type?: string,
}

const initialState: FilterState = {
    body_type: "",
    demand_level: "",
    vin: "",
    store: "",
    leads_per_day: "",
    acquisition_type: "",
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBodyType: (state, action) => {
      state.body_type = action.payload
    },
    setDemandLevel: (state, action) => {
      state.demand_level = action.payload
    },
    setVinNumber: (state, action) => {
      state.vin = action.payload
    },
    setStore: (state, action) => {
      state.store = action.payload
    },
    setLeadsPerDay: (state, action) => {
      state.leads_per_day  = action.payload
    },
    setAcquisitionType: (state, action) => {
      state.acquisition_type = action.payload
    },
    resetFilters: () => initialState,
  },
})

export const { setBodyType, setDemandLevel, setVinNumber, setStore, setLeadsPerDay, setAcquisitionType, resetFilters } =
  filterSlice.actions
export const selectFilters = (state: RootState) => state.filter
export default filterSlice.reducer
