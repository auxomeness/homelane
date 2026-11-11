import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, CalendarDays, MapPin, Send } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import Button from '../../../components/button.js';
import { useAgentData } from '../../libs/AgentDataContext.js';
import './workspaceStyles.css';

const upcomingViewings = [
  { id: 'viewing-1', buyer: 'Elena Alano', listing: '3BR Villa in Concepcion Pequeña', date: 'Saturday, 10:00 AM', location: 'Concepcion Pequeña, Naga City' },
  { id: 'viewing-2', buyer: 'Paolo Reyes', listing: '2BR Condo on Magsaysay Avenue', date: 'Monday, 2:30 PM', location: 'Magsaysay Avenue, Naga City' },
];

export default function AgentWorkspacePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { listings, inquiries, profile, updateProfile, markInquiryRead, replyToInquiry } = useAgentData();
  const section = location.pathname.split('/').at(-1) ?? '';
  const selectedInquiryId = new URLSearchParams(location.search).get('inquiry');
  const [activeInquiryId, setActiveInquiryId] = useState(selectedInquiryId ?? inquiries[0]?.id ?? '');
  const [reply, setReply] = useState('');
  const [profileForm, setProfileForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (selectedInquiryId) setActiveInquiryId(selectedInquiryId);
  }, [selectedInquiryId]);

  useEffect(() => {
    const current = inquiries.find((inquiry) => inquiry.id === activeInquiryId);
    if ((section === 'messages' || section === 'inquiries') && current?.status === 'new') markInquiryRead(current.id);
  }, [activeInquiryId, inquiries, markInquiryRead, section]);

  useEffect(() => setProfileForm(profile), [profile]);

  const activeInquiry = inquiries.find((inquiry) => inquiry.id === activeInquiryId) ?? inquiries[0];

  const submitReply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeInquiry || !reply.trim()) return;
    replyToInquiry(activeInquiry.id, reply.trim());
    setReply('');
  };

  const submitProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(profileForm);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  if (section === 'viewings') return (
    <main className="agent-workspace-page">
      <div className="agent-page-heading"><div><h1>Viewings</h1><p>Upcoming property visits with interested buyers.</p></div></div>
      {upcomingViewings.length ? <div className="agent-workspace-list">{upcomingViewings.map((viewing) => (
        <article className="agent-panel agent-workspace-card" key={viewing.id}>
          <div className="agent-workspace-card__icon"><CalendarDays size={21} /></div>
          <div className="agent-workspace-card__body"><h2>{viewing.buyer}</h2><p>{viewing.listing}</p><span>{viewing.date}</span><small><MapPin size={14} />{viewing.location}</small></div>
          <Button className="agent-button agent-button--secondary" variant="secondary" size="small" onClick={() => navigate(`/agent/messages?inquiry=${encodeURIComponent(viewing.buyer === 'Elena Alano' ? 'inquiry-elena' : 'inquiry-juan')}`)}>Message buyer</Button>
        </article>
      ))}</div> : <p className="agent-empty-state">No upcoming viewings.</p>}
    </main>
  );

  if (section === 'messages' || section === 'inquiries') return (
    <main className="agent-workspace-page">
      <div className="agent-page-heading"><div><h1>{section === 'messages' ? 'Messages' : 'Buyer inquiries'}</h1><p>Keep conversations with interested buyers in one place.</p></div></div>
      {inquiries.length ? <div className="agent-messages-layout">
        <div className="agent-panel agent-message-list" aria-label="Buyer conversations">
          {inquiries.map((inquiry) => (
            <button type="button" className={`agent-message-list__item${activeInquiry?.id === inquiry.id ? ' is-active' : ''}`} key={inquiry.id} onClick={() => { setActiveInquiryId(inquiry.id); markInquiryRead(inquiry.id); }}>
              <span className="agent-inquiry__avatar">{inquiry.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
              <span><strong>{inquiry.name}</strong><small>{inquiry.message}</small></span>
              {inquiry.status === 'new' && <i aria-label="Unread" />}
            </button>
          ))}
        </div>
        {activeInquiry && <section className="agent-panel agent-message-thread">
          <header><div><h2>{activeInquiry.name}</h2><p>Regarding {activeInquiry.property}</p></div><span>{activeInquiry.time}</span></header>
          <div className="agent-message-thread__conversation"><article className="agent-message-bubble"><p>{activeInquiry.message}</p><small>{activeInquiry.time}</small></article>{activeInquiry.replies?.map((message, index) => <article className="agent-message-bubble agent-message-bubble--outgoing" key={`${activeInquiry.id}-reply-${index}`}><p>{message}</p><small>You · just now</small></article>)}</div>
          <form onSubmit={submitReply}><label className="agent-sr-only" htmlFor="agent-reply">Write a reply</label><textarea id="agent-reply" value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write a reply…" required /><button className="agent-send-button" type="submit" aria-label="Send reply"><Send size={18} /></button></form>
        </section>}
      </div> : <p className="agent-empty-state">No buyer inquiries yet.</p>}
    </main>
  );

  if (section === 'activity') return (
    <main className="agent-workspace-page">
      <div className="agent-page-heading"><div><h1>Listing activity</h1><p>Recent updates across your properties.</p></div><Button className="agent-button agent-button--primary" size="medium" onClick={() => navigate('/agent/my-listings')}>Manage listings</Button></div>
      <div className="agent-panel agent-activity-list">
        {listings.length ? listings.map((listing) => <button key={listing.id} type="button" onClick={() => navigate(`/agent/my-listings/${listing.id}`)}><span className={`agent-status-pill agent-status-pill--${listing.status}`}>{listing.statusLabel}</span><span><strong>{listing.title}</strong><small>{listing.location}</small></span><ArrowRight size={18} /></button>) : <p className="agent-empty-state">No listing activity yet. Create your first listing to get started.</p>}
      </div>
    </main>
  );

  if (section === 'profile') return (
    <main className="agent-workspace-page">
      <div className="agent-page-heading"><div><h1>Agent profile</h1><p>Update the information shown to Homelane buyers.</p></div></div>
      <form className="agent-panel agent-profile-form" onSubmit={submitProfile}>
        <label>Full name<input value={profileForm.name} required onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} /></label>
        <label>License / credential<input value={profileForm.credential} required onChange={(event) => setProfileForm({ ...profileForm, credential: event.target.value })} /></label>
        <label>City and region<input value={profileForm.city} required onChange={(event) => setProfileForm({ ...profileForm, city: event.target.value })} /></label>
        <div><Button className="agent-button agent-button--primary" size="medium" type="submit">Save profile</Button>{saved && <span role="status">Profile saved.</span>}</div>
      </form>
    </main>
  );

  return <main className="agent-workspace-page"><p className="agent-empty-state">This workspace page could not be found.</p><Button className="agent-button agent-button--secondary" variant="secondary" onClick={() => navigate('/agent/dashboard')}>Back to dashboard</Button></main>;
}
