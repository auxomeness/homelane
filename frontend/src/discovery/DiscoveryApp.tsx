import { useState } from 'react';
import Map from './pages/Map.js';
import Messages from './pages/Messages.js';
import Notifications from './pages/Notifications.js';
import Viewings from './pages/Viewings.js';
import './discovery.css';

export type DiscoveryScreen = 'map' | 'messages' | 'notifications' | 'viewings';

export default function DiscoveryApp() {
  // Navigation between Discovery pages will be connected on a later day.
  const [screen] = useState<DiscoveryScreen>('map');

  return (
    <div className="discovery-app">
      {screen === 'map' && <Map />}
      {screen === 'messages' && <Messages />}
      {screen === 'notifications' && <Notifications />}
      {screen === 'viewings' && <Viewings />}
    </div>
  );
}
