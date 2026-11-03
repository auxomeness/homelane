import { useEffect, useState } from 'react';
import { notifications } from './data/discoveryData.js';
import MapDiscovery from './pages/MapDiscovery.js';
import Messages from './pages/Messages.js';
import Notifications from './pages/Notifications.js';
import DiscoveryHeader from './shared/DiscoveryHeader.js';
import DiscoveryNavigation, { type DiscoveryScreen } from './shared/DiscoveryNavigation.js';
import './discovery.css';

const paths: Record<DiscoveryScreen, string> = {
  map: '/discovery/map',
  messages: '/discovery/messages',
  notifications: '/discovery/notifications',
};

function screenFromPath(path: string): DiscoveryScreen {
  if (path.endsWith('/messages')) return 'messages';
  if (path.endsWith('/notifications')) return 'notifications';
  return 'map';
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

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="discovery-app">
      <DiscoveryHeader onNavigate={navigate} unreadNotifications={unread} />
      {screen === 'map' && <MapDiscovery />}
      {screen === 'messages' && <Messages />}
      {screen === 'notifications' && <Notifications onNavigate={navigate} />}
      <DiscoveryNavigation screen={screen} onNavigate={navigate} />
    </div>
  );
}
