import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { addAsyncCaseHandlersExpertise } from "../../../core/utils/storeUtil";
import { expertiseService } from "../services/settingService";

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
  prev: string | null;
  next: string | null;
}

export interface ExpertiseDataItem {
  name: string;
  description: string;
  isActive?: boolean;
  statusDisplay?: string;
  createdDate?: string;
  createdTime?: string;
}

export interface ExpertiseState {
  data: {
    pagination: PaginationInfo;
    expertises: ExpertiseDataItem[];
  };
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ExpertiseState = {
  data: {
    pagination: {
      total: 0,
      page: 0,
      limit: 0,
      pages: 0,
      prev: null,
      next: null,
    },
    expertises: [],
  },
  loading: false,
  error: null,
  success: false,
};

export const getExpertise = createAsyncThunk<
  any,
  { parentKey: string; params: any },
  { rejectValue: string }
>("rsb/getExpertise", async ({ parentKey, params }, thunkAPI) => {
  console.log(params, parentKey);
  try {
    const response = await expertiseService.getAll(parentKey, params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});
export const createExpertise = createAsyncThunk<
  any,
  { parentKey: string; payload: any },
  { rejectValue: string }
>("expertise/createExpertise", async ({ parentKey, payload }, thunkAPI) => {
  try {
    const response = await expertiseService.create(parentKey, payload);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});
export const updateExpertise = createAsyncThunk<
  any,
  { id: string; payload: any },
  { rejectValue: string }
>("expertise/updateExpertise", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await expertiseService.updateBase(id, payload);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});
export const deleteExpertise = createAsyncThunk<
  any,
  { parentKey: string; id: string },
  { rejectValue: string }
>(
  "expertise/deleteExpertise",
  async ({ parentKey, id }, { rejectWithValue }) => {
    try {
      const response = await expertiseService.delete(parentKey, id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const expertiseSlice = createSlice({
  name: "expertise",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ExpertiseState>) => {
    addAsyncCaseHandlersExpertise(builder, getExpertise);
    addAsyncCaseHandlersExpertise(builder, createExpertise);
    addAsyncCaseHandlersExpertise(builder, updateExpertise);
    addAsyncCaseHandlersExpertise(builder, deleteExpertise);
  },
});
export default expertiseSlice.reducer;
