import { createBrowserRouter } from "react-router";
import AdminDashboard from "./admin/pages/dashboard/AdminDashboard";
import App from "./App";
import AdminListingReview from "./admin/pages/listing-review/AdminListingReview";
import AdminAgentReview from "./admin/pages/agent-review/AdminAgentReview";
import AgentApp, { AgentIndexRedirect } from "./agent/AgentApp";
import AgentDashboard from "./agent/pages/dashboard/AgentDashboard";
import AgentListings from "./agent/pages/listings/AgentListings";
import AgentAddListing from "./agent/pages/add-listing/AgentAddListing";
import AgentListingDetails from "./agent/pages/listing-details/AgentListingDetails";
import AgentWorkspacePage from "./agent/pages/workspace/AgentWorkspacePage";

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
        path: "/agent",
        Component: AgentApp,
        children: [
            { index: true, Component: AgentIndexRedirect },
            { path: "dashboard", Component: AgentDashboard },
            { path: "my-listings/:listingId", Component: AgentListingDetails },
            { path: "my-listings", Component: AgentListings },
            { path: "add-listings", Component: AgentAddListing },
            { path: "viewings", Component: AgentWorkspacePage },
            { path: "activity", Component: AgentWorkspacePage },
            { path: "inquiries", Component: AgentWorkspacePage },
            { path: "messages", Component: AgentWorkspacePage },
            { path: "profile", Component: AgentWorkspacePage }
        ]
    }

]);

export default AppRoutes;
