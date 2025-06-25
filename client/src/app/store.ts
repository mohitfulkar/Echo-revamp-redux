import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/features/authSlices";
import navigationReducer from "./core/features/navigationSlices";
import pollReducer from "./modules/polls/features/pollSlices";
import dashboardReducer from "./modules/dashboard/features/dashboardSlices";
import usersReducer from "./modules/voter/features/userSlices";
import choicesReducer from "./core/features/choiceSlices";
import sharedReducer from "./core/features/sharedStateSlices";
import multiStepStateReducer from "./core/features/multiStepStateReducer";
import categoryReducer from "./modules/settings/features/categorySlices";
import expertiseReducer from "./modules/settings/features/expertiseSlices";
import rsbReducer from "./modules/settings/features/rsbSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navigation: navigationReducer,
    poll: pollReducer,
    users: usersReducer,
    dashboard: dashboardReducer,
    choices: choicesReducer,
    shared: sharedReducer,
    multiStepState: multiStepStateReducer,
    category: categoryReducer,
    expertise: expertiseReducer,
    rsb: rsbReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; // Type for dispatch
export default store;
