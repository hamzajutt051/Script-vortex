import { useContext } from "react";
import { AuthContext } from "../context/auth";

const useAuth = () => {
  const { isLoggedIn, user, Login, Logout } = useContext(AuthContext);

  return { isLoggedIn, user, Login, Logout };
};

export default useAuth;
