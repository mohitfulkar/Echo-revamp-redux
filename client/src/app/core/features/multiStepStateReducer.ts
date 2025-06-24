import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MultiStepFormState {
  [stepKey: string]: any;
}

const initialState: MultiStepFormState = {};

const multiStepFormSlice = createSlice({
  name: "multiStepForm",
  initialState,
  reducers: {
    setStepData: (
      state,
      action: PayloadAction<{ stepKey: string; data: any }>
    ) => {
      const { stepKey, data } = action.payload;
      if (!state[stepKey]) {
        state[stepKey] = {};
      }
      state[stepKey] = data;
    },
    resetFormData: (state, action: PayloadAction<{ stepKey: string }>) => {
      delete state[action.payload.stepKey];
    },
    resetAllFormData: () => initialState,
  },
});

export const { setStepData, resetFormData, resetAllFormData } =
  multiStepFormSlice.actions;
export default multiStepFormSlice.reducer;
