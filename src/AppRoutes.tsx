import { createBrowserRouter } from "react-router";
import AdminDashboard from "./admin/pages/dashboard/AdminDashboard";
import App from "./App";
import AdminListingReview from "./admin/pages/listing-review/AdminListingReview";
import AdminAgentReview from "./admin/pages/agent-review/AdminAgentReview";
import AgentApp from "./agent/AgentApp";

const AppRoutes = createBrowserRouter([
    // ------- Root page where the auth gate should be placed -------
    {
        path: "/",
        element:<App/>
    },


    

    // start of RBAC architecture kaya much better if organized ang kada file structuring niyo 
    {
        // root path for each specific role
        path: "/admin",
        // The specific opening page you want to render   
        Component: AdminDashboard,
        // the other pages under the root role you want to connect  
    },
    {
        path: "/admin/listing-reviews",
        Component: AdminListingReview
    },
    {
        path: "/admin/agent-reviews",
        Component: AdminAgentReview
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
        path: "/agent/*",
        Component: AgentApp
    }

]);

export default AppRoutes;
