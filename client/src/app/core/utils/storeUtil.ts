// utils/reduxHelpers.ts
import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { AuthState } from "../../modules/auth/models/auth.interface";
import type { PollState } from "../../modules/polls/features/pollSlices";
import type { DashboardState } from "../../modules/dashboard/features/dashboardSlices";
import type { UserState } from "../../modules/voter/features/userSlices";
import type { ChoiceOption, ChoiceState } from "../features/choiceSlices";
import type { CategoryState } from "../../modules/settings/features/categorySlices";
import type { ExpertiseState } from "../../modules/settings/features/expertiseSlices";
import type { RsbState } from "../../modules/settings/features/rsbSlices";
import type { DesignationState } from "../../modules/settings/features/designationSlices";
import type { PanelistxState } from "../../modules/panelistx/features/panelistxSlices";

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

export const addAsyncCaseHandlersUser = <
  Returned extends any[], // Make sure the response is an array
  ThunkArg extends { tab?: string }
>(
  builder: ActionReducerMapBuilder<UserState>,
  asyncThunk: AsyncThunk<Returned, ThunkArg, { rejectValue: any }>
) => {
  builder
    .addCase(asyncThunk.pending, (state: UserState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      const key = action.meta.arg?.tab || "users";
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

export const addAsyncCaseHandlersPanelist = (
  builder: ActionReducerMapBuilder<PanelistxState>,
  asyncThunk: any
) => {
  builder
    .addCase(asyncThunk.pending, (state: PanelistxState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(
      asyncThunk.fulfilled,
      (state: PanelistxState, action: PayloadAction<any>) => {
        state.loading = false;
        state.items = action.payload;
        state.success = true;
      }
    )
    .addCase(
      asyncThunk.rejected,
      (state: PanelistxState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }
    );
};

export const addAsyncCaseHandlersChoice = (
  builder: ActionReducerMapBuilder<ChoiceState>,
  asyncThunk: any
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      asyncThunk.fulfilled,
      (
        state,
        action: PayloadAction<
          ChoiceOption[],
          string,
          {
            arg: {
              parentKey: string;
            };
          }
        >
      ) => {
        const parentKey = action.meta.arg.parentKey;
        state.loading = false;
        state.choices[parentKey] = action.payload;
      }
    )
    .addCase(asyncThunk.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
};

export const addAsyncCaseHandlersCategory = (
  builder: ActionReducerMapBuilder<CategoryState>,
  asyncThunk: any
) => {
  builder
    .addCase(asyncThunk.pending, (state: CategoryState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(
      asyncThunk.fulfilled,
      (state: CategoryState, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      }
    )
    .addCase(
      asyncThunk.rejected,
      (state: CategoryState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }
    );
};
export const addAsyncCaseHandlersExpertise = (
  builder: ActionReducerMapBuilder<ExpertiseState>,
  asyncThunk: any
) => {
  builder
    .addCase(asyncThunk.pending, (state: ExpertiseState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(
      asyncThunk.fulfilled,
      (state: ExpertiseState, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      }
    )
    .addCase(
      asyncThunk.rejected,
      (state: ExpertiseState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }
    );
};
export const addAsyncCaseHandlersRsb = (
  builder: ActionReducerMapBuilder<RsbState>,
  asyncThunk: any
) => {
  builder
    .addCase(asyncThunk.pending, (state: RsbState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(
      asyncThunk.fulfilled,
      (state: RsbState, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      }
    )
    .addCase(
      asyncThunk.rejected,
      (state: RsbState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }
    );
};
export const addAsyncCaseHandlersDesignation = (
  builder: ActionReducerMapBuilder<DesignationState>,
  asyncThunk: any
) => {
  builder
    .addCase(asyncThunk.pending, (state: DesignationState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(
      asyncThunk.fulfilled,
      (state: DesignationState, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      }
    )
    .addCase(
      asyncThunk.rejected,
      (state: DesignationState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }
    );
};
