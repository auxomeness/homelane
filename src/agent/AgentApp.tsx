import { useEffect, useState } from 'react';
import AgentDashboard from './pages/dashboard/AgentDashboard.js';
import AgentAddListing from './pages/add-listing/AgentAddListing.js';
import AgentListings from './pages/listings/AgentListings.js';
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

export default function AgentApp() {
  const [screen, setScreen] = useState(() => screenFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setScreen(screenFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (next: AgentScreen) => {
    if (next !== screen) window.history.pushState({}, '', paths[next]);
    setScreen(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="agent-app">
      {screen === 'dashboard' && <AgentDashboard onNavigate={navigate} />}
      {screen === 'listings' && <AgentListings onNavigate={navigate} />}
      {screen === 'addListing' && <AgentAddListing onNavigate={navigate} />}
      <AgentNavigation screen={screen} onNavigate={navigate} />
    </div>
  );
}
