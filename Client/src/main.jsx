// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authContext.jsx";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  </AuthProvider>,
  // </StrictMode>
);
