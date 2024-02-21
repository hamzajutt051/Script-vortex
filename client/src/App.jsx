import { Toaster } from "react-hot-toast";

import React from "react";

import AppRoutes from "./routes";

import "react-advanced-cropper/dist/style.css";
import "./config/axios";

import LoadingProvider from "./context/loading";
import AuthProvider from "./context/auth";
import CartProvider from "./context/cart";

export default function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}
