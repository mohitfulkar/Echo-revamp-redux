import {
  createSlice,
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { authService } from "../service/authService";
import type {
  AuthState,
  OtpPayload,
  UserLogin,
  UserRegistration,
} from "../models/auth.interface";
import { LOGIN, REGISTER, VERIFY_OTP } from "../config/auth.constants";
import { addAsyncCaseHandlers } from "../../../core/utils/storeUtil";

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

export const loginUser = createAsyncThunk<
  any,
  UserLogin,
  { rejectValue: string }
>("auth/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.create(LOGIN, payload);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const adminLogin = createAsyncThunk<
  { message: string; user: string }, // ✅ updated return type
  { password: string },
  { rejectValue: string }
>("auth/adminLogin", async (payload, { rejectWithValue }) => {
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  if (!adminPassword) {
    return rejectWithValue("Admin password not set");
  }
  if (payload.password === adminPassword) {
    return { message: "Login successful", user: "admin" };
  } else {
    return rejectWithValue("Incorrect password");
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
    addAsyncCaseHandlers(builder, registerUser);
    addAsyncCaseHandlers(builder, loginUser);
    addAsyncCaseHandlers(builder, adminLogin);
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
