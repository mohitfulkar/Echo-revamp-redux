// src/store/sharedSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SharedState {
  [key: string]: any;
}
const initialState: SharedState = {};

const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setSharedData: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    removeSharedData: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetSharedState: () => initialState,
  },
});

export const { setSharedData, removeSharedData, resetSharedState } =
  sharedSlice.actions;
export default sharedSlice.reducer;
