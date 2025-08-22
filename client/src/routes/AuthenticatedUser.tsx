import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Loading from "../components/Loading";

interface Props {
  children: React.ReactNode;
}

const AuthenticatedUser = ({ children }: Props) => {
  const { isAuthenticated, user, isCheckingAuth } = useUserStore();

  // Wait until auth check completes
  if (isCheckingAuth) return <Loading />;

  // Already logged in & verified → redirect to home
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;

  // Logged in but not verified → redirect to verify page
  if (isAuthenticated && user && !user.isVerified)
    return <Navigate to="/verify-email" replace />;

  // Not logged in → show auth pages
  return <>{children}</>;
};

export default AuthenticatedUser;
