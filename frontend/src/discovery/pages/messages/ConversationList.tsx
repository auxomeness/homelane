import { getProperty, type Conversation } from '../../data/discoveryData.js';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  /** Which side of the conversation the signed-in user is on. */
  viewerRole: 'buyer' | 'agent';
  onSelect: (id: string) => void;
}

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

export default function ConversationList({ conversations, activeId, viewerRole, onSelect }: ConversationListProps) {
  return (
    <ul className="conversation-list">
      {conversations.map((conversation) => {
        const last = conversation.messages[conversation.messages.length - 1];
        const property = getProperty(conversation.propertyId);
        const otherName = viewerRole === 'buyer' ? conversation.agentName : conversation.buyerName;
        const preview = last.offer
          ? `${last.offer.kind === 'offer' ? 'Offer' : 'Counteroffer'} sent (non-binding)`
          : last.text;
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
                  <time>{last.time}</time>
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
