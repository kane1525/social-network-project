import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, fetchUser, createComment } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api/api';

const initialState = {
  searchValue: '',
  allUsers: [],
  usersToShow: [],
  currentUserPage: null,
  isLoading: true,
};

export const setCurrentUserPageThunk = createAsyncThunk(
  'users/setCurrentUserPage',
  async (id) => {
    const response = await getUserById(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload;
      state.usersToShow = state.allUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.lastName.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.login.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setUsers: (state, action) => {
      state.allUsers = action.payload;
      state.usersToShow = action.payload;
    },
    incrementFollower: (state) => {
      state.currentUserPage.followersCount++;
    },
    decrementFollower: (state) => {
      state.currentUserPage.followersCount--;
    },
    toggleUiFollow: (state, action) => {
      const userToToggle = state.usersToShow.find(
        (user) => user._id === action.payload
      );
      userToToggle.isFollow = !userToToggle.isFollow;
    },
    addPost: (state, action) => {
      state.currentUserPage.posts.push(action.payload);
    },
    togglePostLike: (state, action) => {
      const { user, postId } = action.payload;
      const post = state.currentUserPage.posts.find(
        (post) => post._id === postId
      );
      const liked = post.likes.find((u) => u._id === user.id);
      if (liked) {
        post.likes = post.likes.filter((u) => {
          console.log(u._id);
          console.log(user.id);
          return u._id !== user.id;
        });
      } else {
        post.likes.push({ _id: user.id });
      }
    },

    setCurrentUserPage: (state, action) => {
      state.currentUserPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentUserPageThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setCurrentUserPageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUserPage = action.payload;
      });
  },
});

export const {
  changeSearchValue,
  setUsers,
  toggleUiFollow,
  setCurrentUserPage,
  incrementFollower,
  decrementFollower,
  addPost,
  togglePostLike,
} = usersSlice.actions;

export default usersSlice.reducer;
