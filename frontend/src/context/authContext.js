import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
const { useNavigate } = require('react-router-dom');

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      console.log("User's role:", decodedToken.role);

      setUser({ id: decodedToken.sub, role: decodedToken.role });

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token has expired");
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        console.log("Token is still valid");
        fetchUserData();
      }
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/protected", {
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
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
