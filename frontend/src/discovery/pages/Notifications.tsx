import { useState } from 'react';
import type { NotificationCategory, NotificationItem, OfferSummary, Property } from '../types.js';
import { formatPeso, getProperty, notificationCategories } from '../utils.js';
import Icon, { type IconName } from '../shared/Icon.js';
import type { DiscoveryScreen } from '../shared/DiscoveryNavigation.js';
import StateMessage from '../shared/StateMessage.js';

interface NotificationsProps {
  onNavigate: (screen: DiscoveryScreen) => void;
}

const categoryIcon: Record<NotificationCategory, IconName> = {
  Messages: 'message',
  Offers: 'tag',
  Viewings: 'eye',
  Listings: 'home',
};

const linkLabel: Record<NotificationCategory, string> = {
  Messages: 'Go to Messages',
  Offers: 'View Offer',
  Viewings: 'View Viewings',
  Listings: 'View Listings',
};

// No database yet, so these start empty. Fill them from the API later.
const notifications: NotificationItem[] = [];
const offerSummaries: OfferSummary[] = [];
const properties: Property[] = [];

export default function Notifications({ onNavigate }: NotificationsProps) {
  const [category, setCategory] = useState<'All' | NotificationCategory>('All');
  const [items, setItems] = useState(notifications);
  const [menuOpen, setMenuOpen] = useState(false);

  const visible = items.filter((item) => category === 'All' || item.category === category);
  const markRead = (id: string) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));

  return (
    <main className="discovery-page notifications-page">
      <div
        className="notification-filter"
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false); }}
        onKeyDown={(e) => { if (e.key === 'Escape') setMenuOpen(false); }}
      >
        <button
          type="button"
          className="notification-filter__button"
          aria-haspopup="listbox"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{category === 'All' ? 'All notifications' : category}</span>
          <Icon name={menuOpen ? 'chevron-up' : 'chevron-down'} size={24} />
        </button>
        {menuOpen && (
          <ul className="notification-filter__menu" role="listbox" aria-label="Notification category">
            {notificationCategories.map((name) => (
              <li key={name} role="option" aria-selected={category === name}>
                <button
                  type="button"
                  className={category === name ? 'is-selected' : ''}
                  onClick={() => { setCategory(name); setMenuOpen(false); }}
                >
                  <span>{name === 'All' ? 'All notifications' : name}</span>
                  {category === name && <Icon name="tick" size={20} />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {category === 'Offers' && offerSummaries.length === 0 ? (
        <StateMessage title="No offers yet." text="Offers you send or receive will appear here." />
      ) : category === 'Offers' ? (
        <ul className="offer-grid" aria-label="Offers">
          {offerSummaries.map((offer) => (
            <li key={offer.id} className="offer-summary">
              <div className="offer-summary__top">
                <span className="notification__icon is-unread"><Icon name="tag" size={18} /></span>
                <strong>Offer for {getProperty(properties, offer.propertyId)?.title}</strong>
              </div>
              <p className="offer-summary__meta">Agent: {offer.agentInitials}</p>
              <p className="offer-summary__meta">Proposed Offer: {formatPeso(offer.proposed)}</p>
              <div className="offer-summary__bottom">
                <time>{offer.time}</time>
                <button type="button" className="offer-summary__view" onClick={() => onNavigate('messages')}>
                  View <Icon name="arrow-right" size={12} />
                </button>
                <span className={`status-pill status-pill--${offer.status.toLowerCase()}`}>{offer.status}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : visible.length === 0 ? (
        <StateMessage title="You have no notifications." text="New activity will appear here." />
      ) : (
        <ul className="notification-list">
          {visible.map((item) => (
            <li key={item.id} className={`notification${item.read ? '' : ' is-unread'}`}>
              <span className={`notification__icon${item.read ? '' : ' is-unread'}`} aria-label={item.read ? 'Read' : 'Unread'}>
                <Icon name={categoryIcon[item.category]} size={20} />
              </span>
              <div className="notification__body">
                <div className="notification__row">
                  <strong>{item.title}</strong>
                  <time>{item.time}</time>
                </div>
                <p>{item.description}</p>
                <button
                  type="button"
                  className="notification__link"
                  onClick={() => { markRead(item.id); if (item.link) onNavigate(item.link); }}
                >
                  {linkLabel[item.category]} <Icon name="arrow-right" size={12} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
