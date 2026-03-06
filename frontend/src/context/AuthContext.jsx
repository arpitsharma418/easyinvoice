import React, { createContext, useState, useContext} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {

        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          pauseOnHover: true,
        });

        navigate("/");
      })
      .catch((err) => {

        toast.error(err.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          pauseOnHover: true,
        });
      });

    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
