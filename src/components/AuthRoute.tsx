import { Navigate } from "react-router-dom";

export const AuthRoute = () => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
