import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Loading from "../components/Loading";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const { isAuthenticated, user, isCheckingAuth } = useUserStore();

  if (isCheckingAuth) return <Loading />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user && !user.admin) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default AdminRoute;
