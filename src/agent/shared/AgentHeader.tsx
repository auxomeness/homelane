import { useState } from 'react';
import { BellDot, CircleUser, MessageCircleText } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAgentData } from '../libs/AgentDataContext.js';

type HeaderPanel = 'notifications' | 'profile' | null;

export default function AgentHeader() {
  const [panel, setPanel] = useState<HeaderPanel>(null);
  const { inquiries, profile } = useAgentData();
  const navigate = useNavigate();
  const unread = inquiries.filter((inquiry) => inquiry.status === 'new').length;

  return (
    <header className="agent-header">
      <h2 className="agent-header__brand">HOMELANE</h2>
      <div className="agent-header__right">
        <span className="agent-header__role">Agent</span>
        <div className="agent-header__actions" aria-label="Account shortcuts">
          <div className="agent-header__menu-wrap">
            <button type="button" aria-label="Notifications" aria-expanded={panel === 'notifications'} onClick={() => setPanel(panel === 'notifications' ? null : 'notifications')}>
              <BellDot size={23} />{unread > 0 && <span className="agent-header__badge">{unread}</span>}
            </button>
            {panel === 'notifications' && (
              <section className="agent-header__popover" aria-label="Notifications">
                <h3>Notifications</h3>
                {unread > 0 ? <p>You have {unread} new buyer {unread === 1 ? 'inquiry' : 'inquiries'}.</p> : <p>You’re all caught up.</p>}
                <button type="button" onClick={() => { setPanel(null); navigate('/agent/inquiries'); }}>View inquiries</button>
              </section>
            )}
          </div>
          <button type="button" aria-label="Messages" onClick={() => navigate('/agent/messages')}><MessageCircleText size={23} /></button>
          <div className="agent-header__menu-wrap">
            <button type="button" aria-label="Profile" aria-expanded={panel === 'profile'} onClick={() => setPanel(panel === 'profile' ? null : 'profile')}>
              <CircleUser size={23} />
            </button>
            {panel === 'profile' && (
              <section className="agent-header__popover" aria-label="Agent profile menu">
                <h3>{profile.name}</h3>
                <p>{profile.credential} · {profile.city}</p>
                <button type="button" onClick={() => { setPanel(null); navigate('/agent/profile'); }}>Edit profile</button>
              </section>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
