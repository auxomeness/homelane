import { useState } from 'react';
import { notificationCategories, notifications as sampleNotifications, type NotificationCategory } from '../data/discoveryData.js';
import type { DiscoveryScreen } from '../shared/DiscoveryNavigation.js';
import StateMessage from '../shared/StateMessage.js';

interface NotificationsProps {
  onNavigate: (screen: DiscoveryScreen) => void;
}

export default function Notifications({ onNavigate }: NotificationsProps) {
  const [category, setCategory] = useState<'All' | NotificationCategory>('All');
  const [items, setItems] = useState(sampleNotifications);

  const visible = items.filter((item) => category === 'All' || item.category === category);
  const markRead = (id: string) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));

  return (
    <main className="discovery-page notifications-page">
      <h1 className="discovery-title">Notifications</h1>
      <p className="discovery-subtitle">Sample in-app activity only. No emails are sent.</p>

      <div className="category-tabs" role="tablist" aria-label="Notification categories">
        {notificationCategories.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={category === name}
            className={`category-tab${category === name ? ' is-active' : ''}`}
            onClick={() => setCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <StateMessage title="No notifications" text="You're all caught up. New activity will appear here." />
      ) : (
        <ul className="notification-list">
          {visible.map((item) => (
            <li key={item.id} className={`notification${item.read ? '' : ' is-unread'}`}>
              <span className="notification__dot" aria-label={item.read ? 'Read' : 'Unread'} />
              <div className="notification__body">
                <div className="notification__row">
                  <span className="notification__category">{item.category}</span>
                  <time>{item.time}</time>
                </div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <span className="notification__reference">{item.reference}</span>
                <div className="notification__actions">
                  {item.link && (
                    <button type="button" onClick={() => { markRead(item.id); onNavigate(item.link!); }}>
                      {item.link === 'messages' ? 'View conversation' : 'View on map'}
                    </button>
                  )}
                  {!item.read && <button type="button" onClick={() => markRead(item.id)}>Mark as read</button>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
