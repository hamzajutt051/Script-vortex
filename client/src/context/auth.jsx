import React, { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState({});

  const Login = useCallback(async (user, token) => {
    setUser(user);
    setToken(token);
    setIsLoggedIn(true);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    getProfile(user);
  }, []);

  const Logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    setIsLoggedIn(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user) {
      Login(JSON.parse(user), token);
    }
  }, []);

  const getProfile = async () => {
    await axios
      .get(`auth/get-basic-profile`)
      .then((res) => {
        const user = res?.data;
        setProfile(user);
      })
      .catch((err) => {});
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        profile,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
