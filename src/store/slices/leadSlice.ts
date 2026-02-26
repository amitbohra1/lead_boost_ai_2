import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LeadState {
  leadFilterData: any;
}

const initialState: LeadState = {
  leadFilterData: null,
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    setLeadFilterData: (state, action: PayloadAction<any>) => {
      state.leadFilterData = action.payload;
    },
    clearLeadFilterData: (state) => {
      state.leadFilterData = null;
    },
  },
});

export const {
  setLeadFilterData,
  clearLeadFilterData,
} = leadSlice.actions;

export const selectLeadFilterData = (state: any) =>
  state.lead.leadFilterData;

export default leadSlice.reducer;
