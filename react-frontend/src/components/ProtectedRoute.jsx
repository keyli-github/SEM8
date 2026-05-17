import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false, requireModerator = false }) => {
  const { user, isAdmin, isModerator, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  if (requireModerator && !isModerator()) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;