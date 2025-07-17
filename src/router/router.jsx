import {
    createBrowserRouter,
} from "react-router"
import RootLayOuts from "../layOuts/RootLayOuts"
import Home from "../pages/Home/Home"
import Shop from "../pages/Shop/Shop"
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile"
import SignUp from "../pages/SignUp/SignUp"
import Login from "../pages/Login/Login"


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
                Component:Shop
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
            }
        ]
    }
])