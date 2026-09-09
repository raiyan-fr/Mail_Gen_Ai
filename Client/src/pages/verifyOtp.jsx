import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { verifyOtp } from "../services/authService";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Cannot access this page before signup");
      navigate("/sign-up");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please sign up again.");
      navigate("/sign-up");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyOtp(email, otp);

      toast.success(data.message || "Email verified successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // Don't render the page if there is no email.
  if (!email) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
            <ShieldCheckIcon className="h-8 w-8 text-red-400" />
          </div>

          <h1 className="mt-6 text-3xl font-bold">Verify your email</h1>

          <p className="mt-2 text-slate-400">Enter the OTP sent to</p>

          <span className="mt-1 font-medium text-white">{email}</span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Verification Code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-4 text-center text-2xl font-semibold tracking-[0.5em] text-white outline-none placeholder:text-slate-600 focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="font-medium text-red-400 hover:text-red-300"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
