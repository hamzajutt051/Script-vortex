import { Suspense, lazy, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import AuthRoute from "./authRoute";
import ProtectedRoute from "./protectedRoute";

import Layout from "./layout";
import LoadingSpinner from "../components/spinner";
import Cart from "../pages/cart";
import ReviewsPage from "../pages/reviews";
import Contactus from "../pages/contactus";
import Shipping from "../pages/shipping";

const Orders = lazy(() => import("../pages/order"));
const OrderDetails = lazy(() => import("../pages/order/details"));
const AboutPage = lazy(() => import("../pages/about"));
const HomePage = lazy(() => import("../pages/home/home"));
const NImagesPage = lazy(() => import("../pages/9Images"));
const TImagesPage = lazy(() => import("../pages/12Images"));
const CustomizePage = lazy(() => import("../pages/product/customize"));
const Checkout = lazy(() => import("../pages/checkout"));
const EditAccount = lazy(() => import("../pages/account"));
const LoginP = lazy(() => import("../pages/auth/login"));
const RegisterP = lazy(() => import("../pages/auth/register"));
const ForgetPassword = lazy(() => import("../pages/auth/forgetPassword"));
const ResetPassword = lazy(() => import("../pages/auth/resetPassword"));

function AppRoutes() {
  const [showPolicies, setShowPolicies] = useState(false);

  const togglePolicies = () => {
    setShowPolicies(!showPolicies);
  };
  return (
    <Suspense fallback={<LoadingSpinner asOverlay />}>
      <>
        <div className="main">
          <BrowserRouter>
            <Routes>
              {/* Auth Screens */}

              <Route path="/" element={<Layout />}>
                <Route
                  path="/login"
                  element={<AuthRoute component={<LoginP />} />}
                />
                <Route
                  path="/register"
                  element={<AuthRoute component={<RegisterP />} />}
                />
                <Route
                  path="/forget-password"
                  element={<AuthRoute component={<ForgetPassword />} />}
                />
                <Route
                  path="/reset-password/:token"
                  element={<AuthRoute component={<ResetPassword />} />}
                />
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
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contactus" element={<Contactus />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route
                  path="/account"
                  element={<ProtectedRoute component={<EditAccount />} />}
                />
                <Route
                  path="/account/orders"
                  element={<ProtectedRoute component={<Orders />} />}
                />
                <Route
                  path="/order/:id"
                  element={<ProtectedRoute component={<OrderDetails />} />}
                />
                <Route
                  path="/products/square-photo-magnets"
                  element={<CustomizePage />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route
                  path="*"
                  element={
                    <div>
                      <h2>404 Page not found</h2>
                    </div>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </>
    </Suspense>
  );
}

export default AppRoutes;
