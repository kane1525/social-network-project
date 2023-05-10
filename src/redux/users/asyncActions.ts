import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUserById } from "../../api";

export const setCurrentUserPageThunk = createAsyncThunk(
  "users/setCurrentUserPage",
  async (id: string) => {
    const response = await getUserById(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
