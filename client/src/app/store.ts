import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/features/authSlices";
import navigationReducer from "./core/features/navigationSlices";
import pollReducer from "./modules/polls/features/pollSlices";
import dashboardReducer from "./modules/dashboard/features/dashboardSlices";
import usersReducer from "./modules/voter/features/userSlices";
import choicesReducer from "./core/features/choiceSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navigation: navigationReducer,
    poll: pollReducer,
    users: usersReducer,
    dashboard: dashboardReducer,
    choices: choicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; // Type for dispatch
export default store;
