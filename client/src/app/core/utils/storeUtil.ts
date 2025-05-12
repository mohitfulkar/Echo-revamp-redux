// utils/reduxHelpers.ts
import type { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../modules/auth/models/auth.interface";

export const addAsyncCaseHandlers = (
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
