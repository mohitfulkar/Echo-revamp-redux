import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/features/authSlices";
import navigationReducer from "./core/features/navigationSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navigation: navigationReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; // Type for dispatch
export default store;
