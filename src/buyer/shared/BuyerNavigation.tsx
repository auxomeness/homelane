import { NavLink } from 'react-router';
import './BuyerNavigation.css';

const items = [
  { label: 'Home', to: '/buyer/home', icon: '/assets/figma/nav-home.svg' },
  { label: 'Map', to: '/buyer/map', icon: '/assets/figma/nav-map.svg' },
  { label: 'Viewings', to: '/buyer/viewings', icon: '/assets/figma/nav-viewings.svg' },
  { label: 'Properties', to: '/buyer/properties', icon: '/assets/figma/nav-properties.svg' },
];


export default function BuyerNavigation() {
  return (
    <section className="buyer-workspace-nav" aria-label="Buyer workspace navigation">
      <span className="buyer-workspace-nav__title">Buyer workspace</span>
      <nav className="buyer-nav" aria-label="Buyer pages">
        {items.map(({ label, to, icon }) => (
          <NavLink
            key={label}
            to={to}
            end
            className={({ isActive }) => `buyer-nav__item${isActive ? ' is-active' : ''}`}
            aria-label={label}
          >
            <span className="buyer-nav__icon"><img src={icon} alt="" /></span>
            <span className="buyer-nav__label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </section>
  );
}
