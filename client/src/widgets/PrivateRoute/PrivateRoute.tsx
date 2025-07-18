import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts";

const PrivateRoute = () => {
  const { accessToken } = useAuth();
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export { PrivateRoute };
