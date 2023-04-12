import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createPost,
  fetchUser,
  getUserById,
  login,
  toggleFollow,
  updateUser,
} from "../../api/api";
import {
  addPost,
  decrementFollower,
  incrementFollower,
} from "../users/usersSlice";

export const loginThunk = createAsyncThunk("auth/login", async (userData) => {
  const response = await login(userData);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const fetchUserThunk = createAsyncThunk(
  "auth/fetchUser",
  async (_, { getState }) => {
    if (!getState().auth.error) {
      const response = await fetchUser();
      // The value we return becomes the `fulfilled` action payload
      return response;
    } else {
      throw new Error(getState().auth.error);
    }
  }
);

export const followThunk = createAsyncThunk(
  "auth/followUser",
  async (userId, { getState, dispatch }) => {
    const promises = [getUserById(userId), toggleFollow(userId)];
    const [user, response] = await Promise.all(promises);
    if (getState().auth.user.following.find((u) => u.id === userId)) {
      dispatch(decrementFollower());
    } else {
      dispatch(incrementFollower());
    }
    return { user, response };
  }
);

export const createPostThunk = createAsyncThunk(
  "auth/createPost",
  async (postData, { dispatch }) => {
    const newPost = await createPost(postData);
    dispatch(addPost(newPost));
    return newPost;
  }
);

export const updateUserThunk = createAsyncThunk(
  "auth/updateUser",
  async (userData) => {
    const updatedUserData = await updateUser(userData);
    return updatedUserData;
  }
);
