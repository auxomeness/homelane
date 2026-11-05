import { useState } from 'react';
import Button from '../../components/button.js';
import { conversations, currentUser } from '../data/discoveryData.js';
import type { DiscoveryScreen } from '../shared/DiscoveryNavigation.js';
import StateMessage from '../shared/StateMessage.js';
import ConversationList from './messages/ConversationList.js';
import ConversationView from './messages/ConversationView.js';

interface MessagesProps {
  onNavigate: (screen: DiscoveryScreen) => void;
}

export default function Messages({ onNavigate }: MessagesProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  // Only conversations the signed-in user takes part in are shown.
  const mine = conversations.filter((c) => c.participantIds.includes(currentUser.id));
  const visible = mine.filter((c) => filter === 'All' || c.unread > 0);
  const active = mine.find((c) => c.id === activeId) ?? null;

  return (
    <main className={`discovery-page messages-page${active ? ' has-active' : ''}`}>
      <h1 className="messages-title">Messages</h1>

      {mine.length === 0 ? (
        <StateMessage
          icon="chat"
          title="No messages yet"
          text="When you send an inquiry to an agent, the conversation shows up here."
        >
          <Button className="state-message__button" onClick={() => onNavigate('properties')}>Browse properties</Button>
        </StateMessage>
      ) : (
        <>
          <div className="message-filters" role="group" aria-label="Filter conversations">
            {(['All', 'Unread'] as const).map((name) => (
              <button
                key={name}
                type="button"
                className={`message-filter${filter === name ? ' is-active' : ''}`}
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="messages-layout">
            <aside className="messages-layout__list">
              {visible.length === 0 ? (
                <StateMessage icon="chat" title="No unread messages" text="You're all caught up." />
              ) : (
                <ConversationList conversations={visible} activeId={activeId} viewerRole="buyer" viewerId={currentUser.id} onSelect={setActiveId} />
              )}
            </aside>
            <div className="messages-layout__view">
              {active ? (
                <ConversationView key={active.id} conversation={active} viewerId={currentUser.id} onBack={() => setActiveId(null)} />
              ) : (
                <StateMessage icon="chat" title="Select a conversation" text="Choose a conversation to read messages and offers." />
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
