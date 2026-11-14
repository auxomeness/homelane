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
import DiscoveryApp, { DiscoveryIndexRedirect, DiscoveryPlaceholder } from "./discovery/DiscoveryApp";
import Messages from "./discovery/pages/Messages";
import Notifications from "./discovery/pages/Notifications";
import Viewings from "./discovery/pages/Viewings";
import PropertyMapPage from "./shared/maps/PropertyMapPage";
import StaffGate from "./shared/maps/StaffGate";
import StaffMapPage from "./shared/maps/StaffMapPage";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    Component: () => <StaffGate role="admin" />,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "listing-reviews", Component: AdminListingReview },
      { path: "map", Component: () => <StaffMapPage role="admin" /> },
      { path: "agent-reviews", Component: AdminAgentReview },
    ],
  },
  {
    path: "/visitor",
    Component: () => <PropertyMapPage role="visitor" mode="list" />,
  },
  {
    path: "/visitor/map",
    Component: () => <PropertyMapPage role="visitor" mode="map" />,
  },
  {
    path: "/buyer",
    Component: () => <PropertyMapPage role="buyer" mode="list" />,
  },
  {
    path: "/buyer/map",
    Component: () => <PropertyMapPage role="buyer" mode="map" />,
  },
  {
    path: "/discovery",
    Component: DiscoveryApp,
    children: [
      { index: true, Component: DiscoveryIndexRedirect },
      { path: "map", Component: () => <PropertyMapPage role="buyer" mode="map" basePath="/discovery" listPath="/discovery/properties" embedded /> },
      { path: "messages", Component: Messages },
      { path: "notifications", Component: Notifications },
      { path: "viewings", Component: Viewings },
      { path: "home", element: <DiscoveryPlaceholder title="Home" /> },
      { path: "properties", Component: () => <PropertyMapPage role="buyer" mode="list" basePath="/discovery" listPath="/discovery/properties" embedded /> },
      { path: "*", Component: DiscoveryIndexRedirect },
    ],
  },
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
      { path: "profile", Component: AgentWorkspacePage },
    ],
  },
]);

export default AppRoutes;
