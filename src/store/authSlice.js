import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  fetchUser,
  toggleFollow,
  getUserById,
  createPost,
  updateUser,
} from '../api/api';
import { incrementFollower, decrementFollower, addPost } from './usersSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: localStorage.getItem('token') || null,
};

export const loginThunk = createAsyncThunk('auth/login', async (userData) => {
  const response = await login(userData);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const fetchUserThunk = createAsyncThunk(
  'auth/fetchUser',
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
  'auth/followUser',
  async (userId, { getState, dispatch }) => {
    const promises = [getUserById(userId), toggleFollow(userId)];
    const [user, response] = await Promise.all(promises);
    console.log(getState());
    if (getState().auth.user.following.find((u) => u.id === userId)) {
      dispatch(decrementFollower());
    } else {
      dispatch(incrementFollower());
    }
    return { user, response };
  }
);

export const createPostThunk = createAsyncThunk(
  'auth/createPost',
  async (postData, { dispatch }) => {
    const newPost = await createPost(postData);
    dispatch(addPost(newPost));
    return newPost;
  }
);

export const updateUserThunk = createAsyncThunk(
  'auth/updateUser',
  async (userData) => {
    const updatedUserData = await updateUser(userData);
    return updatedUserData;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem('token', '');
      state.user = null;
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { access_token } = action.payload;
        state.token = access_token;
        localStorage.setItem('token', access_token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Not correct data';
      })
      .addCase(fetchUserThunk.pending, (state) => {
        state.isLoading = true;
        // state.error = null;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(followThunk.pending, (state) => {
        // state.isLoading = true;
        // state.error = null;
      })
      .addCase(followThunk.fulfilled, (state, action) => {
        const { user, response } = action.payload;
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
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.user.posts.push(action.payload);
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        throw new Error('Cannot change form');
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
