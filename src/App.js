import './App.css';

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { useState, useEffect } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth';
import RequireUnAuth from './components/RequireUnAuth';
import Users from './pages/Users';
import UserPage from './pages/UserPage';
import Settings from './pages/Settings';

import { store } from './store';
import useAuth from './hooks/useAuth';
import { fetchUserThunk } from './store/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let id;
  if (location.pathname.includes('/user/')) {
    id = location.pathname.split('/')[2];
  }

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, []);

  return (
    <div className="App">
      <Link to="/user">user</Link>
      <br />
      <Link to="/users">users</Link>
      <br />
      <Link to="/login">login</Link>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<h1>Home page</h1>} />
          <Route path="users" element={<Users />} />
          <Route
            path="user/:id"
            element={<UserPage key={id ? id : undefined} />}
          />
          <Route path="post/:id" element={<h1>Post</h1>} />
          <Route path="settings" element={<Settings />} />
          <Route path="feed" element={<h1>Feed</h1>} />
        </Route>
        <Route
          path="/login"
          element={
            <RequireUnAuth>
              <Login />
            </RequireUnAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RequireUnAuth>
              <Register />
            </RequireUnAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
