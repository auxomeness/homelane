import { MapPin } from 'lucide-react';
import Button from '../../../components/button.js';
import type { AgentListingData } from '../../libs/listData.js';
import './listingCard.css';

interface AgentListingCardProps {
  listing: AgentListingData;
  onAction: () => void;
}

export default function AgentListingCard({ listing, onAction }: AgentListingCardProps) {
  return (
    <article className="agent-listing-row">
      <div className={`agent-listing-row__thumb is-${listing.status}`} aria-hidden="true" />
      <div className="agent-listing-row__details">
        <div className="agent-listing-row__title-line">
          <h2>{listing.title}</h2>
          <span className={`agent-status-pill agent-status-pill--${listing.status}`}>{listing.statusLabel}</span>
        </div>
        <p className="agent-listing-row__location"><MapPin size={15} />{listing.location}</p>
        <p className="agent-listing-row__price">{listing.price}</p>
      </div>
      <Button className="agent-button agent-listing-row__action" variant="secondary" size="small" onClick={onAction}>
        {listing.actionLabel}
      </Button>
    </article>
  );
}
