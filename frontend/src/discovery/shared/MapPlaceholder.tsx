import type { Property } from '../types.js';
import { formatMillions } from '../utils.js';

interface MapPlaceholderProps {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// Visual map (no live map). Roads and parks are drawn, and each price pin is one property.
// Positions are rounded on purpose, so a pin marks an area and never an exact address.
export default function MapPlaceholder({ properties, selectedId, onSelect }: MapPlaceholderProps) {
  return (
    <div className="map-placeholder" role="group" aria-label="Map of Naga City with approximate property areas">
      <svg className="map-placeholder__art" viewBox="0 0 356 240" preserveAspectRatio="none" aria-hidden="true">
        <rect x="13" y="16" width="90" height="56" rx="8" fill="#d9ecde" />
        <rect x="233" y="161" width="100" height="62" rx="8" fill="#d9ecde" />
        <path d="M0 126 L356 66" stroke="#fff" strokeWidth="10" fill="none" />
        <path d="M113 0 L173 240" stroke="#fff" strokeWidth="8" fill="none" />
        <path d="M0 196 L356 176" stroke="#fff" strokeWidth="6" fill="none" />
      </svg>
      <span className="map-placeholder__label">Naga City</span>
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
          {formatMillions(property.price)}
        </button>
      ))}
    </div>
  );
}
