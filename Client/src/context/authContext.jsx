import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (error) {
        localStorage.removeItem("userInfo");
        // localStorage.removeItem("token");

        console.error("Error parsing userInfo from localStorage:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
    localStorage.setItem("token", userData.token); // Store the token in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
