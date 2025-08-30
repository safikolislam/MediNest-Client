import {
    createBrowserRouter,
} from "react-router";
import RootLayOuts from "../layOuts/RootLayOuts";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layOuts/DashboardLayOut";
import SellerHome from "../pages/Seller/SellerHome/SellerHome";
import ManageMedicine from "../pages/Seller/ManageMedicine/ManageMedicine";
import PaymentHistory from "../pages/Seller/PaymentHistory/PaymentHistory";
import Advertisement from "../pages/Seller/Advertisement/Advertisement";
import ManageUsers from "../pages/Admin/MangeUsers/ManageUsers";
import ManageCategories from "../pages/Admin/ManageCategories/ManageCategories";
import Payment from "../pages/Admin/payment/Payment";
import Reports from "../pages/Admin/report/Reports";
import BannerAds from "../pages/Admin/bannerAds/BannerAds";
import Store from "../pages/store/Store";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOuts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Shop",
        element: <Shop></Shop>,
      },
      {
        path: "UpdateProfile",
        element: <UpdateProfile />,
      },
      {
        path: "SignUp",
        element: <SignUp />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "store",
        element: <Store />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <SellerHome />
          </PrivateRoute>
        ),
      },
      {
        path: "ManageMedicine",
        element: (
          <PrivateRoute>
            <ManageMedicine />
          </PrivateRoute>
        ),
      },
      {
        path: "PaymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "Advertisement",
        element: (
          <PrivateRoute>
            <Advertisement />
          </PrivateRoute>
        ),
      },
      {
        path: "ManageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "ManageCategories",
        element: (
          <PrivateRoute>
            <ManageCategories />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "report",
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },
      {
        path: "bannerAds",
        element: (
          <PrivateRoute>
            <BannerAds />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
