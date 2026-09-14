import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "./context/authContext.jsx";
import Homepage from "./pages/homePage.jsx";
import SignUp from "./pages/signUp.jsx";
import VerifyOtp from "./pages/verifyOtp.jsx";
import Login from "./pages/login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/dashboard.jsx";
import EmailHistory from "./pages/emailHistory.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  const { user } = useAuth();

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
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="history" element={<EmailHistory />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
