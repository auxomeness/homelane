import './BuyerMessages.css';
import { useMemo, useState, type FormEvent } from 'react';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from '../../components/button.js';

type Message = {
  id: number;
  author: 'buyer' | 'agent';
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  initials: string;
  agent: string;
  property: string;
  location: string;
  time: string;
  preview: string;
  unreadCount: number;
  messages: Message[];
};

const starterConversations: Conversation[] = [
  {
    id: 'ka',
    initials: 'KA',
    agent: 'Real estate agent KA',
    property: 'Three-bedroom home',
    location: 'Naga City',
    time: '2m ago',
    preview: "Hello, I'm interested. When can I view?",
    unreadCount: 2,
    messages: [
      { id: 1, author: 'agent', text: 'Hi! Thanks for your interest in the three-bedroom home. I can help arrange a viewing.', time: '9:24 AM' },
      { id: 2, author: 'buyer', text: "Hello, I'm interested. When can I view?", time: '9:31 AM' },
    ],
  },
  {
    id: 'jj',
    initials: 'JJ',
    agent: 'Real estate agent JJ',
    property: 'Garden-view family home',
    location: 'Pacol',
    time: '1h ago',
    preview: 'Thanks! The offer is with the owner.',
    unreadCount: 0,
    messages: [
      { id: 1, author: 'buyer', text: 'I would like to make an offer on the garden-view family home.', time: '8:12 AM' },
      { id: 2, author: 'agent', text: 'Thanks! The offer is with the owner.', time: '8:26 AM' },
    ],
  },
  {
    id: 'bf',
    initials: 'BF',
    agent: 'Real estate agent BF',
    property: 'Two-bedroom condo',
    location: 'Triangulo',
    time: 'Yesterday',
    preview: 'You: Is parking included?',
    unreadCount: 0,
    messages: [
      { id: 1, author: 'agent', text: 'The unit is available for viewing this week. Would you like to schedule a visit?', time: 'Yesterday, 3:18 PM' },
      { id: 2, author: 'buyer', text: 'Is parking included?', time: 'Yesterday, 3:42 PM' },
    ],
  },
  {
    id: 'xh',
    initials: 'XH',
    agent: 'Real estate agent XH',
    property: 'Corner duplex',
    location: 'Dayangdang',
    time: 'Mon',
    preview: 'Viewing is set for Saturday, 10:00 AM.',
    unreadCount: 1,
    messages: [
      { id: 1, author: 'buyer', text: 'Could I see the corner duplex this weekend?', time: 'Monday, 10:06 AM' },
      { id: 2, author: 'agent', text: 'Viewing is set for Saturday, 10:00 AM.', time: 'Monday, 10:19 AM' },
    ],
  },
];

type MessageFilter = 'all' | 'unread';

