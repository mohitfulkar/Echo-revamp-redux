// utils/reduxHelpers.ts
import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { AuthState } from "../../modules/auth/models/auth.interface";
import type { PollState } from "../../modules/polls/features/pollSlices";
import type { DashboardState } from "../../modules/dashboard/features/dashboardSlices";

export const addAsyncCaseHandlersAuth = (
  builder: ActionReducerMapBuilder<AuthState>,
  asyncThunk: any
) => {
  builder
    .addCase(asyncThunk.pending, (state: AuthState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(
      asyncThunk.fulfilled,
      (state: AuthState, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      }
    )
    .addCase(
      asyncThunk.rejected,
      (state: AuthState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }
    );
};
export const addAsyncCaseHandlersPoll = <
  Returned extends any[], // Make sure the response is an array
  ThunkArg extends { status?: string }
>(
  builder: ActionReducerMapBuilder<PollState>,
  asyncThunk: AsyncThunk<Returned, ThunkArg, { rejectValue: any }>
) => {
  builder
    .addCase(asyncThunk.pending, (state: PollState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      const key = action.meta.arg?.status || "polls";
      state.loading = false;
      state.itemsByKey[key] = action.payload; // Type-safe now
      state.success = true;
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
};

export const addAsyncCaseHandlersDashboard = (
  builder: ActionReducerMapBuilder<DashboardState>,
  asyncThunk: any
) => {
  builder
    .addCase(asyncThunk.pending, (state: DashboardState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(
      asyncThunk.fulfilled,
      (state: DashboardState, action: PayloadAction<any>) => {
        state.loading = false;
        state.items = action.payload;
        state.success = true;
      }
    )
    .addCase(
      asyncThunk.rejected,
      (state: DashboardState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }
    );
};
