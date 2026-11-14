import { Eye, LayoutDashboard, List, Map, Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AgentScreen = 'dashboard' | 'listings' | 'addListing' | 'viewings' | 'map';

interface AgentNavigationProps {
  screen: AgentScreen | null;
  onNavigate: (screen: AgentScreen) => void;
}

const navItems: { label: string; screen: AgentScreen; icon: LucideIcon }[] = [
  { label: 'Overview', screen: 'dashboard', icon: LayoutDashboard },
  { label: 'My listings', screen: 'listings', icon: List },
  { label: 'Map', screen: 'map', icon: Map },
  { label: 'Add listing', screen: 'addListing', icon: Plus },
  { label: 'Viewings', screen: 'viewings', icon: Eye },
];

export default function AgentNavigation({ screen, onNavigate }: AgentNavigationProps) {
  return (
    <nav id="agent-nav" aria-label="Agent workspace">
      <div className="agent-nav-title">
        <h3>Workspace</h3>
      </div>
      <div className="agent-nav-panel">
        {navItems.map(({ label, screen: itemScreen, icon: Icon }) => (
          <button
            type="button"
            className={`agent-nav-item${screen === itemScreen ? ' is-active' : ''}`}
            aria-label={label}
            aria-current={screen === itemScreen ? 'page' : undefined}
            key={itemScreen}
            title={label}
            onClick={() => onNavigate(itemScreen)}
          >
            <Icon className="agent-nav-item__icon" size={22} aria-hidden="true" />
            <span className="agent-nav-item__label">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
