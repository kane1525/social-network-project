import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import UserPage from "./pages/UserPage";
import UsersPage from "./pages/UsersPage";
import { fetchUserThunk } from "./redux/auth/asyncActions";
import RequireAuth from "./routes/RequireAuth";
import RequireUnAuth from "./routes/RequireUnAuth";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  let id;
  if (location.pathname.includes("/user/")) {
    id = location.pathname.split("/")[2];
  }

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route index element={<HomePage />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
