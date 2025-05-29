import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { pollService } from "../../polls/service/pollService";
import {
  addAsyncCaseHandlersDashboard,
  addAsyncCaseHandlersPoll,
} from "../../../core/utils/storeUtil";

export interface DashboardState {
  items: any; // Or use Record<string, Poll[]> for stronger typing
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DashboardState = {
  items: null,
  loading: false,
  error: null,
  success: false,
};
export const getAdminDashboard = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("auth/getAdminDashboard", async (params, { rejectWithValue }) => {
  try {
    const response = await pollService.getAll("", params);
    console.log("response", response);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

const dashboardSlices = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DashboardState>) => {
    addAsyncCaseHandlersDashboard(builder, getAdminDashboard);
  },
});
export default dashboardSlices.reducer;
