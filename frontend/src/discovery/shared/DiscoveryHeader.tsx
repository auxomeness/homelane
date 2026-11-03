import type { DiscoveryScreen } from './DiscoveryNavigation.js';

interface DiscoveryHeaderProps {
  onNavigate: (screen: DiscoveryScreen) => void;
  unreadNotifications: number;
}

export default function DiscoveryHeader({ onNavigate, unreadNotifications }: DiscoveryHeaderProps) {
  return (
    <header className="discovery-header">
      <img className="discovery-header__brand" src="/assets/figma/brand-mark-header.svg" alt="" />
      <span className="discovery-header__wordmark">HOMELANE</span>
      <div className="discovery-header__actions">
        <button type="button" aria-label="Notifications" onClick={() => onNavigate('notifications')}>
          <img src="/assets/figma/notifications.svg" alt="" />
          {unreadNotifications > 0 && <span className="discovery-header__dot" aria-hidden="true" />}
        </button>
        <button type="button" aria-label="Messages" onClick={() => onNavigate('messages')}>
          <img src="/assets/figma/messages.svg" alt="" />
        </button>
        <button type="button" aria-label="Profile"><img src="/assets/figma/profile.svg" alt="" /></button>
      </div>
    </header>
  );
}
