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
import PropertyMapPage from "./shared/maps/PropertyMapPage";
import StaffGate from "./shared/maps/StaffGate";
import StaffMapPage from "./shared/maps/StaffMapPage";

const AppRoutes = createBrowserRouter([
    // ------- Root page where the auth gate should be placed -------
    {
        path: "/",
        element:<App/>
    },


    

    // start of RBAC architecture kaya much better if organized ang kada file structuring niyo 
    { path: "/admin", element: <StaffGate role="admin" />, children: [
      { index: true, Component: AdminDashboard },
      { path: "listing-reviews", Component: AdminListingReview },
      { path: "map", Component: () => <StaffMapPage role="admin" /> },
      { path: "agent-reviews", Component: AdminAgentReview },
    ] },




    {
        path: "/visitor",
        Component: () => <PropertyMapPage role="visitor" mode="list" />
    },
    { path: "/visitor/map", Component: () => <PropertyMapPage role="visitor" mode="map" /> },

    {
        path: "/buyer",
        Component: () => <PropertyMapPage role="buyer" mode="list" />
    },
    { path: "/buyer/map", Component: () => <PropertyMapPage role="buyer" mode="map" /> },

    {
        path: "/agent",
        Component: AgentApp,
        children: [
            { index: true, Component: AgentIndexRedirect },
            { path: "dashboard", Component: AgentDashboard },
            { path: "my-listings/:listingId", Component: AgentListingDetails },
            { path: "my-listings", Component: AgentListings },
            { path: "map", Component: () => <StaffMapPage role="agent" /> },
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
