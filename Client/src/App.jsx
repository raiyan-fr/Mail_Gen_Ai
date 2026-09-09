import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "./context/authContext.jsx";
import Homepage from "./pages/homePage.jsx";
import SignUp from "./pages/signUp.jsx";
import VerifyOtp from "./pages/verifyOtp.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";

function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/sign-up"
        element={!user ? <SignUp /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/verify-otp"
        element={!user ? <VerifyOtp /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
