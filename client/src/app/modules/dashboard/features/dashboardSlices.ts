import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { pollService } from "../../polls/service/pollService";
import { addAsyncCaseHandlersDashboard } from "../../../core/utils/storeUtil";
import { DashboardService } from "../services/apiServices";

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
  void,
  { rejectValue: string }
>(
  "dashboard/getAdminDashboard",
  async (_ButtonColorTypes, { rejectWithValue }) => {
    try {
      const response = await pollService.getStats("admin-dashboard");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
export const getCategorySummary = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  "dashboard/getCategorySummary",
  async (_ButtonColorTypes, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getAll("category-summary");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Action failed");
    }
  }
);
export const getExpertiseSummary = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  "dashboard/getExpertiseSummary",
  async (_ButtonColorTypes, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getAll("expertise-summary");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Action failed");
    }
  }
);
export const getRsbSummary = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("dashboard/getRsbSummary", async (_ButtonColorTypes, { rejectWithValue }) => {
  try {
    const response = await DashboardService.getAll("rsb-summary");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Action failed");
  }
});
export const getDesignationSummary = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  "dashboard/getDesignationSummary",
  async (_ButtonColorTypes, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getAll("designation-summary");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Action failed");
    }
  }
);

const dashboardSlices = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    incrementConfigsByStatus: (state, action: PayloadAction<string>) => {
      const status = action.payload;
      const summary = state.items;
      if (summary && typeof summary[status] === "number") {
        console.log("mohit");
        summary[status] += 1;
        summary.total += 1;
      }
    },
    updateConfigsByStatus: (
      state,
      action: PayloadAction<{ oldStatus: string; newStatus: string }>
    ) => {
      const summary = state.items;
      const { oldStatus, newStatus } = action.payload;

      if (
        summary &&
        typeof summary[oldStatus] === "number" &&
        typeof summary[newStatus] === "number"
      ) {
        summary[oldStatus] -= 1;
        summary[newStatus] += 1;
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<DashboardState>) => {
    addAsyncCaseHandlersDashboard(builder, getAdminDashboard);
    addAsyncCaseHandlersDashboard(builder, getCategorySummary);
    addAsyncCaseHandlersDashboard(builder, getExpertiseSummary);
    addAsyncCaseHandlersDashboard(builder, getRsbSummary);
    addAsyncCaseHandlersDashboard(builder, getDesignationSummary);
  },
});

export const { incrementConfigsByStatus, updateConfigsByStatus } =
  dashboardSlices.actions;
export default dashboardSlices.reducer;
