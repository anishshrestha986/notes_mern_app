import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {
  children: ReactElement | null;
}

export default function RequireAuth({ children }: Props): JSX.Element | null {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return children;
}
