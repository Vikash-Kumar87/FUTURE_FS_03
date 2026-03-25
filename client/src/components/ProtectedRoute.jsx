import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();

  if (loading) {
    return <div className="section-wrap py-16">Checking access...</div>;
  }

  if (!user || (adminEmail && user.email?.toLowerCase() !== adminEmail)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
