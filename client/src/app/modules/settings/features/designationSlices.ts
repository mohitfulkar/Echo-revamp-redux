import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { addAsyncCaseHandlersDesignation } from "../../../core/utils/storeUtil";
import { designationService } from "../services/settingService";

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
  prev: string | null;
  next: string | null;
}

export interface DesignationDataItem {
  name: string;
  description: string;
  isActive?: boolean;
  statusDisplay?: string;
  createdDate?: string;
  createdTime?: string;
}

export interface DesignationState {
  data: {
    pagination: PaginationInfo;
    designation: DesignationDataItem[];
  };
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DesignationState = {
  data: {
    pagination: {
      total: 0,
      page: 0,
      limit: 0,
      pages: 0,
      prev: null,
      next: null,
    },
    designation: [],
  },
  loading: false,
  error: null,
  success: false,
};

export const getDesignation = createAsyncThunk<
  any,
  { parentKey: string; params: any },
  { rejectValue: string }
>("designation/getDesignation", async ({ parentKey, params }, thunkAPI) => {
  try {
    const response = await designationService.getAll(parentKey, params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const createDesignation = createAsyncThunk<
  any,
  { parentKey: string; payload: any },
  { rejectValue: string }
>("designation/createDesignation", async ({ parentKey, payload }, thunkAPI) => {
  try {
    const response = await designationService.create(parentKey, payload);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const updateDesignation = createAsyncThunk<
  any,
  { id: string; payload: any },
  { rejectValue: string }
>(
  "designation/updateDesignation",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await designationService.updateBase(id, payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const deleteDesignation = createAsyncThunk<
  any,
  { parentKey: string; id: string },
  { rejectValue: string }
>(
  "designation/deleteDesignation",
  async ({ parentKey, id }, { rejectWithValue }) => {
    try {
      const response = await designationService.delete(parentKey, id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const designationSlice = createSlice({
  name: "designation",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DesignationState>) => {
    addAsyncCaseHandlersDesignation(builder, getDesignation);
    addAsyncCaseHandlersDesignation(builder, createDesignation);
    addAsyncCaseHandlersDesignation(builder, updateDesignation);
    addAsyncCaseHandlersDesignation(builder, deleteDesignation);
  },
});

export default designationSlice.reducer;
