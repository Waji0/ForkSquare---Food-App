import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Loading from "../components/Loading";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: Props) => {
  const { isAuthenticated, user, isCheckingAuth } = useUserStore();

  // Wait until auth check completes
  if (isCheckingAuth) return <Loading />;

  // Not logged in → redirect to login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Logged in but email not verified → redirect to verify page
  if (user && !user.isVerified) return <Navigate to="/verify-email" replace />;

  // Logged in & verified → show content
  return <>{children}</>;
};

export default ProtectedRoutes;
