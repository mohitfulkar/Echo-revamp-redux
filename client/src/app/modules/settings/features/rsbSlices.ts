import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { rsbService } from "../services/settingService";
import { addAsyncCaseHandlersRsb } from "../../../core/utils/storeUtil";

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
  prev: string | null;
  next: string | null;
}

export interface RsbDataItem {
  name: string;
  description: string;
  isActive?: boolean;
  statusDisplay?: string;
  createdDate?: string;
  createdTime?: string;
}

export interface RsbState {
  data: {
    pagination: PaginationInfo;
    rsb: RsbDataItem[];
  };
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RsbState = {
  data: {
    pagination: {
      total: 0,
      page: 0,
      limit: 0,
      pages: 0,
      prev: null,
      next: null,
    },
    rsb: [],
  },
  loading: false,
  error: null,
  success: false,
};

export const getRsb = createAsyncThunk<
  any,
  { parentKey: string; params: any },
  { rejectValue: string }
>("rsb/getRsb", async ({ parentKey, params }, thunkAPI) => {
  try {
    const response = await rsbService.getAll(parentKey, params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const createRsb = createAsyncThunk<
  any,
  { parentKey: string; payload: any },
  { rejectValue: string }
>("rsb/createRsb", async ({ parentKey, payload }, thunkAPI) => {
  try {
    const response = await rsbService.create(parentKey, payload);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const updateRsb = createAsyncThunk<
  any,
  { id: string; payload: any },
  { rejectValue: string }
>("rsb/updateRsb", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await rsbService.updateBase(id, payload);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const deleteRsb = createAsyncThunk<
  any,
  { parentKey: string; id: string },
  { rejectValue: string }
>("rsb/deleteRsb", async ({ parentKey, id }, { rejectWithValue }) => {
  try {
    const response = await rsbService.delete(parentKey, id);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

const rsbSlice = createSlice({
  name: "rsb",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<RsbState>) => {
    addAsyncCaseHandlersRsb(builder, getRsb);
    addAsyncCaseHandlersRsb(builder, createRsb);
    addAsyncCaseHandlersRsb(builder, updateRsb);
    addAsyncCaseHandlersRsb(builder, deleteRsb);
  },
});
export default rsbSlice.reducer;
