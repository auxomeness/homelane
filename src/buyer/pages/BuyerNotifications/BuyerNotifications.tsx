import './BuyerNotifications.css';
import { useState } from 'react';
import { Link } from 'react-router';

type NotificationCategory = 'Messages' | 'Offers' | 'Viewings' | 'Listings';
type CategoryFilter = 'All notifications' | NotificationCategory;

type BuyerNotification = {
  id: number;
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  initials: string;
  destination: string;
  unread?: boolean;
};

const filters: CategoryFilter[] = ['All notifications', 'Messages', 'Offers', 'Viewings', 'Listings'];

const notifications: BuyerNotification[] = [
  {
    id: 1,
    category: 'Messages',
    title: 'New message',
    description: 'Agent replied to your inquiry about a three-bedroom home in Naga City.',
    time: '2 min ago',
    initials: 'KA',
    destination: '/buyer/messages',
    unread: true,
  },
  {
    id: 2,
    category: 'Offers',
    title: 'Offer update',
    description: 'Your offer of ₱8,500,000 has been received by the seller.',
    time: '1 hour ago',
    initials: '₱',
    destination: '/buyer/offers',
    unread: true,
  },
  {
    id: 3,
    category: 'Viewings',
    title: 'Viewing reminder',
    description: 'Your viewing for the Garden-view family home is coming up this Saturday.',
    time: 'Yesterday',
    initials: '◷',
    destination: '/buyer/viewings',
  },
  {
    id: 4,
    category: 'Listings',
    title: 'New property match',
    description: 'A home matching your saved search is now available in Naga City.',
    time: 'Yesterday',
    initials: '⌂',
    destination: '/buyer/properties',
  },
];

export default function BuyerNotifications() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All notifications');
  const [filterOpen, setFilterOpen] = useState(false);

  const visibleNotifications = notifications.filter((notification) =>
    activeFilter === 'All notifications' || notification.category === activeFilter,
  );

  return (
    <section className="buyer-notifications" aria-labelledby="buyer-notifications-title">
      <div className="buyer-page-heading">
        <div>
          <p className="buyer-eyebrow">Buyer workspace</p>
          <h1 id="buyer-notifications-title">Notifications</h1>
        </div>
        <p className="buyer-page-heading__description">Updates about your messages, offers, viewings, and properties.</p>
      </div>

      <div className="buyer-notifications__content">
        <div className="buyer-notifications__toolbar">
          <div className="buyer-notifications__desktop-filters" role="group" aria-label="Filter notifications">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`buyer-notifications__filter${activeFilter === filter ? ' is-active' : ''}`}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="buyer-notifications__mobile-filter">
            <button
              className="buyer-notifications__select"
              type="button"
              aria-expanded={filterOpen}
              aria-haspopup="listbox"
              onClick={() => setFilterOpen((open) => !open)}
            >
              <span>{activeFilter}</span>
              <svg className={filterOpen ? 'is-open' : ''} viewBox="0 0 20 20" aria-hidden="true">
                <path d="m5 8 5 5 5-5" />
              </svg>
            </button>
            {filterOpen && (
              <div className="buyer-notifications__options" role="listbox" aria-label="Notification category">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`buyer-notifications__option${activeFilter === filter ? ' is-active' : ''}`}
                    type="button"
                    role="option"
                    aria-selected={activeFilter === filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setFilterOpen(false);
                    }}
                  >
                    <span>{filter}</span>
                    {activeFilter === filter && <span aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="buyer-notifications__count">{visibleNotifications.length} updates</span>
        </div>

        <div className="buyer-notifications__list" aria-live="polite">
          {visibleNotifications.map((notification) => (
            <Link
              className={`buyer-notification${notification.unread ? ' is-unread' : ''}`}
              key={notification.id}
              to={notification.destination}
            >
              <span className={`buyer-notification__avatar buyer-notification__avatar--${notification.category.toLowerCase()}`} aria-hidden="true">
                {notification.initials}
              </span>
              <span className="buyer-notification__body">
                <span className="buyer-notification__title-row">
                  <strong>{notification.title}</strong>
                  <time>{notification.time}</time>
                </span>
                <span className="buyer-notification__description">{notification.description}</span>
                <span className="buyer-notification__category">{notification.category}</span>
              </span>
              {notification.unread && <span className="buyer-notification__unread-dot" aria-label="Unread" />}
            </Link>
          ))}
          {visibleNotifications.length === 0 && (
            <p className="buyer-notifications__empty">You’re all caught up in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
}
