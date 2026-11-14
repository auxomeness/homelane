import type { Property, ViewingRequest } from '../types.js';
import { formatPeso, getProperty } from '../utils.js';
import Icon from '../shared/Icon.js';
import StateMessage from '../shared/StateMessage.js';

// No database yet, so these start empty. Fill them from the API later.
const viewingRequests: ViewingRequest[] = [];
const properties: Property[] = [];

// Buyer's viewing requests. A request stays "Not confirmed" until the agent responds.
export default function Viewings() {
  return (
    <main className="discovery-page viewings-page">
      <h1 className="discovery-title">Viewing Requests</h1>

      {viewingRequests.length === 0 ? (
        <StateMessage title="No viewing requests yet." text="Request a viewing from a property to see it here." />
      ) : (
        <ul className="viewing-list">
          {viewingRequests.map((request) => {
            const property = getProperty(properties, request.propertyId);
            const confirmed = request.status === 'Confirmed';
            if (!property) return null;
            return (
              <li key={request.id} className="viewing-card">
                <div className="viewing-card__top">
                  <span className={`viewing-card__heading${confirmed ? ' is-large' : ''}`}>{request.heading}</span>
                  <span className={`viewing-status viewing-status--${confirmed ? 'confirmed' : 'pending'}`}>{request.status}</span>
                </div>
                <p className="viewing-card__property">{property.title} · Naga City</p>
                <p className="viewing-card__price">{formatPeso(property.price)}</p>
                <p className="viewing-card__line"><Icon name="calendar" size={18} /> Requested: {request.requested}</p>
                <p className="viewing-card__line"><Icon name="chat" size={18} /> {request.note ? `Your note: ${request.note}` : 'No note added'}</p>
                <p className={`viewing-card__banner${confirmed ? ' is-confirmed' : ''}`}>
                  <Icon name={confirmed ? 'check' : 'info'} size={18} />
                  <span>{confirmed ? 'Agent accepted your request. This viewing is confirmed.' : 'Not confirmed until the agent accepts your request.'}</span>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
