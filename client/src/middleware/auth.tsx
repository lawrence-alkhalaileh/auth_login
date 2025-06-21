import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

interface AuthorizeUserProps {
  children: ReactNode;
}

export const AuthorizeUser = ({ children }: AuthorizeUserProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const ProtectedRoute = ({ children }: AuthorizeUserProps) => {
  const username = useAuthStore.getState().auth.username;

  if (!username) {
    return <Navigate to="/" replace />;
  }
  return children;
};
