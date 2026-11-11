import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import AgentHeader from './shared/AgentHeader.js';
import AgentNavigation, { type AgentScreen } from './shared/AgentNavigation.js';
import './shared/sharedStyles.css';

const paths: Record<AgentScreen, string> = {
  dashboard: '/agent/dashboard',
  listings: '/agent/my-listings',
  addListing: '/agent/add-listings',
};

function screenFromPath(path: string): AgentScreen {
  if (path.endsWith('/my-listings')) return 'listings';
  if (path.endsWith('/add-listings')) return 'addListing';
  return 'dashboard';
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

  return (
    <div className="agent-app">
      <AgentHeader />
      <AgentNavigation screen={screen} onNavigate={(next) => navigate(paths[next])} />
      <Outlet />
    </div>
  );
}
