import { createBrowserRouter } from "react-router-dom";
import Root from "../../Root";
import Error_page from "../../Pages/Error_page/Error_page";
import Home from "../../Pages/Home/Home";
import Login_page from "../../Pages/Login_page/Login_page";
import Register from "../../Pages/Register/Register";
import My_profile from "../../Pages/My_profile/My_profile";
import Update_profile from "../../Pages/Update_profile/Update_profile";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Private_route from "../Private_route/Private_route";
import Shop from "../../Pages/Shop/Shop";
import View_details from "../../Pages/View_details/View_details";
import Cart from "../../Pages/Cart/Cart";
import Checkout_page from "../../Pages/Checkout_page/Checkout_page";
import Invoice from "../../Pages/Invoice/Invoice";
import Initial_route from "../Initial_route/Initial_route";
import Manage_users from "../Manage_users/Manage_users";
import Manage_products from "../Manage_products/Manage_products";
import Order_management from "../Order_management/Order_management";
import Dashboard_overview from "../Dashboard_overview/Dashboard_overview";
import Sales_analytics from "../Sales_analytics/Sales_analytics";
import Admin_route from "../Admin_route/Admin_route";
import Vendor_route from "../Vendor_route/Vandor_route";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error_page />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/my-profile',
                element: <Private_route>
                    <My_profile />
                </Private_route>
            },
            {
                path: '/shop',
                element: <Shop />
            },
            {
                path: '/product-details/:id',
                element: <View_details />
            },
            {
                path: '/cart',
                element: <Private_route>
                    <Cart />
                </Private_route>
            },
            {
                path: '/checkout/:id',
                element: <Private_route>
                    <Checkout_page />
                </Private_route>
            }
        ]
    },
    {
        path: '/login',
        element: <Login_page />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/update-profile',
        element: <Private_route>
            <Update_profile />
        </Private_route>
    },
    {
        path: '/dashboard',
        element: <Private_route>
            <Dashboard />
        </Private_route>,
        children: [
            {
                index: true,
                element: <Initial_route />
            },
            {
                path: '/dashboard/manage-users',
                element: <Private_route>
                    <Admin_route>
                        <Manage_users />
                    </Admin_route>
                </Private_route>
            },
            {
                path: '/dashboard/manage-products',
                element: <Private_route>
                    <Admin_route>
                        <Manage_products />
                    </Admin_route>
                </Private_route>
            },
            {
                path: '/dashboard/order-management',
                element: <Private_route>
                    <Admin_route>
                        <Order_management />
                    </Admin_route>
                </Private_route>
            },
            {
                path: '/dashboard/dashboard-overview',
                element: <Private_route>
                    <Admin_route>
                        <Dashboard_overview />
                    </Admin_route>
                </Private_route>
            },
            {
                path: '/dashboard/sales-analytics',
                element: <Private_route>
                    <Vendor_route>
                        <Sales_analytics />
                    </Vendor_route>
                </Private_route>
            }
        ]
    },
    {
        path: '/invoice/:id',
        element: <Private_route>
            <Invoice />
        </Private_route>
    }
])

export default routes;