// routes/routeConfig.js
import { createBrowserRouter, Navigate } from "react-router";
import PrivateRoute from "./PrivateRoute.jsx";

// Layouts
import AuthLayout from "../components/Layout/AuthLayout";
import MainLayouts from "../components/Layout/MainLayouts";

// Pages
import PrivacyPolicy from "../components/Footer/PrivacyPolicy.jsx";
import About from "../Pages/About.jsx";
import BeARider from "../Pages/BeARider/BeARider.jsx";
import Coverage from "../Pages/Coverage/Coverage.jsx";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import MyProfile from "../Pages/MyProfile/MyProfile.jsx";
import Pricing from "../Pages/Pricing/Pricing.jsx";
import Services from "../Pages/Services/Services.jsx";

import Login from "../Pages/Auth/Login/Login.jsx";
import Register from "../Pages/Auth/Register/Register.jsx";
import ForgotPassword from "../Pages/Auth/ForgotPassword.jsx";
import ResetPassword from "../Pages/Auth/ResetPassword.jsx";
import SendParcel from "../Pages/SendParcel/SendParcel.jsx";
import DashBoardLayout from "../components/Layout/DashBoardLayout.jsx";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels.jsx";
import Payment from "../Pages/Dashboard/Payment/Payment.jsx";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess.jsx";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel.jsx";
import PaymentsHistory from "../Pages/Dashboard/PaymentsHistory/PaymentsHistory.jsx";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders.jsx";
import TermsConditions from "../components/Footer/TermsConditions.jsx";
import CookiesPolicy from "../components/Footer/CookiesPolicy.jsx";
import FAQ from "../Pages/Home/Sections/FAQ.jsx";
import WhyChooseUs from "../Pages/Home/Sections/WhyChooseUs.jsx";

// Route definitions // Public routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/privacy", element: <PrivacyPolicy /> },
      { path: "/terms", element: <TermsConditions /> },
      { path: "/cookies", element: <CookiesPolicy /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/services", element: <Services /> },
      { path: "/faqs", element: <FAQ /> },
      { path: "/why-choose-us", element: <WhyChooseUs /> },
      {
        path: "/coverage",
        element: <Coverage />,
        loader: () =>
          fetch("/serviceCenters.json").then((res) => res.json()),
      },

      // Protected routes
      {
        path: "be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
         loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      
      },

      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },

      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Auth routes group
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },

  // Dashboard routes
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashBoardLayout></DashBoardLayout>{" "}
      </PrivateRoute>
    ),
    children: [
      { path: "my-parcels", element: <MyParcels /> },
      // { path: "payment/:id", element: <Payment /> },
      { path: "payment/:parcelId", element: <Payment /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancel", element: <PaymentCancel /> },
      { path: "payments-history", element: <PaymentsHistory /> },
      { path: "approve-riders", element: <ApproveRiders /> },
    ],
  },

  // Fallback route
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
