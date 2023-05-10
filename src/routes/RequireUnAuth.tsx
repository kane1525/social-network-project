import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

interface RequireUnAuthProps {
  children: ReactNode;
}

const RequireUnAuth = ({ children }: RequireUnAuthProps) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  const from: string | undefined = location?.state?.from?.pathname;

  if (isAuth) {
    return <Navigate to={from || "/users"} replace />;
  }

  return <>{children}</>;
};

export default RequireUnAuth;