export default function BuyerMessages() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState(starterConversations);
  const [filter, setFilter] = useState<MessageFilter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const visibleConversations = useMemo(
    () => conversations.filter((conversation) => filter === 'all' || conversation.unreadCount > 0),
    [conversations, filter],
  );
  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) ?? null;

  const selectConversation = (id: string) => {
    setSelectedId(id);
    setConversations((current) => current.map((conversation) => (
      conversation.id === id ? { ...conversation, unreadCount: 0 } : conversation
    )));
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !selectedConversation) return;

    setConversations((current) => current.map((conversation) => {
      if (conversation.id !== selectedConversation.id) return conversation;
      return {
        ...conversation,
        time: 'Now',
        preview: `You: ${text}`,
        unreadCount: 0,
        messages: [...conversation.messages, { id: Date.now(), author: 'buyer', text, time: 'Now' }],
      };
    }));
    setDraft('');
  };

  return (
    <section className={`buyer-messages${selectedConversation ? ' buyer-messages--conversation-open' : ''}`}>
      <div className="buyer-page-heading">
        <div>
          <p className="buyer-eyebrow">Home</p>
          <h1>Messages</h1>
        </div>
        <p className="buyer-page-heading__description">Conversations about the homes you are interested in.</p>
      </div>

      <div className="buyer-messages__layout">
        <aside className="buyer-inbox" aria-label="Conversations">
          <div className="buyer-inbox__toolbar">
            <div className="buyer-inbox__filters" aria-label="Filter messages">
              <button
                type="button"
                className={`buyer-filter${filter === 'all' ? ' is-active' : ''}`}
                aria-pressed={filter === 'all'}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`buyer-filter${filter === 'unread' ? ' is-active' : ''}`}
                aria-pressed={filter === 'unread'}
                onClick={() => setFilter('unread')}
              >
                Unread
              </button>
            </div>
            <span className="buyer-inbox__count">{visibleConversations.length} conversations</span>
          </div>

          <div className="buyer-inbox__list">
            {visibleConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                className={`buyer-conversation${selectedId === conversation.id ? ' is-selected' : ''}`}
                onClick={() => selectConversation(conversation.id)}
                aria-pressed={selectedId === conversation.id}
              >
                <span className="buyer-conversation__avatar" aria-hidden="true">{conversation.initials}</span>
                <span className="buyer-conversation__body">
                  <span className="buyer-conversation__topline">
                    <strong>{conversation.agent}</strong>
                    <time>{conversation.time}</time>
                  </span>
                  <span className="buyer-conversation__property">{conversation.property} · {conversation.location}</span>
                  <span className={`buyer-conversation__preview${conversation.unreadCount > 0 ? ' is-unread' : ''}`}>
                    {conversation.preview}
                  </span>
                </span>
                {conversation.unreadCount > 0 && (
                  <span className="buyer-conversation__unread" aria-label={`${conversation.unreadCount} unread messages`}>
                    {conversation.unreadCount}
                  </span>
                )}
              </button>
            ))}
            {visibleConversations.length === 0 && (
              <p className="buyer-inbox__no-results">You’re all caught up. No unread messages.</p>
            )}
          </div>
        </aside>

        <section className="buyer-thread" aria-label={selectedConversation ? `Conversation with ${selectedConversation.agent}` : 'Message details'}>
          {selectedConversation ? (
            <>
              <header className="buyer-thread__header">
                <button className="buyer-thread__back" type="button" aria-label="Back to messages" onClick={() => setSelectedId(null)}>
                  <ArrowLeft size={19} />
                </button>
                <span className="buyer-thread__avatar" aria-hidden="true">{selectedConversation.initials}</span>
                <div className="buyer-thread__identity">
                  <strong>{selectedConversation.agent}</strong>
                  <span>{selectedConversation.property} · {selectedConversation.location}</span>
                </div>
                <button className="buyer-thread__property-link" type="button" onClick={() => navigate('/buyer/properties')}>
                  View property
                </button>
              </header>

              <div className="buyer-thread__timeline" aria-live="polite">
                <div className="buyer-thread__property-note">
                  <span>Property inquiry</span>
                  <strong>{selectedConversation.property}</strong>
                  <span>{selectedConversation.location}</span>
                </div>
                {selectedConversation.messages.map((message) => (
                  <div key={message.id} className={`buyer-message buyer-message--${message.author}`}>
                    {message.author === 'agent' && <span className="buyer-message__sender">{selectedConversation.agent}</span>}
                    <p>{message.text}</p>
                    <time>{message.time}</time>
                  </div>
                ))}
              </div>

              <form className="buyer-composer" onSubmit={sendMessage}>
                <label className="visually-hidden" htmlFor="buyer-message-draft">Write a message</label>
                <input
                  id="buyer-message-draft"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Write a message..."
                />
                <Button className="buyer-composer__send" size="small" shape="rounded" type="submit" disabled={!draft.trim()}>
                  <span>Send</span><Send size={16} />
                </Button>
              </form>
            </>
          ) : conversations.length === 0 ? (
            <div className="buyer-empty-state">
              <span className="buyer-empty-state__icon"><MessageSquare size={27} strokeWidth={1.9} /></span>
              <h2>No messages yet</h2>
              <p>When you send an inquiry to an agent, the conversation shows up here.</p>
              <Button className="buyer-empty-state__button" onClick={() => navigate('/buyer/properties')}>
                Browse properties
              </Button>
            </div>
          ) : (
            <div className="buyer-empty-state">
              <span className="buyer-empty-state__icon"><MessageSquare size={27} strokeWidth={1.9} /></span>
              <h2>Select a conversation</h2>
              <p>Choose a conversation from the list to view messages with the agent.</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
