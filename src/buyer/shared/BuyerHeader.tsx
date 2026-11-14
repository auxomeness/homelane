import { Link, NavLink } from 'react-router';

import './BuyerHeader.css';

export default function BuyerHeader() {
  return (
    <header className="buyer-header">
      <Link className="buyer-header__brand" to="/buyer/home" aria-label="Homelane buyer home">
        <img src="/assets/figma/brand-mark-header.svg" alt="" />
        <span>HOMELANE</span>
      </Link>

      <nav className="buyer-header__actions" aria-label="Account shortcuts">
        <NavLink className={({ isActive }) => isActive ? 'is-current' : undefined} to="/buyer/notifications" aria-label="Notifications" title="Notifications">
          <img src="/assets/figma/notifications.svg" alt="" />
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'is-current' : undefined} to="/buyer/messages" aria-label="Messages" title="Messages">
          <img src="/assets/figma/messages.svg" alt="" />
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'is-current' : undefined} to="/buyer/profile" aria-label="Profile" title="Profile">
          <img src="/assets/figma/profile.svg" alt="" />
        </NavLink>
      </nav>
    </header>
  );
}
