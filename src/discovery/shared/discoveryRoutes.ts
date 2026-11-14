export type DiscoveryScreen = 'home' | 'map' | 'viewings' | 'properties' | 'messages' | 'notifications';

/** Route path of every Discovery screen. These match the routes in AppRoutes.tsx. */
export const discoveryPaths: Record<DiscoveryScreen, string> = {
  home: '/discovery/home',
  map: '/discovery/map',
  viewings: '/discovery/viewings',
  properties: '/discovery/properties',
  messages: '/discovery/messages',
  notifications: '/discovery/notifications',
};

/** Keep browsing filters and selected listing state while moving between the Discovery list and map. */
export function getDiscoveryPath(screen: DiscoveryScreen, search = '') {
  const preserveBrowsingState = screen === 'map' || screen === 'properties';
  return `${discoveryPaths[screen]}${preserveBrowsingState ? search : ''}`;
}
