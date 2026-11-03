import { formatPrice, type OfferStatus } from '../data/discoveryData.js';

interface OfferCardProps {
  kind: 'offer' | 'counteroffer';
  amount: number;
  status: OfferStatus;
  note?: string;
  /** True when the signed-in user sent this card. */
  mine?: boolean;
}

// Shows an offer or counteroffer inside a conversation. Always labelled non-binding.
export default function OfferCard({ kind, amount, status, note, mine = false }: OfferCardProps) {
  return (
    <div className={`offer-card offer-card--${kind}${mine ? ' is-mine' : ''}`}>
      <div className="offer-card__top">
        <strong>{kind === 'offer' ? 'Offer' : 'Counteroffer'}</strong>
        <span className={`status-pill status-pill--${status.toLowerCase()}`}>{status}</span>
      </div>
      <p className="offer-card__amount">{formatPrice(amount)}</p>
      {note && <p className="offer-card__note">{note}</p>}
      <p className="offer-card__disclaimer">Non-binding offer · Not a commitment.</p>
    </div>
  );
}
