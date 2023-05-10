import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GetUserByIdResponse,
  GetUsersResponse,
  UserBaseWith_Id,
  UserWith_IdAndFollowCount,
} from "types/apiTypes";

import { setCurrentUserPageThunk } from "./asyncActions";

interface UsersState {
  searchValue: string;
  allUsers: (UserWith_IdAndFollowCount & { isFollow: boolean })[];
  usersToShow: (UserWith_IdAndFollowCount & { isFollow: boolean })[];
  currentUserPage: GetUserByIdResponse | null;
  isLoading: boolean;
}

const initialState: UsersState = {
  searchValue: "",
  allUsers: [],
  usersToShow: [],
  currentUserPage: null,
  isLoading: true,
};

const usersSlice = createSlice({
  name: "users",
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
    setUsers: (state, action: PayloadAction<GetUsersResponse>) => {
      state.allUsers = action.payload;
      state.usersToShow = action.payload;
    },
    incrementFollower: (state) => {
      if (state.currentUserPage) {
        state.currentUserPage.followersCount++;
      }
    },
    decrementFollower: (state) => {
      if (state.currentUserPage) {
        state.currentUserPage.followersCount--;
      }
    },
    toggleUiFollow: (state, action) => {
      const userToToggle = state.usersToShow.find(
        (user) => user._id === action.payload
      );
      if (userToToggle) {
        userToToggle.isFollow = !userToToggle.isFollow;
      }
    },
    addPost: (state, action) => {
      if (state.currentUserPage) {
        state.currentUserPage.posts.push(action.payload);
      }
    },
    togglePostLike: (state, action) => {
      const { user, postId } = action.payload;
      if (state.currentUserPage) {
        const post = state.currentUserPage.posts.find(
          (post) => post._id === postId
        );
        if (post) {
          const liked = post.likes.find((u) => u._id === user.id);
          if (liked) {
            post.likes = post.likes.filter((u) => {
              return u._id !== user.id;
            });
          } else {
            post.likes.push({ _id: user.id } as Omit<UserBaseWith_Id, "email">);
          }
        }
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
