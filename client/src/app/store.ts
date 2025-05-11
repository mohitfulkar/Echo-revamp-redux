import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/features/authSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch; // Type for dispatch
export default store;
