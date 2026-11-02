import { useState } from 'react';
import Button from '../../components/button.js';
import AgentHeader from '../shared/AgentHeader.js';
import type { AgentScreen } from '../shared/AgentNavigation.js';

interface AgentListingsProps { onNavigate: (screen: AgentScreen) => void; }
type ListingStatus = 'Active' | 'Pending' | 'Rejected';
const filters = ['All (7)', 'Active(4)', 'Pending (2)', 'Rejected (1)'];

export default function AgentListings({ onNavigate }: AgentListingsProps) {
  const [filter, setFilter] = useState('All (7)');
  const selectedStatus: ListingStatus | null = filter.startsWith('Active') ? 'Active' : filter.startsWith('Pending') ? 'Pending' : filter.startsWith('Rejected') ? 'Rejected' : null;

  return (
    <>
      <AgentHeader />
      <main className="agent-listings">
        <h1>My Property Listing</h1>
        <div className="agent-listing-filters" aria-label="Filter listings">
          {filters.map((item) => (
            <button type="button" className={filter === item ? 'is-selected' : ''} aria-pressed={filter === item} key={item} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>

        {(selectedStatus === null || selectedStatus === 'Active') && (
          <article className="agent-listing-card agent-listing-card--active">
            <div className="agent-listing-card__topline"><span className="agent-status-pill agent-status-pill--active">Active / Live</span><span className="agent-listing-card__map-label">Live on Map</span></div>
            <h2>3BR Villa in Concepcion Pequeña</h2><p className="agent-listing-card__price">₱ 8,500,000</p>
            <div className="agent-listing-card__actions">
              <Button className="agent-button agent-button--primary" size="small" shape="pill" onClick={() => onNavigate('dashboard')}>View Live</Button>
              <Button className="agent-button agent-button--secondary" variant="secondary" size="small" shape="pill" onClick={() => onNavigate('addListing')}>Edit</Button>
            </div>
          </article>
        )}

        {(selectedStatus === null || selectedStatus === 'Pending') && (
          <article className="agent-listing-card agent-listing-card--pending">
            <span className="agent-status-pill agent-status-pill--pending">Pending Review</span>
            <h2>2BR Condo in Magsaysay Avenue</h2><p className="agent-listing-card__price">₱ 6,200,000</p>
            <p className="agent-listing-card__caption">Queued for Admin Review</p>
            <Button className="agent-button agent-button--secondary agent-listing-card__wide-action" variant="secondary" size="small" shape="pill" onClick={() => onNavigate('addListing')}>Preview Draft</Button>
          </article>
        )}

        {(selectedStatus === null || selectedStatus === 'Rejected') && (
          <article className="agent-listing-card agent-listing-card--rejected">
            <div className="agent-listing-card__topline"><span className="agent-status-pill agent-status-pill--rejected">Rejected</span><span className="agent-listing-card__required">ACTION REQUIRED</span></div>
            <h2>Residential Lot in Pacol</h2><p className="agent-listing-card__price">₱ 2,950,000</p>
            <div className="agent-feedback"><strong>Admin Feedback:</strong><p>“Exact pin selected on unpartitioned lot. Change to Approximate Area.”</p></div>
            <Button className="agent-button agent-button--danger" size="small" shape="pill" fullWidth onClick={() => onNavigate('addListing')}>Edit and Resubmit</Button>
          </article>
        )}
      </main>
    </>
  );
}
