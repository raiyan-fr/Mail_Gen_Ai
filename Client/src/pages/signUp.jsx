import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { signupUser } from "../services/authService";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const data = await signupUser({ username, email, password });

      navigate("/verify-otp", { state: { email } });
      toast.success(data.message || "OTP sent to your email");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || error.message || "SignUp Failed",
      );
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

          <h1 className="mt-6 text-3xl font-bold">Create your account</h1>

          <p className="mt-2 text-slate-400">
            Start generating better cold emails with AI.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Full Name
              </label>

              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/10 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-500 focus:border-red-500"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
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
              {loading ? "Creating account..." : "Create Account"}

              {!loading && <ArrowRightIcon className="h-5 w-5" />}
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-red-400 hover:text-red-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
