import type { DiscoveryScreen } from './DiscoveryNavigation.js';

interface DiscoveryHeaderProps {
  onNavigate: (screen: DiscoveryScreen) => void;
}

// Header from the Figma: brand mark, wordmark, then bell, messages and profile icons.
// The bell asset already includes the notification dot.
export default function DiscoveryHeader({ onNavigate }: DiscoveryHeaderProps) {
  return (
    <header className="discovery-header">
      <img className="discovery-header__brand" src="/assets/figma/brand-mark-header.svg" alt="" />
      <span className="discovery-header__wordmark">HOMELANE</span>
      <div className="discovery-header__actions">
        <button type="button" aria-label="Notifications" onClick={() => onNavigate('notifications')}>
          <img src="/assets/figma/notifications.svg" alt="" />
        </button>
        <button type="button" aria-label="Messages" onClick={() => onNavigate('messages')}>
          <img src="/assets/figma/messages.svg" alt="" />
        </button>
        <button type="button" aria-label="Profile"><img src="/assets/figma/profile.svg" alt="" /></button>
      </div>
    </header>
  );
}
