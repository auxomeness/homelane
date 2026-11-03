export type DiscoveryScreen = 'map' | 'messages' | 'notifications';

interface DiscoveryNavigationProps {
  screen: DiscoveryScreen;
  onNavigate: (screen: DiscoveryScreen) => void;
}

const icons = {
  map: <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11zm0-8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />,
  messages: <path d="M4 5h16v11H9l-5 4V5z" />,
  notifications: <path d="M6 17V11a6 6 0 1 1 12 0v6l2 2H4l2-2zm4 4h4" />,
  viewings: <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
};

const items: Array<{ id: DiscoveryScreen; label: string }> = [
  { id: 'map', label: 'Map' },
  { id: 'messages', label: 'Messages' },
  { id: 'notifications', label: 'Alerts' },
];

export default function DiscoveryNavigation({ screen, onNavigate }: DiscoveryNavigationProps) {
  return (
    <nav className="discovery-nav" aria-label="Discovery navigation">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`discovery-nav__item${screen === item.id ? ' is-active' : ''}`}
          aria-current={screen === item.id ? 'page' : undefined}
          onClick={() => onNavigate(item.id)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[item.id]}</svg>
          <span>{item.label}</span>
        </button>
      ))}
      {/* Viewings is built separately, so it stays disabled here. */}
      <button type="button" className="discovery-nav__item" disabled aria-disabled="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons.viewings}</svg>
        <span>Viewings</span>
      </button>
    </nav>
  );
}
