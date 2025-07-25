import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

import { addAsyncCaseHandlersUser } from "../../../core/utils/storeUtil";
import { userService } from "../services/userService";

export interface UserState {
  itemsByKey: Record<string, any>; // Keyed by tab name
  loading: boolean;
  error: string | null;
  success: boolean;
}
const initialState: UserState = {
  itemsByKey: {},
  loading: false,
  error: null,
  success: false,
};

export const getUsersByTab = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("users/getUsersByTab", async ({ tab, params }, { rejectWithValue }) => {
  try {
    let response;
    switch (tab) {
      case "voter":
        response = await userService.getAll("", params);
        break;
      case "panelists":
        response = await userService.getAll("panelists", params);
        break;
      case "admin":
        response = await userService.getAll("", params);
        break;
      default:
        throw new Error("Invalid tab name");
    }
    return { tab, data: response.data }; // assume response.data holds the array/list
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch users"
    );
  }
});

export const getPanelists = createAsyncThunk<
  any[],
  any,
  { rejectValue: string }
>("users/getAll", async ({ parentKey, id, params }, { rejectWithValue }) => {
  try {
    const response = await userService.getItemById(parentKey, id, params); // assumes axios response
    return response.data; // make sure service returns `{ data: [...] }`
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch panelists"
    );
  }
});
export const createSuperPanelists = createAsyncThunk<
  any[],
  any,
  { rejectValue: string }
>("users/createSuperPanelists", async (payload, { rejectWithValue }) => {
  try {
    const response = await userService.create("super-panelists", payload); // assumes axios response
    return response.data; // make sure service returns `{ data: [...] }`
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch panelists"
    );
  }
});
export const createPanelists = createAsyncThunk<
  any[],
  any,
  { rejectValue: string }
>("users/createPanelists", async (payload, { rejectWithValue }) => {
  try {
    const response = await userService.create("panelists", payload); // assumes axios response
    return response.data; // make sure service returns `{ data: [...] }`
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch panelists"
    );
  }
});
export const getPanelistById = createAsyncThunk<
  any[],
  any,
  { rejectValue: string }
>("users/getPanelistById", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await userService.getItemById("panelist", id);
    return response.data; // assumes response.data holds the panelist object
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch panelist"
    );
  }
});
export const updatePanelist = createAsyncThunk<
  any[],
  any,
  { rejectValue: string }
>("users/updatePanelist", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await userService.update("panelist", id, payload); // assumes axios response
    return response.data; // assumes response.data holds the updated panelist object
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update panelist"
    );
  }
});

export const getPanelistSummary = createAsyncThunk<
  any[],
  any,
  { rejectValue: string }
>(
  "users/getPanelistSummary",
  async ({ parentKey, params }, { rejectWithValue }) => {
    try {
      const response = await userService.getAll(parentKey, params);
      return response.data; // assumes response.data holds the panelist object
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch panelist"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.itemsByKey = {};
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    updateVoteCount: (state, action) => {
      const { userId, voteCount, approvalPercent, key, subKey } =
        action.payload;

      if (
        state.itemsByKey[key] &&
        state.itemsByKey[key][subKey] &&
        Array.isArray(state.itemsByKey[key][subKey])
      ) {
        const userIndex = state.itemsByKey[key][subKey].findIndex(
          (user: any) => user.id === userId
        );

        if (userIndex !== -1) {
          state.itemsByKey[key][subKey][userIndex] = {
            ...state.itemsByKey[key][subKey][userIndex],
            approvalPercent: approvalPercent,
            voteCount: voteCount,
          };
        }
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    addAsyncCaseHandlersUser(builder, getUsersByTab);
    addAsyncCaseHandlersUser(builder, getPanelists);
    addAsyncCaseHandlersUser(builder, createSuperPanelists);
    addAsyncCaseHandlersUser(builder, createPanelists);
    addAsyncCaseHandlersUser(builder, getPanelistById);
    addAsyncCaseHandlersUser(builder, updatePanelist);
    addAsyncCaseHandlersUser(builder, getPanelistSummary);
  },
});
export const { resetUsers, updateVoteCount } = userSlice.actions;
export default userSlice.reducer;
