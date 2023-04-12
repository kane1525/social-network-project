import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();
  console.log("RequireAuth");

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
