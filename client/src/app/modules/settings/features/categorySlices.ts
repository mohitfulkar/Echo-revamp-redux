import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { categoryService } from "../services/settingService";
import { addAsyncCaseHandlersCategory } from "../../../core/utils/storeUtil";
import type { CardDataItem } from "../pages/CategoryLanding";

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
  prev: string | null;
  next: string | null;
}

export interface CategoryState {
  data: {
    pagination: PaginationInfo;
    categories: CardDataItem[];
  }; // Or use Record<string, Poll[]> for stronger typing
  loading: boolean;
  error: string | null;
  success: boolean;
}
const initialState: CategoryState = {
  data: {
    pagination: {
      total: 0,
      page: 0,
      limit: 0,
      pages: 0,
      prev: null,
      next: null,
    },
    categories: [],
  },
  loading: false,
  error: null,
  success: false,
};

export const getCategory = createAsyncThunk<
  any,
  { parentKey: string; params: any },
  { rejectValue: string }
>("rsb/getCategory", async ({ parentKey, params }, thunkAPI) => {
  try {
    const response = await categoryService.getAll(parentKey, params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});
export const createCategory = createAsyncThunk<
  any,
  { parentKey: string; payload: any },
  { rejectValue: string }
>(
  "category/createCategory",
  async ({ parentKey, payload }, { rejectWithValue }) => {
    try {
      const response = await categoryService.create(parentKey, payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const updateCategory = createAsyncThunk<
  any,
  { id: string; payload: any },
  { rejectValue: string }
>("category/updateCategory", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await categoryService.updateBase(id, payload);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const deleteCategory = createAsyncThunk<
  any,
  { parentKey: string; id: string },
  { rejectValue: string }
>("category/deleteCategory", async ({ parentKey, id }, { rejectWithValue }) => {
  try {
    const response = await categoryService.delete(parentKey, id);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategory: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<CategoryState>) => {
    addAsyncCaseHandlersCategory(builder, getCategory);
  },
});

export const { resetCategory } = categorySlice.actions;
export default categorySlice.reducer;
