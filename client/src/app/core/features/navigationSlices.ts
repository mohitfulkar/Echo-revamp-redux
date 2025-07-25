// src/redux/navigationSlice.js
import { createSlice } from "@reduxjs/toolkit";
// import { DEFAULT_MODULE } from "../constants/navigationItems";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    activeModule: null,
  },
  reducers: {
    // Action to set the active module
    setActiveModule: (state, action) => {
      state.activeModule = action.payload;
    },
  },
});

// Export actions
export const { setActiveModule } = navigationSlice.actions;

// Export reducer
export default navigationSlice.reducer;
