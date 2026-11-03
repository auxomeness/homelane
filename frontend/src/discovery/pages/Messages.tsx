import { useState } from 'react';
import { conversations, currentUser } from '../data/discoveryData.js';
import StateMessage from '../shared/StateMessage.js';
import ConversationList from './messages/ConversationList.js';
import ConversationView from './messages/ConversationView.js';

export default function Messages() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Only conversations the signed-in user takes part in are shown.
  const mine = conversations.filter((c) => c.participantIds.includes(currentUser.id));
  const active = mine.find((c) => c.id === activeId) ?? null;

  return (
    <main className={`discovery-page messages-page${active ? ' has-active' : ''}`}>
      <h1 className="discovery-title">Messages</h1>
      <p className="discovery-subtitle">Chat with agents about properties. Offers here are non-binding.</p>

      {mine.length === 0 ? (
        <StateMessage title="No conversations yet" text="Message an agent from a property to start a conversation." />
      ) : (
        <div className="messages-layout">
          <aside className="messages-layout__list">
            <ConversationList conversations={mine} activeId={activeId} viewerRole="buyer" onSelect={setActiveId} />
          </aside>
          <div className="messages-layout__view">
            {active ? (
              <ConversationView key={active.id} conversation={active} viewerId={currentUser.id} onBack={() => setActiveId(null)} />
            ) : (
              <StateMessage title="Select a conversation" text="Choose a conversation to read messages and offers." />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
