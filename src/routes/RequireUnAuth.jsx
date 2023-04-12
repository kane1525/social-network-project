import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireUnAuth = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  const from = location?.state?.from?.pathname;

  if (isAuth) {
    return <Navigate to={from || "/users"} replace />;
  }

  return children;
};

export default RequireUnAuth;
