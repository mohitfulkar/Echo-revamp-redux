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
    console.log("tab", tab);
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
>("panelists/getAll", async (params, { rejectWithValue }) => {
  try {
    const response = await userService.getAll("", params); // assumes axios response
    return response.data; // make sure service returns `{ data: [...] }`
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch panelists"
    );
  }
});
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    addAsyncCaseHandlersUser(builder, getUsersByTab);
    addAsyncCaseHandlersUser(builder, getPanelists);
  },
});

export default userSlice.reducer;
