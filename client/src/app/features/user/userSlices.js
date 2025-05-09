import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleAsyncAction } from "../../utils/extraReducer";
import { baseUrl } from "../../../constants/env";
const initialState = {
  users: [],
  user: null,
  loading: false,
  success: false,
  error: null,
  lastFetched: null, // Add this field
};

export const getUserItems = createAsyncThunk("user/getUserItems", async () => {
  const response = await axios.get(`${baseUrl}/users`); // Example API
  return response.data;
});

export const getUserById = createAsyncThunk("user/getUserById", async (id) => {
  const response = await axios.get(`${baseUrl}/user-detail/${id}`);
  return response.data;
});
const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncAction(builder, getUserItems, "users");
    handleAsyncAction(builder, getUserById, "user");
  },
});

export default userSlices.reducer;
