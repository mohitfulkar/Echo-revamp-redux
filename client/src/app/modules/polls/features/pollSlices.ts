import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { pollService } from "../service/pollService";
import { addAsyncCaseHandlersPoll } from "../../../core/utils/storeUtil";

export interface PollState {
  itemsByKey: Record<string, any>; // Or use Record<string, Poll[]> for stronger typing
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PollState = {
  itemsByKey: {},
  loading: false,
  error: null,
  success: false,
};
export const getPolls = createAsyncThunk<any, any, { rejectValue: string }>(
  "auth/getPolls",
  async (params, { rejectWithValue }) => {
    try {
      const response = await pollService.getAll("polls", params);
      console.log("response", response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PollState>) => {
    addAsyncCaseHandlersPoll(builder, getPolls);
  },
});

export default pollSlice.reducer;
