import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../components/button.js';
import AgentListingCard from '../../components/listings/AgentListingCard.js';
import { useAgentData } from '../../libs/AgentDataContext.js';
import type { AgentListingStatus } from '../../libs/listData.js';
import './listingsStyles.css';

const filters: { label: string; status: AgentListingStatus | 'all' }[] = [
  { label: 'All listings', status: 'all' },
  { label: 'Drafts', status: 'draft' },
  { label: 'Active', status: 'active' },
  { label: 'Pending', status: 'pending' },
  { label: 'Needs attention', status: 'rejected' },
];

export default function AgentListings() {
  const navigate = useNavigate();
  const { listings } = useAgentData();
  const [filter, setFilter] = useState<AgentListingStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const filteredListings = useMemo(() => listings.filter((listing) => filter === 'all' || listing.status === filter), [filter, listings]);
  const pageCount = Math.max(1, Math.ceil(filteredListings.length / pageSize));
  const visibleListings = filteredListings.slice((page - 1) * pageSize, page * pageSize);

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
                onClick={() => { setFilter(item.status); setPage(1); }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p>{filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'}</p>
        </div>
        <div className="agent-listings-list">
          {visibleListings.map((listing) => (
            <AgentListingCard key={listing.id} listing={listing} onAction={() => navigate(`/agent/my-listings/${listing.id}`)} />
          ))}
          {!visibleListings.length && <p className="agent-empty-state">No {filter === 'all' ? 'listings' : `${filter} listings`} yet.</p>}
        </div>
        {pageCount > 1 && <nav className="agent-pagination" aria-label="Listing pages"><button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {pageCount}</span><button type="button" disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</button></nav>}
      </section>
    </main>
  );
}
