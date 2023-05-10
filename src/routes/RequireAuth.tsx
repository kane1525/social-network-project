import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
