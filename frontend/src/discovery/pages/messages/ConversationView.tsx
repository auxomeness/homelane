import { useState } from 'react';
import type { Conversation, Property } from '../../types.js';
import { getProperty } from '../../utils.js';
import OfferCard from '../../shared/OfferCard.js';

interface ConversationViewProps {
  conversation: Conversation;
  properties: Property[];
  viewerId: string;
  onBack: () => void;
}

export default function ConversationView({ conversation, properties, viewerId, onBack }: ConversationViewProps) {
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState<{ id: string; text: string }[]>([]);
  const property = getProperty(properties, conversation.propertyId);
  const otherName = conversation.participantIds[0] === viewerId ? conversation.agentName : conversation.buyerName;

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setSent((current) => [...current, { id: `local-${current.length}`, text }]);
    setDraft('');
  };

  return (
    <section className="conversation-view" aria-label={`Conversation with ${otherName}`}>
      <header className="conversation-view__header">
        <button type="button" className="conversation-view__back" onClick={onBack} aria-label="Back to conversations">‹</button>
        <div>
          <strong>{otherName}</strong>
          <span>{property?.title} · {property?.area}</span>
        </div>
      </header>

      <div className="conversation-view__messages">
        {conversation.messages.length === 0 && sent.length === 0 && (
          <p className="composer__note">No messages yet. Say hello below.</p>
        )}
        {conversation.messages.map((message) => {
          const mine = message.senderId === viewerId;
          return (
            <div key={message.id} className={`message${mine ? ' is-mine' : ''}`}>
              {message.offer && <OfferCard {...message.offer} mine={mine} />}
              {message.text && <p className="message__bubble">{message.text}</p>}
              <time>{message.time}</time>
            </div>
          );
        })}
        {sent.map((message) => (
          <div key={message.id} className="message is-mine">
            <p className="message__bubble">{message.text}</p>
            <time>Just now</time>
          </div>
        ))}
      </div>

      <form className="composer" onSubmit={send}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type your message"
          aria-label="Message"
        />
        <button type="submit" aria-label="Send message">Send</button>
      </form>
      <p className="composer__note">Offers in this chat are non-binding.</p>
    </section>
  );
}
