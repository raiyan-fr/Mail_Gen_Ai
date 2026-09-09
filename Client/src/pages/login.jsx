import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const data = await loginUser({ email, password });
      login(data);
      toast.success("Login Successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-xl font-bold">
              Mail<span className="text-red-400">Gen</span> AI
            </span>
          </Link>

          <h1 className="mt-6 text-3xl font-bold">Login your account</h1>

          <p className="mt-2 text-slate-400">
            Start generating better cold emails with AI.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email Address
              </label>

              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-white/10 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Login..." : "Login Account"}

              {!loading && <ArrowRightIcon className="h-5 w-5" />}
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-red-400 hover:text-red-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
