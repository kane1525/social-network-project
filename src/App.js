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

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import RequireAuth from './routes/RequireAuth';
import RequireUnAuth from './routes/RequireUnAuth';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import SettingsPage from './pages/SettingsPage';

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
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route index element={<h1>Home page</h1>} />
          <Route path="users" element={<UsersPage />} />
          <Route
            path="user/:id"
            element={<UserPage key={id ? id : undefined} />}
          />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route
          path="/login"
          element={
            <RequireUnAuth>
              <LoginPage />
            </RequireUnAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RequireUnAuth>
              <RegisterPage />
            </RequireUnAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
