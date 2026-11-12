import { Building2, House, MapPinned } from 'lucide-react';
import { NavLink } from 'react-router';
import './sharedStyles.css';

const navigationItems = [
  { label: 'Home', to: '/visitor', icon: House, end: true },
  { label: 'Map', to: '/visitor/map', icon: MapPinned, end: false },
  { label: 'Properties', to: '/visitor/properties', icon: Building2, end: false },
];

export default function VisitorNavigation() {
  return (
    <nav className="visitor-bottom-nav" aria-label="Visitor navigation">
      {navigationItems.map(({ label, to, icon: Icon, end }) => (
        <NavLink className="visitor-bottom-nav__link" to={to} end={end} key={label}>
          <span className="visitor-bottom-nav__icon"><Icon size={26} strokeWidth={2} /></span>
          <span className="visitor-bottom-nav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
