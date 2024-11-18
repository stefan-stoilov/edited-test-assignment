import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";

export function ProtectRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
