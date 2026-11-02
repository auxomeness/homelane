import Button from '../../components/button.js';
import AgentHeader from '../shared/AgentHeader.js';
import type { AgentScreen } from '../shared/AgentNavigation.js';

interface AgentDashboardProps { onNavigate: (screen: AgentScreen) => void; }

const statusItems = [
  { value: '4', label: '₱ 19.2M', tone: 'active' },
  { value: '2', label: 'Pending', tone: 'pending' },
  { value: '1', label: '1 to Fix', tone: 'rejected' },
  { value: '0', label: 'Drafts', tone: 'inactive' },
];

export default function AgentDashboard({ onNavigate }: AgentDashboardProps) {
  return (
    <>
      <AgentHeader showRole />
      <main className="agent-dashboard">
        <section className="agent-profile-card" aria-label="Agent profile summary">
          <span className="agent-profile-card__avatar-wrap">
            <img className="agent-profile-card__avatar" src="/assets/figma/avatar.svg" alt="" />
            <span>SC</span>
          </span>
          <div className="agent-profile-card__identity">
            <strong>Shan Cruz, REB</strong>
            <span>PRC #0029182 | Naga City, PH</span>
          </div>
          <span className="agent-verified">VERIFIED</span>
        </section>

        <section className="agent-status-overview">
          <p className="agent-section-label">LISTING STATUS OVERVIEW</p>
          <h1>7 Total Managed Properties</h1>
          <div className="agent-status-overview__grid">
            {statusItems.map((item) => (
              <div className={`agent-status-cell is-${item.tone}`} key={item.label}>
                <strong>{item.value}</strong><span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="agent-dashboard__shortcuts">
          <Button className="agent-button agent-button--primary" size="small" shape="pill" onClick={() => onNavigate('addListing')}>+ Add Listing</Button>
          <Button className="agent-button agent-button--secondary" variant="secondary" size="small" shape="pill" onClick={() => onNavigate('listings')}>My Listings (7) &gt;</Button>
        </div>

        <section className="agent-action-card">
          <h2>ACTION REQUIRED</h2>
          <p>Residential Lot in Pacol • ₱ 2.95M</p>
          <Button className="agent-button agent-button--danger" size="small" shape="pill" fullWidth onClick={() => onNavigate('listings')}>Fix and Resubmit Form</Button>
        </section>

        <section className="agent-inquiries">
          <div className="agent-inquiries__heading">
            <h2>RECENT BUYER INQUIRIES</h2>
            <button type="button" onClick={() => onNavigate('listings')}>View All</button>
          </div>
          <article className="agent-inquiry">
            <strong>Elena Alano | San Felipe</strong><span>“Is Saturday viewing available?”</span><b>NEW</b>
          </article>
          <article className="agent-inquiry">
            <strong>Juan Dela Cruz | 3BR Villa</strong><span>“Is Saturday viewing available?”</span>
          </article>
        </section>
      </main>
    </>
  );
}
