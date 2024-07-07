import { RootState } from "@redux/store";
import { getUserProfile } from "@redux/thunks/userThunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    profile: any;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserProfile(state) {
            state.profile = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "succeeded";
                console.log(action.payload);
                // state.profile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch user profile";
            });
    },
});

export const { clearUserProfile } = userSlice.actions;

export default userSlice.reducer;

export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;
