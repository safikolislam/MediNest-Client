import {
    createBrowserRouter,
} from "react-router"
import RootLayOuts from "../layOuts/RootLayOuts"
import Home from "../pages/Home/Home"
import Shop from "../pages/Shop/Shop"
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile"


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
                
            }
        ]
    }
])