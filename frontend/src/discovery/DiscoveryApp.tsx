import { useEffect, useState } from 'react';
import MapDiscovery from './pages/MapDiscovery.js';
import Messages from './pages/Messages.js';
import Notifications from './pages/Notifications.js';
import Viewings from './pages/Viewings.js';
import DiscoveryHeader from './shared/DiscoveryHeader.js';
import DiscoveryNavigation, { type DiscoveryScreen } from './shared/DiscoveryNavigation.js';
import StateMessage from './shared/StateMessage.js';
import './discovery.css';

const paths: Record<DiscoveryScreen, string> = {
  home: '/discovery/home',
  map: '/discovery/map',
  viewings: '/discovery/viewings',
  properties: '/discovery/properties',
  messages: '/discovery/messages',
  notifications: '/discovery/notifications',
};

function screenFromPath(path: string): DiscoveryScreen {
  const match = (Object.keys(paths) as DiscoveryScreen[]).find((screen) => path.endsWith(`/${screen}`));
  return match ?? 'map';
}

export default function DiscoveryApp() {
  const [screen, setScreen] = useState(() => screenFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setScreen(screenFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (next: DiscoveryScreen) => {
    if (next !== screen) window.history.pushState({}, '', paths[next]);
    setScreen(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="discovery-app">
      <DiscoveryHeader onNavigate={navigate} />
      {screen === 'map' && <MapDiscovery />}
      {screen === 'messages' && <Messages onNavigate={navigate} />}
      {screen === 'notifications' && <Notifications onNavigate={navigate} />}
      {screen === 'viewings' && <Viewings />}
      {/* Home and Properties are built by other teammates. These stay clickable until the shared router connects them. */}
      {(screen === 'home' || screen === 'properties') && (
        <main className="discovery-page">
          <StateMessage
            title={screen === 'home' ? 'Home' : 'Properties'}
            text="This page is built by another teammate and will be connected through the shared router."
          />
        </main>
      )}
      <DiscoveryNavigation screen={screen} onNavigate={navigate} />
    </div>
  );
}
