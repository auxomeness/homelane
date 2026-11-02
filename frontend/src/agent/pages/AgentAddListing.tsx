import { useState } from 'react';
import Button from '../../components/button.js';
import type { AgentScreen } from '../shared/AgentNavigation.js';

interface AgentAddListingProps { onNavigate: (screen: AgentScreen) => void; }
const propertyTypes = ['House', 'Condo', 'Townhouse', 'Lot'];

export default function AgentAddListing({ onNavigate }: AgentAddListingProps) {
  const [propertyType, setPropertyType] = useState('House');

  return (
    <main className="agent-add-listing">
      <div className="agent-add-listing__titlebar">
        <button type="button" aria-label="Back to listings" onClick={() => onNavigate('listings')}>←</button>
        <h1>Add Property Listing</h1>
      </div>
      <section className="agent-form-section agent-form-photo"><button className="agent-photo-upload" type="button">PHOTO TO UPLOAD</button></section>
      <section className="agent-form-section agent-form-property-type">
        <label className="agent-field-label">PROPERTY TYPE</label>
        <div className="agent-property-types" role="group" aria-label="Property type">
          {propertyTypes.map((type) => <button type="button" className={propertyType === type ? 'is-selected' : ''} aria-pressed={propertyType === type} key={type} onClick={() => setPropertyType(type)}>{type}</button>)}
        </div>
        <span className="agent-inquired-property">Inquired Property</span>
        <label className="agent-field-label agent-price-label" htmlFor="listing-price">PRICE IN PHP (₱)</label>
        <input id="listing-price" className="agent-form-input" value="₱ 9,000,000" readOnly />
      </section>
      <section className="agent-form-section agent-form-description">
        <label className="agent-field-label" htmlFor="listing-title">LISTING TITLE</label>
        <input id="listing-title" className="agent-form-input" value="Modern 3BR Villa with Garden" readOnly />
        <label className="agent-field-label" htmlFor="listing-description">DESCRIPTION</label>
        <textarea id="listing-description" className="agent-form-textarea" value="Spacious two-storey residence in a secure gated community in Concepcion Pequeña, Naga City..." readOnly />
      </section>
      <section className="agent-form-section agent-form-facts">
        <h2 className="agent-field-label">PROPERTY FACTS</h2>
        <div className="agent-property-facts">
          <div><strong>3</strong><span>Beds</span></div><div><strong>2</strong><span>Baths</span></div><div className="is-muted"><strong>165 m²</strong><span>Floor Area</span></div>
        </div>
      </section>
      <Button className="agent-button agent-button--primary agent-add-listing__next" size="small" shape="pill" fullWidth>NEXT: MAP PRECISION &amp; PREVIEW</Button>
    </main>
  );
}
