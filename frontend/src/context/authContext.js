import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch("/auth/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Protected data:", data);
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({ id: decodedToken.sub, role: decodedToken.role });
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token has expired");
        logout();
      } else {
        console.log("Token is still valid");
        fetchUserData();
      }
    }
  }, [token, fetchUserData]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
