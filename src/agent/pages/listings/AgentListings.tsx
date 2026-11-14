import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import Button from '../../../components/button.js';
import AgentListingCard from '../../components/listings/AgentListingCard.js';
import { useAgentData } from '../../libs/AgentDataContext.js';
import type { AgentListingStatus } from '../../libs/listData.js';
import PriceRangeSelect from '../../../shared/maps/PriceRangeSelect.js';
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
  const [params, setParams] = useSearchParams();
  const { listings, loading, error, reload } = useAgentData();
  const filter = (params.get('status') ?? 'all') as AgentListingStatus | 'all';
  const search = params.get('q') ?? ''; const type = params.get('type') ?? 'all'; const min = params.get('min') ?? ''; const max = params.get('max') ?? '';
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [filter, max, min, search, type]);
  const pageSize = 6;
  const setParam = (key: string, value: string) => setParams((old) => { const next = new URLSearchParams(old); if (value) next.set(key, value); else next.delete(key); return next; }, { replace: true });
  const setPriceRange = (min: string, max: string) => setParams((old) => { const next = new URLSearchParams(old); min ? next.set('min', min) : next.delete('min'); max ? next.set('max', max) : next.delete('max'); return next; }, { replace: true });
  const filteredListings = useMemo(() => listings.filter((listing) => (filter === 'all' || listing.status === filter) && `${listing.title} ${listing.location}`.toLowerCase().includes(search.trim().toLowerCase()) && (type === 'all' || (listing.propertyType ?? 'House').toLowerCase() === type.toLowerCase()) && (!min || Number(listing.price.replace(/[^\d.]/g, '')) >= Number(min)) && (!max || Number(listing.price.replace(/[^\d.]/g, '')) <= Number(max))), [filter, listings, max, min, search, type]);
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
                onClick={() => { setParam('status', item.status === 'all' ? '' : item.status); setPage(1); }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p>{filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'}</p>
        </div>
        <div className="agent-listing-view-switch" role="group" aria-label="Listing view"><button type="button" aria-pressed="true">List view</button><Link to={`/agent/map${params.size ? `?${params}` : ''}`}>Map view</Link></div>
        <div className="agent-listing-filters agent-listing-filters--fields"><label>Search<input value={search} onChange={(event) => setParam('q', event.target.value)} placeholder="Title or location" /></label><label>Property type<select value={type} onChange={(event) => setParam('type', event.target.value === 'all' ? '' : event.target.value)}><option value="all">All types</option>{['House','Condo','Townhouse','Lot'].map((item) => <option key={item}>{item}</option>)}</select></label><PriceRangeSelect min={min} max={max} onChange={setPriceRange} /></div>
        {error && <p role="alert" className="agent-empty-state">{error} <button type="button" onClick={() => void reload()}>Retry</button></p>}
        {loading && <p className="agent-empty-state">Loading your listings…</p>}
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
