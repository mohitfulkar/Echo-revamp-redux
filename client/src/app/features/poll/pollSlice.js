import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAsyncAction } from "../../utils/extraReducer.js";
import { commanService } from "../../../service/commanService.js";
import { baseUrl } from "../../../constants/env.js";
const initialState = {
  pollItems: [],
  pollItem: null,
  count: null,
  loading: false,
  error: null,
  success: false,
};

export const getPollItems = createAsyncThunk(
  "poll/getPollItems",
  async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString(); // Convert object to URL query string
      const response = await commanService.getAll(`polls?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching poll items:", error);
      throw error;
    }
  }
);

export const getPollById = createAsyncThunk("poll/getPollById", async (id) => {
  const response = await axios.get(`${baseUrl}/poll-detail/${id}`); // Fetch a single poll by ID
  return response.data;
});
export const getPollCount = createAsyncThunk("poll/getPollCount", async () => {
  const response = await axios.get(`${baseUrl}/poll-count`);
  return response.data;
});

export const createPoll = createAsyncThunk(
  "poll/createPoll",
  async (pollData, { rejectWithValue }) => {
    try {
      return await commanService.create("create-poll", pollData);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const deletePollById = createAsyncThunk(
  "poll/deletePollById",
  async (id, { rejectWithValue }) => {
    try {
      return await commanService.delete("delete-poll", id);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const updateStatus = createAsyncThunk(
  "poll/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await commanService.update("poll/status", id, { status });
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const updateVoteCount = createAsyncThunk(
  "poll/updateVoteCount",
  async ({ userId, pollId, option }, { rejectWithValue }) => {
    try {
      return await commanService.update(`update-vote`, userId, {
        pollId,
        option,
      });
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

let constant = [
  { method: getPollItems, variable: "pollItems" },
  { method: getPollById, variable: "pollItem" },
  { method: createPoll, variable: "pollItem" },
  { method: updateStatus, variable: "pollItem" },
  { method: getPollCount, variable: "count" },
];
const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    constant.forEach((item) => {
      handleAsyncAction(builder, item.method, item.variable);
    });
  },
});

export default pollSlice.reducer;
