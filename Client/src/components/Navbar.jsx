import { Link, useLocation, useNavigate } from "react-router";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/authContext";

const Navbar = ({ collapsed = false }) => {
  const { user, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname.startsWith("/dashboard");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed right-0 top-0 z-40 h-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-lg transition-all duration-300 ${
        isDashboard ? (collapsed ? "left-20" : "left-64") : "left-0"
      }`}
    >
      <div className="flex h-full items-center justify-between px-6">
        {isDashboard ? (
          <>
            {/* Dashboard Welcome */}
            <div>
              <p className="text-sm text-slate-400">Welcome back,</p>

              <h2 className="text-lg font-semibold text-white">
                {user?.username || "User"}
              </h2>
            </div>

            {/* Dashboard Logout */}
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold bg-red-600 text-slate-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Homepage Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
                <EnvelopeIcon className="h-5 w-5 text-white" />
              </div>

              <span className="text-xl font-bold text-white">
                Mail<span className="text-red-400">Gen</span> AI
              </span>
            </Link>

            {/* Homepage Auth Buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <Link
                  to="/dashboard"
                  className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:block"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:block"
                  >
                    Login
                  </Link>

                  <Link
                    to="/sign-up"
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
