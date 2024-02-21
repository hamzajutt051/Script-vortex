import React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../hook/useAuth";

export default function AuthRoute({ component }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return component;
  }

  return <Navigate to="/" />;
}
