import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import DiscoveryHeader from './shared/DiscoveryHeader.js';
import DiscoveryNavigation, { type DiscoveryScreen } from './shared/DiscoveryNavigation.js';
import StateMessage from './shared/StateMessage.js';
import useDiscoveryNavigate from './shared/useDiscoveryNavigate.js';
import './discovery.css';

function screenFromPath(path: string): DiscoveryScreen {
  const match = ['home', 'map', 'viewings', 'properties', 'messages', 'notifications'].find((screen) => path.endsWith(`/${screen}`));
  return (match as DiscoveryScreen | undefined) ?? 'map';
}

// Opens /discovery with the Map page.
export function DiscoveryIndexRedirect() {
  return <Navigate to="map" replace />;
}

// Home and Properties are built by other teammates. These stay clickable until their pages are connected.
export function DiscoveryPlaceholder({ title }: { title: string }) {
  return (
    <main className="discovery-page">
      <StateMessage title={title} text="This page is built by another teammate and will be connected through the shared router." />
    </main>
  );
}

// Layout for every /discovery page: header on top, the routed page in the middle, navigation at the bottom.
export default function DiscoveryApp() {
  const location = useLocation();
  const navigate = useDiscoveryNavigate();
  const screen = screenFromPath(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="discovery-app">
      {screen !== 'map' && <DiscoveryHeader onNavigate={navigate} />}
      <Outlet />
      {screen !== 'map' && <DiscoveryNavigation screen={screen} onNavigate={navigate} />}
    </div>
  );
}
