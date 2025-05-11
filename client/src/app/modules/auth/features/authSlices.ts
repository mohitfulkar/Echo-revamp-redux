import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { authService } from "../service/authService";
import type {
  AuthState,
  OtpPayload,
  UserRegistration,
} from "../models/auth.interface";
import { REGISTER, VERIFY_OTP } from "../config/auth.constants";

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  success: false,
};

// Async thunk for registration
export const registerUser = createAsyncThunk<
  any, // Successful response type (replace with your actual response type)
  UserRegistration, // Argument type
  { rejectValue: string } // Reject value type (error message as string)
>("auth/registerUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.create(REGISTER, payload);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});
export const verifyOtp = createAsyncThunk<
  any,
  OtpPayload,
  { rejectValue: string }
>("auth/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.create(VERIFY_OTP, payload);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state: AuthState) {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(registerUser.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        registerUser.fulfilled,
        (state: AuthState, action: PayloadAction<any>) => {
          state.loading = false;
          state.user = action.payload;
          state.success = true;
        }
      )
      .addCase(
        registerUser.rejected,
        (state: AuthState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
