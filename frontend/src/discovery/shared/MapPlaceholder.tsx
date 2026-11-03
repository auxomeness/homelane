import type { Property } from '../data/discoveryData.js';

interface MapPlaceholderProps {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// Visual map placeholder (no live map). Each marker is one property and uses a
// rounded, approximate position, drawn as an area ring instead of an exact pin.
export default function MapPlaceholder({ properties, selectedId, onSelect }: MapPlaceholderProps) {
  return (
    <div className="map-placeholder" role="group" aria-label="Map of Naga City with approximate property areas">
      <span className="map-placeholder__label">MAP · Naga City</span>
      {properties.map((property) => (
        <button
          key={property.id}
          type="button"
          className={`map-pin${selectedId === property.id ? ' is-selected' : ''}`}
          style={{ left: `${property.pinX}%`, top: `${property.pinY}%` }}
          aria-label={`${property.title}, ${property.area}, approximate area`}
          aria-pressed={selectedId === property.id}
          onClick={() => onSelect(property.id)}
        >
          <span className="map-pin__ring" aria-hidden="true" />
          <span className="map-pin__price">₱{property.price / 1000000}M</span>
        </button>
      ))}
      <span className="map-placeholder__note">Approximate areas only. Exact addresses are hidden.</span>
    </div>
  );
}
