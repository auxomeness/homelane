import './BuyerMap.css';
import { useMemo, useState, type ChangeEvent } from 'react';
import { ChevronRight, MapPin, Search, X } from 'lucide-react';

type MapLocation = {
  id: string;
  name: string;
  homes: number;
  fromPrice: number;
  propertyType: 'House' | 'Condo' | 'Townhouse';
  bedrooms: number;
};

type PriceFilter = 'any' | 'under-3m' | '3m-6m' | 'over-6m';
type TypeFilter = 'all' | MapLocation['propertyType'];
type BedsFilter = 'any' | '1+' | '2+' | '3+';

const locations: MapLocation[] = [
  { id: 'pacol', name: 'Pacol', homes: 14, fromPrice: 3_200_000, propertyType: 'House', bedrooms: 3 },
  { id: 'concepcion', name: 'Concepcion Pequeña', homes: 9, fromPrice: 2_400_000, propertyType: 'Townhouse', bedrooms: 2 },
  { id: 'triangulo', name: 'Triangulo', homes: 6, fromPrice: 3_600_000, propertyType: 'Condo', bedrooms: 2 },
];

const mapPins = [
  { label: '₱8.5M', position: 'west' },
  { label: '₱5.2M', position: 'north' },
  { label: '₱11.9M', position: 'center' },
  { label: '₱2.4M', position: 'east' },
];

function formatPrice(price: number) {
  return `₱${(price / 1_000_000).toFixed(1)}M`;
}

export default function BuyerMap() {
  const [locationQuery, setLocationQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('any');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [bedsFilter, setBedsFilter] = useState<BedsFilter>('any');
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const filteredLocations = useMemo(() => locations.filter((location) => {
    const matchesName = location.name.toLowerCase().includes(locationQuery.trim().toLowerCase());
    const matchesType = typeFilter === 'all' || location.propertyType === typeFilter;
    const matchesBeds = bedsFilter === 'any' || location.bedrooms >= Number.parseInt(bedsFilter, 10);
    const matchesPrice = priceFilter === 'any'
      || (priceFilter === 'under-3m' && location.fromPrice < 3_000_000)
      || (priceFilter === '3m-6m' && location.fromPrice >= 3_000_000 && location.fromPrice <= 6_000_000)
      || (priceFilter === 'over-6m' && location.fromPrice > 6_000_000);

    return matchesName && matchesType && matchesBeds && matchesPrice;
  }), [locationQuery, priceFilter, typeFilter, bedsFilter]);

  const handlePriceChange = (event: ChangeEvent<HTMLSelectElement>) => setPriceFilter(event.target.value as PriceFilter);
  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => setTypeFilter(event.target.value as TypeFilter);
  const handleBedsChange = (event: ChangeEvent<HTMLSelectElement>) => setBedsFilter(event.target.value as BedsFilter);

  const clearSearch = () => {
    setLocationQuery('');
    setPriceFilter('any');
    setTypeFilter('all');
    setBedsFilter('any');
    setSelectedLocationId(null);
  };

  return (
    <section className="buyer-map-page" aria-labelledby="buyer-map-title">
      <div className="buyer-map-page__heading">
        <h1 id="buyer-map-title">MAP</h1>
      </div>

      <div className="buyer-map-page__layout">
        <div className="buyer-map-preview" role="img" aria-label="Illustrative map preview of Naga City with sample home prices.">
          <span className="buyer-map-preview__park buyer-map-preview__park--north" />
          <span className="buyer-map-preview__park buyer-map-preview__park--southeast" />
          <span className="buyer-map-preview__road buyer-map-preview__road--diagonal" />
          <span className="buyer-map-preview__road buyer-map-preview__road--cross" />
          <span className="buyer-map-preview__road buyer-map-preview__road--east" />
          <span className="buyer-map-preview__city">Naga City</span>
          {mapPins.map((pin) => (
            <span className={`buyer-map-preview__pin buyer-map-preview__pin--${pin.position}`} key={pin.label}>{pin.label}</span>
          ))}
        </div>

        <div className="buyer-map-results">
          <div className="buyer-map-results__controls">
            <label className="buyer-map-search">
              <span>Location</span>
              <span className="buyer-map-search__field">
                <Search size={16} aria-hidden="true" />
                <input
                  type="search"
                  value={locationQuery}
                  onChange={(event) => {
                    setLocationQuery(event.target.value);
                    setSelectedLocationId(null);
                  }}
                  placeholder="City, neighborhood, or ZIP"
                  aria-label="Search by city, neighborhood, or ZIP"
                />
                {locationQuery && (
                  <button className="buyer-map-search__clear" type="button" aria-label="Clear location search" onClick={() => {
                    setLocationQuery('');
                    setSelectedLocationId(null);
                  }}>
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
              </span>
            </label>

            <div className="buyer-map-filters" aria-label="Filter homes">
              <label className="buyer-map-filter">
                <span className="visually-hidden">Price</span>
                <select value={priceFilter} onChange={handlePriceChange} aria-label="Filter by price">
                  <option value="any">Any price</option>
                  <option value="under-3m">Under ₱3M</option>
                  <option value="3m-6m">₱3M–₱6M</option>
                  <option value="over-6m">Over ₱6M</option>
                </select>
              </label>
              <label className="buyer-map-filter">
                <span className="visually-hidden">Home type</span>
                <select value={typeFilter} onChange={handleTypeChange} aria-label="Filter by home type">
                  <option value="all">All types</option>
                  <option value="House">Houses</option>
                  <option value="Condo">Condos</option>
                  <option value="Townhouse">Townhouses</option>
                </select>
              </label>
              <label className="buyer-map-filter">
                <span className="visually-hidden">Bedrooms</span>
                <select value={bedsFilter} onChange={handleBedsChange} aria-label="Filter by bedrooms">
                  <option value="any">Any beds</option>
                  <option value="1+">1+ beds</option>
                  <option value="2+">2+ beds</option>
                  <option value="3+">3+ beds</option>
                </select>
              </label>
            </div>
          </div>

          {filteredLocations.length > 0 ? (
            <div className="buyer-map-results__locations">
              <h2>Recommended Locations</h2>
              <div className="buyer-map-results__list">
                {filteredLocations.map((location) => (
                  <button
                    className={`buyer-map-location${selectedLocationId === location.id ? ' is-selected' : ''}`}
                    type="button"
                    key={location.id}
                    aria-pressed={selectedLocationId === location.id}
                    onClick={() => setSelectedLocationId(location.id)}
                  >
                    <span className="buyer-map-location__icon"><MapPin size={18} aria-hidden="true" /></span>
                    <span className="buyer-map-location__copy">
                      <strong>{location.name}</strong>
                      <span>{location.homes} homes · from {formatPrice(location.fromPrice)}</span>
                    </span>
                    <ChevronRight className="buyer-map-location__chevron" size={19} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="buyer-map-empty" role="status">
              <span className="buyer-map-empty__icon"><Search size={26} aria-hidden="true" /></span>
              <h2>No homes found</h2>
              <p>Try a nearby barangay, or clear the search to see every listing again.</p>
              <button type="button" onClick={clearSearch}>Clear search</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
