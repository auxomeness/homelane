export type AgentScreen = 'dashboard' | 'listings' | 'addListing';

interface AgentNavigationProps {
  screen: AgentScreen;
  onNavigate: (screen: AgentScreen) => void;
}

export default function AgentNavigation({ screen, onNavigate }: AgentNavigationProps) {
  return (
    <>
      <button type="button" className="agent-fab" aria-label="Add listing" onClick={() => onNavigate('addListing')}>
        <img src="/assets/figma/plus.svg" alt="" />
      </button>
      <nav className="agent-bottom-nav" aria-label="Agent navigation">
        <button type="button" className={`agent-bottom-nav__item${screen === 'dashboard' ? ' is-active' : ''}`} aria-current={screen === 'dashboard' ? 'page' : undefined} onClick={() => onNavigate('dashboard')}>
          <img src="/assets/figma/dashboard.svg" alt="" /><span>Dashboard</span>
        </button>
        <button type="button" className={`agent-bottom-nav__item${screen === 'listings' || screen === 'addListing' ? ' is-active' : ''}`} aria-current={screen === 'listings' ? 'page' : undefined} onClick={() => onNavigate('listings')}>
          <img src="/assets/figma/viewings.svg" alt="" /><span>Listings</span>
        </button>
        <button type="button" className="agent-bottom-nav__item" disabled aria-disabled="true">
          <img src="/assets/figma/listings.svg" alt="" /><span>Viewings</span>
        </button>
      </nav>
    </>
  );
}
