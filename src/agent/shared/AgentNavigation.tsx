export type AgentScreen = 'dashboard' | 'listings' | 'addListing';

interface AgentNavigationProps {
  screen: AgentScreen;
  onNavigate: (screen: AgentScreen) => void;
}

const navItems: { label: string; screen: AgentScreen }[] = [
  { label: 'Overview', screen: 'dashboard' },
  { label: 'My listings', screen: 'listings' },
  { label: 'Add listing', screen: 'addListing' },
];

export default function AgentNavigation({ screen, onNavigate }: AgentNavigationProps) {
  return (
    <nav id="agent-nav" aria-label="Agent workspace">
      <div className="agent-nav-title">
        <h3>Workspace</h3>
      </div>
      <div className="agent-nav-panel">
        {navItems.map((item) => (
          <button
            type="button"
            className={`agent-nav-item${screen === item.screen ? ' is-active' : ''}`}
            aria-current={screen === item.screen ? 'page' : undefined}
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
          >
            {item.label}
          </button>
        ))}
        <button type="button" className="agent-nav-item" disabled aria-disabled="true">Viewings</button>
      </div>
    </nav>
  );
}
