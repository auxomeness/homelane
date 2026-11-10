import { BellDot, CircleUser, MessageCircleText } from 'lucide-react';

export default function AgentHeader() {
  return (
    <header className="agent-header">
      <h2 className="agent-header__brand">HOMELANE</h2>
      <div className="agent-header__right">
        <span className="agent-header__role">Agent</span>
        <div className="agent-header__actions" aria-label="Account shortcuts">
          <button type="button" aria-label="Notifications"><BellDot size={23} /></button>
          <button type="button" aria-label="Messages"><MessageCircleText size={23} /></button>
          <button type="button" aria-label="Profile"><CircleUser size={23} /></button>
        </div>
      </div>
    </header>
  );
}
