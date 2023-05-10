import axios from "axios";

import {
  CreateCommentData,
  CreateCommentResponse,
  CreatePostData,
  CreatePostResponse,
  GetCommentsByPostIdResponse,
  GetCurrentUserResponse,
  GetFollowersFollowingsResponse,
  GetUserByIdResponse,
  GetUsersResponse,
  LikePostResponse,
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  UpdatePasswordData,
  UpdateUserData,
  UpdateUserResponse,
} from "../types/apiTypes";

// const API_BASE_URL = "http://52.3.249.107:9000";
const API_BASE_URL = "https://aqueous-beyond-50648.herokuapp.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (registerData: RegisterData) => {
  try {
    const response = await api.post<RegisterResponse>(
      "/auth/registration",
      registerData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const login = async (loginData: LoginData) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", loginData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get<GetCurrentUserResponse>("/users/current");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get<GetUsersResponse>("/users");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const toggleFollow = async (userId: string) => {
  try {
    const response = await api.get<string>(`/users/follow/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await api.get<GetUserByIdResponse>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const getFollowersAndFollowingsById = async (userId: string) => {
  try {
    const response = await api.get<GetFollowersFollowingsResponse>(
      `/users/followersAndFollowing/${userId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const createPost = async (postData: CreatePostData) => {
  try {
    const response = await api.post<CreatePostResponse>("/posts", postData, {
      headers: {
        "Content-Type": "",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const getCommentsByPostId = async (postId: string) => {
  try {
    const response = await api.get<GetCommentsByPostIdResponse>(
      `/comments/${postId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const likePost = async (postId: string) => {
  try {
    const response = await api.get<LikePostResponse>(`/posts/like/${postId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const createComment = async (comment: CreateCommentData) => {
  try {
    const response = await api.post<CreateCommentResponse>(
      `/comments`,
      comment
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await api.delete<string>(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const updateUser = async (userInfo: UpdateUserData) => {
  try {
    const response = await api.patch<UpdateUserResponse>(
      `/users/current`,
      userInfo
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};

export const updatePassword = async (newPasswordInfo: UpdatePasswordData) => {
  try {
    const response = await api.post<string>(
      `/auth/updatePassword`,
      newPasswordInfo
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error("unexpected error");
    }
  }
};
