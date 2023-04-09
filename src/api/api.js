import axios from 'axios';

const API_BASE_URL = 'http://52.3.249.107:9000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/registration', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get('/users/current');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const toggleFollow = async (userId) => {
  try {
    const response = await api.get(`/users/follow/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getFollowersAndFollowingsById = async (userId) => {
  try {
    const response = await api.get(`/users/followersAndFollowing/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData, {
      headers: {
        'Content-Type': '',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const likePost = async (postId) => {
  try {
    const response = await api.get(`/posts/like/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const createComment = async (comment) => {
  try {
    const response = await api.post(`/comments`, comment);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const updateUser = async (userInfo) => {
  try {
    const response = await api.patch(`/users/current`, userInfo);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const updatePassword = async (newPasswordInfo) => {
  try {
    const response = await api.post(`/auth/updatePassword`, newPasswordInfo);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
