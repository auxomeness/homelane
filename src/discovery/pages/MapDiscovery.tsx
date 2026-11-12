import { useEffect, useMemo, useState } from 'react';
import Button from '../../components/button.js';
import type { Property } from '../types.js';
import { areas, bedroomOptions, formatMillions, getProperty, priceRanges, propertyTypes } from '../utils.js';
import FilterChips, { type AppliedFilter } from '../shared/FilterChips.js';
import Icon from '../shared/Icon.js';
import MapPlaceholder from '../shared/MapPlaceholder.js';
import StateMessage from '../shared/StateMessage.js';

interface Filters {
  area: string;
  priceId: string;
  type: string;
  bedrooms: string;
}

const emptyFilters: Filters = { area: '', priceId: '', type: '', bedrooms: '' };

// No database yet, so the list starts empty. Fill it from the API later.
const properties: Property[] = [];

export default function MapDiscovery() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulated loading state (sample data only).
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  // The map pins and the Recommended Locations rows both come from these same results.
  const results = useMemo(() => {
    const range = priceRanges.find((r) => r.id === filters.priceId);
    const query = filters.area.trim().toLowerCase();
    return properties.filter((p) =>
      (!query || p.area.toLowerCase().includes(query) || p.title.toLowerCase().includes(query)) &&
      (!range || (p.price >= range.min && p.price < range.max)) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.bedrooms || p.bedrooms >= Number(filters.bedrooms)),
    );
  }, [filters]);

  const locations = useMemo(() => {
    const byArea = new Map<string, { area: string; count: number; from: number }>();
    results.forEach((p) => {
      const entry = byArea.get(p.area);
      if (entry) { entry.count += 1; entry.from = Math.min(entry.from, p.price); }
      else byArea.set(p.area, { area: p.area, count: 1, from: p.price });
    });
    return [...byArea.values()];
  }, [results]);

  const selectedArea = selectedId ? getProperty(properties, selectedId)?.area : undefined;

  const appliedFilters: AppliedFilter[] = [
    filters.priceId && { key: 'priceId', label: priceRanges.find((r) => r.id === filters.priceId)?.label ?? '' },
    filters.type && { key: 'type', label: filters.type },
    filters.bedrooms && { key: 'bedrooms', label: `${filters.bedrooms}+ bedrooms` },
  ].filter((f): f is AppliedFilter => Boolean(f));

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setSelectedId(null);
  };
  const clearFilters = () => { setFilters(emptyFilters); setSelectedId(null); };

  return (
    <main className="discovery-page map-page">
      <h1 className="map-title">MAP</h1>

      {loading ? (
        <StateMessage kind="loading" title="Loading map" text="Finding properties in Naga City…" />
      ) : (
        <MapPlaceholder properties={results} selectedId={selectedId} onSelect={setSelectedId} />
      )}

      <section className="location-card" aria-label="Location search">
        <label>
          <span>Location</span>
          <span className="location-card__field">
            <Icon name="search" size={16} />
            <input
              type="text"
              list="naga-areas"
              placeholder="City, neighborhood, or ZIP"
              value={filters.area}
              onChange={(e) => setFilter('area', e.target.value)}
            />
            {filters.area && (
              <button type="button" aria-label="Clear location" onClick={() => setFilter('area', '')}>
                <Icon name="x" size={16} />
              </button>
            )}
          </span>
          <datalist id="naga-areas">{areas.map((area) => <option key={area} value={area} />)}</datalist>
        </label>
      </section>

      <div className="filter-selects" role="group" aria-label="Property filters">
        <select aria-label="Price range" value={filters.priceId} onChange={(e) => setFilter('priceId', e.target.value)}>
          <option value="">Any price</option>
          {priceRanges.map((range) => <option key={range.id} value={range.id}>{range.label}</option>)}
        </select>
        <select aria-label="Property type" value={filters.type} onChange={(e) => setFilter('type', e.target.value)}>
          <option value="">All types</option>
          {propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
        <select aria-label="Bedrooms" value={filters.bedrooms} onChange={(e) => setFilter('bedrooms', e.target.value)}>
          <option value="">Any beds</option>
          {bedroomOptions.map((count) => <option key={count} value={count}>{count}+ beds</option>)}
        </select>
      </div>

      <FilterChips filters={appliedFilters} onRemove={(key) => setFilter(key as keyof Filters, '')} onClearAll={clearFilters} />

      {!loading && (locations.length === 0 ? (
        // Figma "No homes found" frame. The button only appears when there is a search or filter to clear.
        <StateMessage icon="search" title="No homes found" text="Try a nearby barangay, or clear the search to see every listing again.">
          {(filters.area || appliedFilters.length > 0) && (
            <Button variant="secondary" onClick={clearFilters}>Clear search</Button>
          )}
        </StateMessage>
      ) : (
        <section className="recommended" aria-label="Recommended Locations">
          <h2>Recommended Locations</h2>
          <p className="visually-hidden" aria-live="polite">{results.length} {results.length === 1 ? 'result' : 'results'}</p>
          <ul>
            {locations.map((location) => (
              <li key={location.area}>
                <button
                  type="button"
                  className={`location-row${selectedArea === location.area ? ' is-selected' : ''}`}
                  onClick={() => setFilter('area', location.area)}
                >
                  <span className="location-row__icon"><Icon name="pin" size={20} /></span>
                  <span className="location-row__text">
                    <strong>{location.area}</strong>
                    <span>{location.count} {location.count === 1 ? 'home' : 'homes'} · from {formatMillions(location.from)}</span>
                  </span>
                  <Icon name="chevron-right" size={20} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
