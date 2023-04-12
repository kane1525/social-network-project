import { createSlice } from "@reduxjs/toolkit";

import * as thunks from "./asyncActions";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem("token", "");
      state.user = null;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(thunks.loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { access_token } = action.payload;
        state.token = access_token;
        localStorage.setItem("token", access_token);
      })
      .addCase(thunks.loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.name !== "TypeError") {
          state.error = "Not correct data";
        }
      })
      .addCase(thunks.fetchUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunks.fetchUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(thunks.fetchUserThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(thunks.followThunk.pending, (state) => {})
      .addCase(thunks.followThunk.fulfilled, (state, action) => {
        const { user } = action.payload;
        const wasFollowed =
          state.user.following.findIndex((u) => u.id === user.id) !== -1;

        if (wasFollowed) {
          state.user.following = state.user.following.filter(
            (u) => u.id !== user.id
          );
        } else {
          state.user.following.push(user);
        }
      })
      .addCase(thunks.createPostThunk.fulfilled, (state, action) => {
        state.user.posts.push(action.payload);
      })
      .addCase(thunks.updateUserThunk.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(thunks.updateUserThunk.rejected, (state, action) => {
        throw new Error("Cannot change form");
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
