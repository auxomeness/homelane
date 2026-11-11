import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../components/button.js';
import AgentListingCard from '../../components/listings/AgentListingCard.js';
import { agentListings, type AgentListingStatus } from '../../libs/listData.js';
import './listingsStyles.css';

const filters: { label: string; status: AgentListingStatus | 'all' }[] = [
  { label: 'All listings', status: 'all' },
  { label: 'Active', status: 'active' },
  { label: 'Pending', status: 'pending' },
  { label: 'Needs attention', status: 'rejected' },
];

export default function AgentListings() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<AgentListingStatus | 'all'>('all');
  const visibleListings = agentListings.filter((listing) => filter === 'all' || listing.status === filter);

  return (
    <main className="agent-listings">
      <div className="agent-page-heading">
        <div>
          <h1>My listings</h1>
          <p>Manage your properties and track their review status.</p>
        </div>
        <Button className="agent-button agent-button--primary" size="medium" onClick={() => navigate('/agent/add-listings')}>
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
            <AgentListingCard key={listing.id} listing={listing} onAction={() => navigate('/agent/add-listings')} />
          ))}
        </div>
      </section>
    </main>
  );
}
