import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addAsyncCaseHandlersChoice } from "../utils/storeUtil";
import { BASE_URL } from "../environment/environment.local";

// Type for a single dropdown option
export interface ChoiceOption {
  label: string;
  value: string;
}

// Payload args to fetch a choice list
export interface FetchChoicesArgs {
  parentKey: string; // e.g., "options/categories"
}

// Shape of the slice state
export interface ChoiceState {
  choices: Record<string, ChoiceOption[]>;
  loading: boolean;
  error: string | null;
}
const initialState: ChoiceState = {
  choices: {},
  loading: false,
  error: null,
};

// Async thunk to fetch choices
export const fetchChoices = createAsyncThunk<
  ChoiceOption[], // return type
  FetchChoicesArgs, // argument type
  { rejectValue: string } // reject type
>("choice/fetchChoices", async ({ parentKey }, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/choices/${parentKey}`);
    return response.data.data as ChoiceOption[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch choices"
    );
  }
});

const choiceSlice = createSlice({
  name: "choice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCaseHandlersChoice(builder, fetchChoices);
  },
});

export default choiceSlice.reducer;
