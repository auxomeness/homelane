import { createBrowserRouter } from "react-router";
import AgentDashboard from "./agent/pages/AgentDashboard";
import type { AgentScreen } from "./agent/shared/AgentNavigation";
import AdminDashboard from "./admin/pages/AdminDashboard";

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <AgentDashboard onNavigate={function (screen: AgentScreen): void {
            throw new Error("Function not implemented.");
        } }/>
    },
    {
        path: "/about",
        element: <AdminDashboard/>
    },
]);

export default AppRoutes;