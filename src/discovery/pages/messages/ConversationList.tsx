import type { Conversation, Property } from '../../types.js';
import { getProperty } from '../../utils.js';

interface ConversationListProps {
  conversations: Conversation[];
  properties: Property[];
  activeId: string | null;
  /** Which side of the conversation the signed-in user is on. */
  viewerRole: 'buyer' | 'agent';
  /** Id of the signed-in user, used for the "You:" prefix. */
  viewerId: string;
  onSelect: (id: string) => void;
}

// "Real estate agent KA" shows as KA, a personal name shows its first letters.
function initials(name: string) {
  const parts = name.split(' ');
  if (name.startsWith('Real estate agent')) return parts[parts.length - 1].toUpperCase();
  return parts.map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

export default function ConversationList({ conversations, properties, activeId, viewerRole, viewerId, onSelect }: ConversationListProps) {
  return (
    <ul className="conversation-list">
      {conversations.map((conversation) => {
        const last = conversation.messages[conversation.messages.length - 1];
        const property = getProperty(properties, conversation.propertyId);
        const otherName = viewerRole === 'buyer' ? conversation.agentName : conversation.buyerName;
        const preview = !last
          ? 'No messages yet'
          : last.offer
            ? `${last.offer.kind === 'offer' ? 'Offer' : 'Counteroffer'} sent (non-binding)`
            : `${last.senderId === viewerId ? 'You: ' : ''}${last.text}`;
        return (
          <li key={conversation.id}>
            <button
              type="button"
              className={`conversation-item${activeId === conversation.id ? ' is-active' : ''}${conversation.unread ? ' is-unread' : ''}`}
              onClick={() => onSelect(conversation.id)}
            >
              <span className="avatar" aria-hidden="true">{initials(otherName)}</span>
              <span className="conversation-item__body">
                <span className="conversation-item__row">
                  <strong>{otherName}</strong>
                  <time>{conversation.lastTime}</time>
                </span>
                <span className="conversation-item__property">{property?.title} · {property?.area}</span>
                <span className="conversation-item__preview">{preview}</span>
              </span>
              {conversation.unread > 0 && (
                <span className="unread-badge" aria-label={`${conversation.unread} unread messages`}>{conversation.unread}</span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
