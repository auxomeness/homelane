import { useState } from 'react';
import Button from '../../../components/button.js';
import type { AgentScreen } from '../../shared/AgentNavigation.js';
import './addListingStyles.css';

interface AgentAddListingProps { onNavigate: (screen: AgentScreen) => void; }
const propertyTypes = ['House', 'Condo', 'Townhouse', 'Lot'];

export default function AgentAddListing({ onNavigate }: AgentAddListingProps) {
  const [propertyType, setPropertyType] = useState('House');

  return (
    <main className="agent-add-listing">
      <div className="agent-page-heading">
        <div>
          <h1>Add property listing</h1>
          <p>Share the details buyers need to find their next home.</p>
        </div>
        <Button className="agent-button agent-button--secondary" variant="secondary" onClick={() => onNavigate('listings')}>
          Cancel
        </Button>
      </div>

      <div className="agent-add-listing__form">
        <section className="agent-form-section agent-form-photo">
          <button className="agent-photo-upload" type="button">
            <span className="agent-photo-upload__icon">＋</span>
            <strong>Add property photos</strong>
            <span>Upload clear images of the property</span>
          </button>
        </section>

        <section className="agent-form-section agent-form-property-type">
          <h2>Property details</h2>
          <label className="agent-field-label">Property type</label>
          <div className="agent-property-types" role="group" aria-label="Property type">
            {propertyTypes.map((type) => (
              <button type="button" className={propertyType === type ? 'is-selected' : ''} aria-pressed={propertyType === type} key={type} onClick={() => setPropertyType(type)}>
                {type}
              </button>
            ))}
          </div>
          <label className="agent-field-label" htmlFor="listing-price">Price in PHP</label>
          <input id="listing-price" className="agent-form-input" value="₱ 9,000,000" readOnly />
          <label className="agent-field-label" htmlFor="listing-location">Location</label>
          <input id="listing-location" className="agent-form-input" value="Concepcion Pequeña, Naga City" readOnly />
        </section>

        <section className="agent-form-section agent-form-description">
          <h2>Listing information</h2>
          <label className="agent-field-label" htmlFor="listing-title">Listing title</label>
          <input id="listing-title" className="agent-form-input" value="Modern 3BR Villa with Garden" readOnly />
          <label className="agent-field-label" htmlFor="listing-description">Description</label>
          <textarea id="listing-description" className="agent-form-textarea" value="Spacious two-storey residence in a secure gated community in Concepcion Pequeña, Naga City..." readOnly />
        </section>

        <section className="agent-form-section agent-form-facts">
          <h2>Property facts</h2>
          <div className="agent-property-facts">
            <div><strong>3</strong><span>Bedrooms</span></div>
            <div><strong>2</strong><span>Bathrooms</span></div>
            <div><strong>165 m²</strong><span>Floor area</span></div>
          </div>
        </section>

        <Button className="agent-button agent-button--primary agent-add-listing__next" size="medium" fullWidth>
          Continue to map and preview
        </Button>
      </div>
    </main>
  );
}
