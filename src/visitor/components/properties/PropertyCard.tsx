import { Bath, BedDouble, Heart, MoveUpRight } from 'lucide-react';
import type { Property } from '../../libs/propertyData';
import './propertyCard.css';

type PropertyCardProps = {
  property: Property;
  saved?: boolean;
  onToggleSaved?: (propertyId: number) => void;
  onViewDetails?: (property: Property) => void;
};

export default function PropertyCard({ property, saved = false, onToggleSaved, onViewDetails }: PropertyCardProps) {
  return (
    <article className="property-card">
      <div className="property-card__image-wrap">
        <img className="property-card__image" src={property.image} alt={property.title} loading="lazy" />
        {property.tag && <span className="property-card__tag">{property.tag}</span>}
        <button
          className={`property-card__save${saved ? ' is-saved' : ''}`}
          type="button"
          aria-label={saved ? `Remove ${property.title} from saved homes` : `Save ${property.title}`}
          aria-pressed={saved}
          onClick={() => onToggleSaved?.(property.id)}
        ><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="property-card__content">
        <p className="property-card__location">{property.location}</p>
        <h3>{property.title}</h3>
        <p className="property-card__price">₱{property.price.toLocaleString('en-PH')}</p>
        <div className="property-card__details">
          <span><BedDouble size={17} /> {property.bedrooms} beds</span>
          <span><Bath size={17} /> {property.bathrooms} baths</span>
          <span>{property.area} m²</span>
          <button type="button" className="property-card__view" aria-label={`View details for ${property.title}`} onClick={() => onViewDetails?.(property)}><MoveUpRight size={17} /><span>Details</span></button>
        </div>
      </div>
    </article>
  );
}
