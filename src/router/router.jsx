import {
    createBrowserRouter,
} from "react-router";
import RootLayOuts from "../layOuts/RootLayOuts";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";

import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layOuts/DashboardLayOut";

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
import CheckOut from "../pages/checkOut/CheckOut";
import Invoice from "../pages/invoice/Invoice";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdminRoute";


import UserPaymentHistory from "../pages/User/UserPaymentHistory/UserPaymentHistory";

import Statistics from "../shared/Statistics";
import ContactUs from "../pages/Contact Us/ContactUs";





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
        path:"Contact Us",
        element:<ContactUs></ContactUs>
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
      {
        path:"checkOut",
        element:<CheckOut></CheckOut>
      },
      {
        path:"invoice",
        element:<Invoice></Invoice>
      }
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
         
         <Statistics></Statistics>
          
            
          </PrivateRoute>
        ),
      },
      {
        path: "ManageMedicine",
        element: (
          <PrivateRoute>
            <SellerRoute><ManageMedicine /></SellerRoute>
            
          </PrivateRoute>
        ),
      },
      {
        path: "PaymentHistory",
        element: (
          <PrivateRoute>
            <SellerRoute>
         <PaymentHistory />
            </SellerRoute>
         
          </PrivateRoute>
        ),
      },
      {
        path: "Advertisement",
        element: (
          <PrivateRoute>
            <SellerRoute>
         <Advertisement />
            </SellerRoute>
           
          </PrivateRoute>
        ),
      },

      {
        path: "ManageUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
             <ManageUsers />
            </AdminRoute>
          
          </PrivateRoute>
        ),
      },
      {
        path: "ManageCategories",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCategories />
            </AdminRoute>
          
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <AdminRoute>
                <Payment />
            </AdminRoute>
           
          </PrivateRoute>
        ),
      },
      {
        path: "report",
        element: (
          <PrivateRoute>
            <AdminRoute>
                <Reports />
            </AdminRoute>
          
          </PrivateRoute>
        ),
      },
  
      {
        path: "bannerAds",
        element: (
          <PrivateRoute>
            <AdminRoute>
          <BannerAds />
            </AdminRoute>
           
          </PrivateRoute>
        ),
      },
  
      {
        path:"UserPaymentHistory",
        element:(<PrivateRoute>
         <UserPaymentHistory></UserPaymentHistory>
        </PrivateRoute>
        )
      }
    ],
  },
]);
