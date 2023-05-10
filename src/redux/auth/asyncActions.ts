import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreatePostData,
  GetCurrentUserResponse,
  GetUserByIdResponse,
  LoginData,
  UpdateUserData,
} from "types/apiTypes";

import {
  createPost,
  fetchUser,
  getUserById,
  login,
  toggleFollow,
  updateUser,
} from "../../api";
import {
  addPost,
  decrementFollower,
  incrementFollower,
} from "../users/usersSlice";
import { AuthState } from "./authSlice";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (userData: LoginData) => {
    const response = await login(userData);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchUserThunk = createAsyncThunk<
  never | GetCurrentUserResponse,
  undefined,
  { state: { auth: AuthState } }
>("auth/fetchUser", async (_, { getState }) => {
  if (!getState().auth.error) {
    const response = await fetchUser();
    // The value we return becomes the `fulfilled` action payload
    return response;
  } else {
    throw new Error(getState().auth.error);
  }
});

export const followThunk = createAsyncThunk<
  { user: GetUserByIdResponse; response: string },
  { userId: string; path?: string },
  { state: { auth: AuthState } }
>("auth/followUser", async ({ userId, path = "" }, { getState, dispatch }) => {
  const promises = [getUserById(userId), toggleFollow(userId)] as const;
  const [user, response] = await Promise.all(promises);
  if (path) {
    if (getState().auth.user?.following.find((u) => u.id === userId)) {
      dispatch(decrementFollower());
    } else {
      dispatch(incrementFollower());
    }
  }
  return { user, response };
});

export const createPostThunk = createAsyncThunk(
  "auth/createPost",
  async (postData: CreatePostData, { dispatch }) => {
    const newPost = await createPost(postData);
    dispatch(addPost(newPost));
    return newPost;
  }
);

export const updateUserThunk = createAsyncThunk(
  "auth/updateUser",
  async (userData: UpdateUserData) => {
    try {
      const updatedUserData = await updateUser(userData);
      return updatedUserData;
    } catch (error) {
      throw error;
    }
  }
);
