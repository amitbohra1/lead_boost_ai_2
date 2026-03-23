
import { ApiFeatureGroup } from "@/interface/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeatureState {
  features: ApiFeatureGroup[];
}

const initialState: FeatureState = {
  features: [],
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    setFeatures: (state, action: PayloadAction<ApiFeatureGroup[]>) => {
      state.features = action.payload;
    },
  },
});

export const { setFeatures } = featureSlice.actions;
export default featureSlice.reducer;
