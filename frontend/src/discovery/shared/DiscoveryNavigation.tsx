export type DiscoveryScreen = 'home' | 'map' | 'viewings' | 'properties' | 'messages' | 'notifications';

interface DiscoveryNavigationProps {
  screen: DiscoveryScreen;
  onNavigate: (screen: DiscoveryScreen) => void;
}

// Footer from the Figma: Home, Map, Viewings, Properties. The active tab is the raised white circle.
const items: Array<{ id: DiscoveryScreen; label: string; icon: string }> = [
  { id: 'home', label: 'Home', icon: '/assets/figma/nav-home.svg' },
  { id: 'map', label: 'Map', icon: '/assets/figma/nav-map.svg' },
  { id: 'viewings', label: 'Viewings', icon: '/assets/figma/nav-viewings.svg' },
  { id: 'properties', label: 'Properties', icon: '/assets/figma/nav-properties.svg' },
];

export default function DiscoveryNavigation({ screen, onNavigate }: DiscoveryNavigationProps) {
  // Messages and Notifications open from the header, and the Figma frames show Home as the active tab there.
  const activeTab = screen === 'messages' || screen === 'notifications' ? 'home' : screen;
  return (
    <nav className="discovery-nav" aria-label="Main navigation">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`discovery-nav__item${activeTab === item.id ? ' is-active' : ''}`}
          aria-current={screen === item.id ? 'page' : undefined}
          onClick={() => onNavigate(item.id)}
        >
          <span className="discovery-nav__icon"><img src={item.icon} alt="" /></span>
          <span className="discovery-nav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
