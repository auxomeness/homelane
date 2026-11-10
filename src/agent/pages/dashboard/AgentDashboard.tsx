import { ArrowRight, CircleAlert, Clock3, House, Layers3 } from 'lucide-react';
import Button from '../../../components/button.js';
import AgentMetricCard from '../../components/dashboard/AgentMetricCard.js';
import AgentListingCard from '../../components/listings/AgentListingCard.js';
import { agentListings } from '../../libs/listData.js';
import type { AgentScreen } from '../../shared/AgentNavigation.js';
import './dashboardStyles.css';

interface AgentDashboardProps { onNavigate: (screen: AgentScreen) => void; }

const metrics = [
  { label: 'Managed properties', value: '7', detail: 'Across your portfolio', icon: Layers3 },
  { label: 'Active listings', value: '4', detail: '₱ 19.2M total value', icon: House },
  { label: 'Pending review', value: '2', detail: 'Awaiting admin review', icon: Clock3 },
  { label: 'Needs attention', value: '1', detail: 'Update and resubmit', icon: CircleAlert },
];

export default function AgentDashboard({ onNavigate }: AgentDashboardProps) {
  return (
    <main className="agent-dashboard">
      <div className="agent-page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>An overview of your property listings and buyer inquiries.</p>
        </div>
        <Button className="agent-button agent-button--primary" size="medium" onClick={() => onNavigate('addListing')}>
          + Add listing
        </Button>
      </div>

      <section className="agent-profile-card" aria-label="Agent profile summary">
        <img src="/assets/figma/avatar.svg" alt="" />
        <div className="agent-profile-card__identity">
          <h2>Shan Cruz, REB</h2>
          <p>PRC #0029182 <span>·</span> Naga City, PH</p>
        </div>
        <span className="agent-profile-card__verified">Verified agent</span>
      </section>

      <section className="agent-metrics" aria-label="Listing metrics">
        {metrics.map((metric) => <AgentMetricCard key={metric.label} {...metric} />)}
      </section>

      <div className="agent-dashboard-grid">
        <section className="agent-panel agent-dashboard-listings">
          <div className="agent-panel__heading">
            <div>
              <h2>Listing activity</h2>
              <p>Recent updates across your properties</p>
            </div>
            <button type="button" className="agent-text-action" onClick={() => onNavigate('listings')}>
              View all <ArrowRight size={16} />
            </button>
          </div>
          <div className="agent-dashboard-listings__items">
            {agentListings.map((listing) => (
              <AgentListingCard key={listing.id} listing={listing} onAction={() => onNavigate('listings')} />
            ))}
          </div>
        </section>

        <section className="agent-panel agent-inquiries">
          <div className="agent-panel__heading">
            <div>
              <h2>Recent buyer inquiries</h2>
              <p>Follow up with interested buyers</p>
            </div>
            <button type="button" className="agent-text-action" onClick={() => onNavigate('listings')}>
              View all <ArrowRight size={16} />
            </button>
          </div>
          <article className="agent-inquiry">
            <div className="agent-inquiry__avatar">EA</div>
            <div><h3>Elena Alano</h3><p>San Felipe · “Is Saturday viewing available?”</p></div>
            <span className="agent-inquiry__new">New</span>
          </article>
          <article className="agent-inquiry">
            <div className="agent-inquiry__avatar">JD</div>
            <div><h3>Juan Dela Cruz</h3><p>3BR Villa · “Can I see the floor plan?”</p></div>
          </article>
        </section>
      </div>
    </main>
  );
}
