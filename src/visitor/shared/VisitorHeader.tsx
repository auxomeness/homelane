import { BellDot, CircleUser, MessageCircleText } from 'lucide-react';

type VisitorHeaderProps = { onLoginClick?: () => void };

export default function VisitorHeader({ onLoginClick }: VisitorHeaderProps) {
  return (
    <header className="visitor-header">
      <h2 className="visitor-header__brand">HOMELANE</h2>
      {onLoginClick ? (
        <button className="visitor-header__login" type="button" onClick={onLoginClick}>Login</button>
      ) : <div className="visitor-header__right">
        <span className="visitor-header__role">Visitor</span>
        <div className="visitor-header__actions" aria-label="Account shortcuts">
          <button type="button" aria-label="Notifications"><BellDot size={23} /></button>
          <button type="button" aria-label="Messages"><MessageCircleText size={23} /></button>
          <button type="button" aria-label="Profile"><CircleUser size={23} /></button>
        </div>
      </div>}
    </header>
  );
}
