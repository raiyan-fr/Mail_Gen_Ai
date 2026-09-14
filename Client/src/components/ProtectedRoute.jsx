import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/authContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication state is restored
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-red-500" />
          <p className="text-sm text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // User is authenticated
  return <Outlet />;
};

export default ProtectedRoute;
