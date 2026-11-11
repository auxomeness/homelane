import { useState } from 'react';
import Button from '../../../components/button.js';
import AgentListingCard from '../../components/listings/AgentListingCard.js';
import { agentListings, type AgentListingStatus } from '../../libs/listData.js';
import type { AgentScreen } from '../../shared/AgentNavigation.js';
import './listingsStyles.css';

interface AgentListingsProps { onNavigate: (screen: AgentScreen) => void; }

const filters: { label: string; status: AgentListingStatus | 'all' }[] = [
  { label: 'All listings', status: 'all' },
  { label: 'Active', status: 'active' },
  { label: 'Pending', status: 'pending' },
  { label: 'Needs attention', status: 'rejected' },
];

export default function AgentListings({ onNavigate }: AgentListingsProps) {
  const [filter, setFilter] = useState<AgentListingStatus | 'all'>('all');
  const visibleListings = agentListings.filter((listing) => filter === 'all' || listing.status === filter);

  return (
    <main className="agent-listings">
      <div className="agent-page-heading">
        <div>
          <h1>My listings</h1>
          <p>Manage your properties and track their review status.</p>
        </div>
        <Button className="agent-button agent-button--primary" size="medium" onClick={() => onNavigate('addListing')}>
          + Add listing
        </Button>
      </div>

      <section className="agent-panel agent-listings-panel">
        <div className="agent-listings-panel__top">
          <div className="agent-listing-filters" aria-label="Filter listings">
            {filters.map((item) => (
              <button
                type="button"
                className={filter === item.status ? 'is-selected' : ''}
                aria-pressed={filter === item.status}
                key={item.status}
                onClick={() => setFilter(item.status)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p>{visibleListings.length} properties</p>
        </div>
        <div className="agent-listings-list">
          {visibleListings.map((listing) => (
            <AgentListingCard key={listing.id} listing={listing} onAction={() => onNavigate('addListing')} />
          ))}
        </div>
      </section>
    </main>
  );
}
