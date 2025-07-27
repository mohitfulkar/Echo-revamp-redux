import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { pollService } from "../../polls/service/pollService";
import { addAsyncCaseHandlersDashboard } from "../../../core/utils/storeUtil";
import { DashboardService } from "../services/apiServices";
import {
  ADMIN_DASHBOARD,
  CATEGORY_SUMMARY,
  DESIGNATION_SUMMARY,
  EXPERTISE_SUMMARY,
  ONBOARDING,
  PANELIST,
  PANELIST_SUMMARY,
  RSB_SUMMARY,
} from "../constants/dashboard.constant";

export interface DashboardState {
  items: any; // Or use Record<string, Poll[]> for stronger typing
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DashboardState = {
  items: {},
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
      const response = await pollService.getStats(ADMIN_DASHBOARD);
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
      const response = await DashboardService.getAll(CATEGORY_SUMMARY);
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
      const response = await DashboardService.getAll(EXPERTISE_SUMMARY);
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
    const response = await DashboardService.getAll(RSB_SUMMARY);
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
      const response = await DashboardService.getAll(DESIGNATION_SUMMARY);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Action failed");
    }
  }
);
export const getPanelistStatusSummary = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  "dashboard/getPanelistStatusSummary",
  async (_ButtonColorTypes, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getAll(PANELIST_SUMMARY);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Action failed");
    }
  }
);
export const onboardingPanelistSummary = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  "dashboard/onboardingPanelistSummary",
  async (_ButtonColorTypes, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getAllByPathVariable(ONBOARDING, [
        PANELIST,
      ]);
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
    addAsyncCaseHandlersDashboard(builder, getPanelistStatusSummary);
    addAsyncCaseHandlersDashboard(builder, onboardingPanelistSummary);
  },
});

export const { incrementConfigsByStatus, updateConfigsByStatus } =
  dashboardSlices.actions;
export default dashboardSlices.reducer;
