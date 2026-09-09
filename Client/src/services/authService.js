import api from "../API/api";

// Signup
export const signupUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
  const response = await api.post("/auth/verify-otp", {
    email,
    otp,
  });
  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
