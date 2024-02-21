import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

export default function Layout({ showPolicies, togglePolicies }) {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer showPolicies={showPolicies} togglePolicies={togglePolicies} />
    </div>
  );
}
