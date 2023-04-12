export const authUserSelector = (state) => state.auth.user;
export const authUserPostsSelector = (state) => state.auth.user.posts;
export const authLoadingSelector = (state) => state.auth.isLoading;
export const authErrorSelector = (state) => state.auth.error;
