import { configureStore } from "@reduxjs/toolkit";
import pollReducer from "./features/poll/pollSlice.js";
import authReducer from "./features/auth/authSlice.js";
import userReducer from "./features/user/userSlices.js";
import panelistReducer from "./features/panelist/panelistSlices.js";

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    poll: pollReducer,
    auth: authReducer,
    user: userReducer,
    panelist: panelistReducer,
  },
});
