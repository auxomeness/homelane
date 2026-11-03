import { useEffect, useMemo, useState } from 'react';
import Button from '../../components/button.js';
import Card from '../../components/card.js';
import { areas, bedroomOptions, priceRanges, properties, propertyTypes } from '../data/discoveryData.js';
import FilterChips, { type AppliedFilter } from '../shared/FilterChips.js';
import MapPlaceholder from '../shared/MapPlaceholder.js';
import StateMessage from '../shared/StateMessage.js';

interface Filters {
  area: string;
  priceId: string;
  type: string;
  bedrooms: string;
}

const emptyFilters: Filters = { area: '', priceId: '', type: '', bedrooms: '' };

export default function MapDiscovery() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);

  // Simulated loading state (sample data only).
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const results = useMemo(() => {
    const range = priceRanges.find((r) => r.id === filters.priceId);
    return properties.filter((p) =>
      (!filters.area || p.area === filters.area) &&
      (!range || (p.price >= range.min && p.price < range.max)) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.bedrooms || p.bedrooms >= Number(filters.bedrooms)),
    );
  }, [filters]);

  const appliedFilters: AppliedFilter[] = [
    filters.area && { key: 'area', label: filters.area },
    filters.priceId && { key: 'priceId', label: priceRanges.find((r) => r.id === filters.priceId)?.label ?? '' },
    filters.type && { key: 'type', label: filters.type },
    filters.bedrooms && { key: 'bedrooms', label: `${filters.bedrooms}+ bedrooms` },
  ].filter((f): f is AppliedFilter => Boolean(f));

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setSelectedId(null);
  };
  const clearFilters = () => { setFilters(emptyFilters); setSelectedId(null); };
  const toggleSaved = (id: string) =>
    setSaved((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  return (
    <main className="discovery-page map-page">
      <h1 className="discovery-title">Map</h1>

      <section className="filter-panel" aria-label="Property filters">
        <label className="filter-field">
          <span>Location</span>
          <select value={filters.area} onChange={(e) => setFilter('area', e.target.value)}>
            <option value="">All Naga City areas</option>
            {areas.map((area) => <option key={area} value={area}>{area}</option>)}
          </select>
        </label>
        <label className="filter-field">
          <span>Price range</span>
          <select value={filters.priceId} onChange={(e) => setFilter('priceId', e.target.value)}>
            <option value="">Any price</option>
            {priceRanges.map((range) => <option key={range.id} value={range.id}>{range.label}</option>)}
          </select>
        </label>
        <label className="filter-field">
          <span>Property type</span>
          <select value={filters.type} onChange={(e) => setFilter('type', e.target.value)}>
            <option value="">All types</option>
            {propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className="filter-field">
          <span>Bedrooms</span>
          <select value={filters.bedrooms} onChange={(e) => setFilter('bedrooms', e.target.value)}>
            <option value="">Any</option>
            {bedroomOptions.map((count) => <option key={count} value={count}>{count}+ bedrooms</option>)}
          </select>
        </label>
      </section>

      <FilterChips
        filters={appliedFilters}
        onRemove={(key) => setFilter(key as keyof Filters, '')}
        onClearAll={clearFilters}
      />

      <p className="result-count" aria-live="polite">
        {loading ? 'Loading properties…' : `${results.length} ${results.length === 1 ? 'result' : 'results'}`}
      </p>

      {loading ? (
        <StateMessage kind="loading" title="Loading map" text="Finding properties in Naga City…" />
      ) : (
        <div className="map-layout">
          <MapPlaceholder properties={results} selectedId={selectedId} onSelect={setSelectedId} />

          <section className="property-results" aria-label="Property results">
            {results.length === 0 ? (
              <StateMessage title="No properties found" text="Try changing or clearing your filters.">
                <Button variant="outline" size="small" onClick={clearFilters}>Clear Filters</Button>
              </StateMessage>
            ) : (
              results.map((property) => (
                <div key={property.id} className={`property-result${selectedId === property.id ? ' is-selected' : ''}`}>
                  <Card
                    price={property.price}
                    title={property.title}
                    location={`${property.area}, Naga City`}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    area={property.floorArea}
                    saved={saved.includes(property.id)}
                    onSave={() => toggleSaved(property.id)}
                    onClick={() => setSelectedId(property.id)}
                  />
                </div>
              ))
            )}
          </section>
        </div>
      )}
    </main>
  );
}
