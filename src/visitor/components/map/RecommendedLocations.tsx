import { MapPin, MoveUpRight } from 'lucide-react';
import { getPublicProperties } from '../../libs/propertyData';
import './map.css';

export default function RecommendedLocations() {
  const propertiesByLocation = getPublicProperties().reduce((locations, property) => {
    locations.set(property.location, (locations.get(property.location) ?? 0) + 1);
    return locations;
  }, new Map<string, number>());
  const tones = ['makati', 'quezon', 'santarosa'];

  return (
    <section className="recommended-locations" aria-labelledby="locations-heading">
      <div className="visitor-section-heading">
        <div><p className="visitor-eyebrow">Explore your next neighborhood</p><h2 id="locations-heading">Popular locations</h2></div>
        <a href="#map">Explore map <MoveUpRight size={16} /></a>
      </div>
      <div className="location-grid" id="map">
        {[...propertiesByLocation].map(([name, count], index) => <a className={`location-card location-card--${tones[index % tones.length]}`} href={`/visitor/properties?q=${encodeURIComponent(name)}`} key={name}>
          <span className="location-card__pin"><MapPin size={18} /></span>
          <span><strong>{name}</strong><small>{count} {count === 1 ? 'home' : 'homes'} available</small></span>
          <MoveUpRight className="location-card__arrow" size={18} />
        </a>)}
      </div>
    </section>
  );
}
