import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";

export const store = configureStore({
  reducer: { auth: authReducer, users: usersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
