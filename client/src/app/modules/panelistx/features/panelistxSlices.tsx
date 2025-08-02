import { createAsyncThunk, createSlice, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { userService } from "../../voter/services/userService";
import { addAsyncCaseHandlersPanelist } from "../../../core/utils/storeUtil";
import { APPROVAL_THRESHOLD_PERCENT } from "../constants/panelistx.constant";
import { apiService } from "../services/apiService";

export interface PanelistxState {
    items: any // Keyed by tab name
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: PanelistxState = {
    items: null,
    loading: false,
    error: null,
    success: false,
};



export const getPanelistSummary = createAsyncThunk<
    any[],
    any,
    { rejectValue: string }
>(
    "users/getPanelistSummary",
    async ({ parentKey, params }, { rejectWithValue }) => {
        try {
            const response = await userService.getAll(parentKey, params);
            return response.data; // assumes response.data holds the panelist object
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch panelist"
            );
        }
    }
);

export const voteToPanelist = createAsyncThunk<
    any,
    any,
    { rejectValue: string }
>(
    "users/voteToPanelist",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            const response = await apiService.createWithPathVariable("vote", ["panelist", id], payload);
            return response // assumes response.data holds the panelist object
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch panelist"
            );
        }
    }
);


const panelistxSlices = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetUsers: (state) => {
            state.items = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        updateVoteCountAndCleanup: (state, action) => {
            const { userId, voteCount, approvalPercent, key } = action.payload;


            const shouldApprove = approvalPercent >= APPROVAL_THRESHOLD_PERCENT;

            // If items is an array
            if (Array.isArray(state.items[key])) {
                console.log('mohit')
                const index = state.items[key].findIndex((item: any) => item.id === userId);
                if (index !== -1) {
                    const updated = {
                        ...state.items[key][index],
                        voteCount,
                        approvalPercent,
                        status: shouldApprove ? "APPROVED" : state.items[key][index].status,
                    };

                    if (shouldApprove) {
                        state.items[key].splice(index, 1);
                    } else {
                        state.items[key][index] = updated;
                    }
                }
            }

            // If items is an object
            else if (typeof state.items === "object" && state.items !== null) {
                console.log('mohit')
                const existing = state.items[userId];
                if (existing) {
                    const updated = {
                        ...existing,
                        voteCount,
                        approvalPercent,
                        status: shouldApprove ? "APPROVED" : existing.status,
                    };

                    if (shouldApprove) {
                        delete state.items[userId];
                    } else {
                        state.items[userId] = updated;
                    }
                }
            }

        }




    },
    extraReducers: (builder: ActionReducerMapBuilder<PanelistxState>) => {
        addAsyncCaseHandlersPanelist(builder, getPanelistSummary);
        addAsyncCaseHandlersPanelist(builder, voteToPanelist);
    },
});
export const { resetUsers, updateVoteCountAndCleanup } = panelistxSlices.actions;
export default panelistxSlices.reducer;