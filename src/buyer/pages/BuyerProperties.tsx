import './BuyerProperties.css';
import { useMemo, useState, type ChangeEvent } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import Card from '../components/PropertyCard.js';
import { useSearchParams } from 'react-router';
import { buyerListings, type PropertyType } from '../data/listings.js';

type PriceRange = 'all' | 'under-5m' | '5m-10m' | 'over-10m';
type TypeFilter = 'all' | PropertyType;
type BedroomRange = 'any' | '1+' | '2+' | '3+' | '4+';

export default function BuyerProperties() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') as TypeFilter | null;
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') ?? '');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(() => (
    initialType && ['House', 'Condo', 'Townhouse', 'Residential lot'].includes(initialType) ? initialType : 'all'
  ));
  const [bedroomRange, setBedroomRange] = useState<BedroomRange>('any');

  const filteredListings = useMemo(() => buyerListings.filter((listing) => {
    const searchableAttributes = [
      listing.title,
      listing.location,
      listing.postalCode,
      listing.type,
      listing.bedrooms == null ? '' : `${listing.bedrooms} bedrooms`,
      listing.bathrooms == null ? '' : `${listing.bathrooms} bathrooms`,
      `${listing.area} m2`,
      `${listing.price}`,
    ].join(' ').toLowerCase();
    const matchesSearch = searchableAttributes.includes(searchQuery.trim().toLowerCase());
    const matchesType = typeFilter === 'all' || listing.type === typeFilter;
    const matchesBedrooms = bedroomRange === 'any'
      || (listing.bedrooms != null && listing.bedrooms >= Number.parseInt(bedroomRange, 10));
    const matchesPrice = priceRange === 'all'
      || (priceRange === 'under-5m' && listing.price < 5_000_000)
      || (priceRange === '5m-10m' && listing.price >= 5_000_000 && listing.price <= 10_000_000)
      || (priceRange === 'over-10m' && listing.price > 10_000_000);

    return matchesSearch && matchesType && matchesPrice && matchesBedrooms;
  }), [searchQuery, priceRange, typeFilter, bedroomRange]);

  const clearSearch = () => {
    setSearchQuery('');
    setPriceRange('all');
    setTypeFilter('all');
    setBedroomRange('any');
  };

  const handlePriceRangeChange = (event: ChangeEvent<HTMLSelectElement>) => setPriceRange(event.target.value as PriceRange);
  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => setTypeFilter(event.target.value as TypeFilter);
  const handleBedroomChange = (event: ChangeEvent<HTMLSelectElement>) => setBedroomRange(event.target.value as BedroomRange);

  return (
    <section className="buyer-properties" aria-label="Properties for sale">
      <form className="buyer-properties__search" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="buyer-properties__search-label" htmlFor="buyer-property-search">Location</label>
        <span className="buyer-properties__search-field">
          <Search size={16} aria-hidden="true" />
          <input
            id="buyer-property-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="City, neighborhood, or ZIP"
          />
          {searchQuery && (
            <button className="buyer-properties__clear" type="button" aria-label="Clear property search" onClick={() => setSearchQuery('')}>
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </span>
      </form>

      <div className="buyer-properties__toolbar">
        <div className="buyer-properties__filters" aria-label="Property filters">
          <label className={`buyer-properties__filter${priceRange !== 'all' ? ' is-active' : ''}`}>
            <span>Price</span>
            <ChevronDown size={13} aria-hidden="true" />
            <select value={priceRange} onChange={handlePriceRangeChange} aria-label="Filter properties by price">
              <option value="all">Any price</option>
              <option value="under-5m">Under ₱5M</option>
              <option value="5m-10m">₱5M–₱10M</option>
              <option value="over-10m">Over ₱10M</option>
            </select>
          </label>
          <label className={`buyer-properties__filter${typeFilter !== 'all' ? ' is-active' : ''}`}>
            <span>Type</span>
            <ChevronDown size={13} aria-hidden="true" />
            <select value={typeFilter} onChange={handleTypeChange} aria-label="Filter properties by type">
              <option value="all">All types</option>
              <option value="House">Houses</option>
              <option value="Condo">Condos</option>
              <option value="Townhouse">Townhouses</option>
              <option value="Residential lot">Residential lots</option>
            </select>
          </label>
          <label className={`buyer-properties__filter${bedroomRange !== 'any' ? ' is-active' : ''}`}>
            <span>Beds</span>
            <ChevronDown size={13} aria-hidden="true" />
            <select value={bedroomRange} onChange={handleBedroomChange} aria-label="Filter properties by bedrooms">
              <option value="any">Any beds</option>
              <option value="1+">1+ beds</option>
              <option value="2+">2+ beds</option>
              <option value="3+">3+ beds</option>
              <option value="4+">4+ beds</option>
            </select>
          </label>
        </div>
        <span className="buyer-properties__result-count" aria-live="polite">{filteredListings.length} results</span>
      </div>

      {filteredListings.length > 0 ? (
        <div className="buyer-properties__grid">
          {filteredListings.map((listing) => (
            <Card
              key={listing.id}
              className="buyer-property-card"
              placeholderText="Property photo"
              status="For sale"
              price={listing.price}
              title={listing.title}
              location={listing.location}
              bedrooms={listing.bedrooms}
              bathrooms={listing.bathrooms}
              area={listing.area}
              areaUnit="m²"
              showSaveAction={false}
            />
          ))}
        </div>
      ) : (
        <div className="buyer-properties__empty" role="status">
          <span className="buyer-properties__empty-icon"><Search size={26} aria-hidden="true" /></span>
          <h2>No homes found</h2>
          <p>Try a different location or adjust your filters to see more properties.</p>
          <button type="button" onClick={clearSearch}>Clear search</button>
        </div>
      )}
    </section>
  );
}

