import { lazy, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Layout from "./layout";

const HomePage = lazy(() => import("../pages/home/home"));

function AppRoutes() {
  const [showPolicies, setShowPolicies] = useState(false);

  const togglePolicies = () => {
    setShowPolicies(!showPolicies);
  };
  return (
    <>
      <div className="main">
        <BrowserRouter>
          <Routes>
            {/* Auth Screens */}

            <Route path="/" element={<Layout />}>
              <Route
                path="/"
                element={
                  <HomePage
                    showPolicies={showPolicies}
                    togglePolicies={togglePolicies}
                    setShowPolicies={setShowPolicies}
                  />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default AppRoutes;
