import { RootState } from "redux/store";

export const authUserSelector = (state: RootState) => state.auth.user;
export const authUserPostsSelector = (state: RootState) =>
  state.auth.user?.posts;
export const authLoadingSelector = (state: RootState) => state.auth.isLoading;
export const authErrorSelector = (state: RootState) => state.auth.error;
