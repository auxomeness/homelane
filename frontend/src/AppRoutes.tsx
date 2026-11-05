import { createBrowserRouter } from "react-router";
import AdminDashboard from "./admin/pages/dashboard/AdminDashboard";
import App from "./App";

const AppRoutes = createBrowserRouter([
    // ------- Root page where the auth gate should be placed -------
    {
        path: "/",
        element:<App/>
    },

    // start of RBAC architecture kaya much better if organized ang kada file structuring niyo 
    // the syntax:
    {
        // root path for each specific role
        path: "/admin",
        // The specific opening page you want to render   
        Component: AdminDashboard,

        // the other pages under the root role you want to connect  
        children: [
            {
                path: "/admin/listing-reviews",
                element: <div>listing reviews page here</div>
            },
            {
                path: "/admin/agent-reviews",
                element: <div>agent reviews page here</div>
            }
        ],
    },

    {
        path: "/visitor",
        element: <h3>Place main visitor page component route in ./AppRoutes.tsx</h3>
    },

    {
        path: "/buyer",
        element: <h3>Place main buyer page component route in ./AppRoutes.tsx </h3>
    },

    {
        path: "/agent",
        element: <h3>Place main agent page component route in ./AppRoutes.tsx</h3>
    }

]);

export default AppRoutes;