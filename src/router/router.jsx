import {
    createBrowserRouter,
} from "react-router"
import RootLayOuts from "../layOuts/RootLayOuts"
import Home from "../pages/Home/Home"
import Shop from "../pages/Shop/Shop"
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile"
import SignUp from "../pages/SignUp/SignUp"
import Login from "../pages/Login/Login"
import DashboardLayout from "../layOuts/DashboardLayOut"
import SellerHome from "../pages/Seller/SellerHome/SellerHome"
import ManageMedicine from "../pages/Seller/ManageMedicine/ManageMedicine"
import PaymentHistory from "../pages/Seller/PaymentHistory/PaymentHistory"
import Advertisement from "../pages/Seller/Advertisement/Advertisement"
import ManageUsers from "../pages/Admin/MangeUsers/ManageUsers"
import ManageCategories from "../pages/Admin/ManageCategories/ManageCategories"
import Payment from "../pages/Admin/payment/Payment"
import Reports from "../pages/Admin/report/Reports"
import BannerAds from "../pages/Admin/bannerAds/BannerAds"
import Store from "../pages/store/Store"




export const router = createBrowserRouter([
    {
        path:"/",
        Component:RootLayOuts,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"/Shop",
                Component:Shop,
            
            },
            {
                path:"/UpdateProfile",
                Component:UpdateProfile
            },
            {
                path:"/SignUp",
                Component:SignUp
            },
            {
                path:"/Login",
                Component:Login
            },
            {
                path:'/store',
                Component:Store
            }
        ]
    },
    {
        path:'/dashboard',
        Component:DashboardLayout,
        children:[
            {
                index:true,
                Component:SellerHome
            },
            {
                path:"ManageMedicine",
                Component:ManageMedicine,
                
            },
            {
                path:"PaymentHistory",
                Component:PaymentHistory
            },
            {
                path:"Advertisement",
                Component:Advertisement
            },
            {
                path:"ManageUsers",
                Component:ManageUsers
            },
            {
                path:"ManageCategories",
                Component:ManageCategories
            },
            {
                path:"payment",
                Component:Payment
            },
            {
                path:"report",
                Component:Reports
            },
            {
                path:"bannerAds",
                Component:BannerAds
            },
            {
                path:"Payment",
                
            }
        
        ]

    }
])