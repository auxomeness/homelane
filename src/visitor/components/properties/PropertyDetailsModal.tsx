import { useEffect } from 'react';
import { Bath, BedDouble, MapPin, Ruler, X } from 'lucide-react';
import type { Property } from '../../libs/propertyData';

type PropertyDetailsModalProps = { property: Property | null; onClose: () => void };

export default function PropertyDetailsModal({ property, onClose }: PropertyDetailsModalProps) {
  useEffect(() => {
    if (!property) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [property, onClose]);

  if (!property) return null;

  return (
    <div className="property-details__backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="property-details" role="dialog" aria-modal="true" aria-labelledby="property-details-title">
        <button className="property-details__close" type="button" aria-label="Close property details" onClick={onClose}><X size={20} /></button>
        <img src={property.image} alt={property.title} />
        <div className="property-details__content">
          <span className="property-card__tag">{property.type}</span>
          <h2 id="property-details-title">{property.title}</h2>
          <p className="property-details__location"><MapPin size={16} />{property.location}</p>
          <p className="property-details__price">₱{property.price.toLocaleString('en-PH')}</p>
          <div className="property-details__facts">
            <span><BedDouble size={17} /> {property.bedrooms} bedrooms</span>
            <span><Bath size={17} /> {property.bathrooms} bathrooms</span>
            <span><Ruler size={17} /> {property.area} m²</span>
          </div>
          <p className="property-details__description">{property.description}</p>
          <p className="property-details__demo-note">Public demo listing</p>
        </div>
      </section>
    </div>
  );
}
