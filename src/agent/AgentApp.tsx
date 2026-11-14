import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { AgentDataProvider } from './libs/AgentDataContext.js';
import AgentHeader from './shared/AgentHeader.js';
import AgentNavigation, { type AgentScreen } from './shared/AgentNavigation.js';
import './shared/sharedStyles.css';
import StaffLogin from '../shared/maps/StaffLogin.js';
import { getStaffRole, getStaffToken } from '../shared/maps/listingsApi.js';

const paths: Record<AgentScreen, string> = {
  dashboard: '/agent/dashboard',
  listings: '/agent/my-listings',
  map: '/agent/map',
  addListing: '/agent/add-listings',
  viewings: '/agent/viewings',
};

function screenFromPath(path: string): AgentScreen | null {
  if (path.endsWith('/dashboard') || path === '/agent') return 'dashboard';
  if (path.endsWith('/my-listings')) return 'listings';
  if (path.endsWith('/map')) return 'map';
  if (path.endsWith('/add-listings')) return 'addListing';
  if (path.endsWith('/viewings')) return 'viewings';
  return null;
}

function AgentIndexRedirect() {
  return <Navigate to="dashboard" replace />;
}

export { AgentIndexRedirect };

export default function AgentApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const screen = screenFromPath(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  if (!getStaffToken() || getStaffRole() !== 'agent') return <StaffLogin role="agent" />;
  if (location.pathname === '/agent/map') return <AgentDataProvider><Outlet /></AgentDataProvider>;
  return (
    <AgentDataProvider>
      <div className="agent-app">
        <AgentHeader />
        <AgentNavigation screen={screen} onNavigate={(next) => navigate(paths[next])} />
        <Outlet />
      </div>
    </AgentDataProvider>
  );
}
