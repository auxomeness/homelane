import { useState } from 'react';
import { ArrowDownUp, SlidersHorizontal } from 'lucide-react';
import type { PropertySort } from '../../libs/propertyData';
import PropertySearch from './PropertySearch';

type PropertyBrowseFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  bedrooms: number | 'any';
  onBedroomsChange: (value: number | 'any') => void;
  sort: PropertySort;
  onSortChange: (value: PropertySort) => void;
  savedOnly: boolean;
  onSavedOnlyChange: (value: boolean) => void;
  resultCount: number;
};

export default function PropertyBrowseFilters({
  query,
  onQueryChange,
  bedrooms,
  onBedroomsChange,
  sort,
  onSortChange,
  savedOnly,
  onSavedOnlyChange,
  resultCount,
}: PropertyBrowseFiltersProps) {
  const [openPanel, setOpenPanel] = useState<'filters' | 'sort' | null>(null);

  return (
    <section className="property-browse-filters" aria-label="Filter properties">
      <PropertySearch
        value={query}
        onChange={onQueryChange}
        label="Location"
        placeholder="City, neighborhood, or ZIP"
      />
      <div className="property-browse-filters__toolbar">
        <button
          className={openPanel === 'filters' ? 'is-open' : ''}
          type="button"
          aria-label="Filter bedrooms and saved homes"
          aria-expanded={openPanel === 'filters'}
          aria-controls="property-filter-panel"
          onClick={() => setOpenPanel(openPanel === 'filters' ? null : 'filters')}
        ><SlidersHorizontal size={13} /> Filter</button>
        <button
          className={openPanel === 'sort' ? 'is-open' : ''}
          type="button"
          aria-label="Filter by price order"
          aria-expanded={openPanel === 'sort'}
          aria-controls="property-sort-panel"
          onClick={() => setOpenPanel(openPanel === 'sort' ? null : 'sort')}
        ><ArrowDownUp size={13} /> Filter</button>
        <span className="property-browse-filters__count" aria-live="polite">{resultCount} {resultCount === 1 ? 'result' : 'results'}</span>
      </div>
      {openPanel === 'filters' && <div className="property-browse-filters__panel" id="property-filter-panel">
        <label className="property-browse-filters__field">
          <span>Bedrooms</span>
          <select value={bedrooms} onChange={(event) => onBedroomsChange(event.target.value === 'any' ? 'any' : Number(event.target.value))}>
            <option value="any">Any number</option>
            <option value="1">1+ bedrooms</option>
            <option value="2">2+ bedrooms</option>
            <option value="3">3+ bedrooms</option>
            <option value="4">4+ bedrooms</option>
          </select>
        </label>
        <label className="property-browse-filters__saved">
          <input type="checkbox" checked={savedOnly} onChange={(event) => onSavedOnlyChange(event.target.checked)} />
          <span>Saved homes only</span>
        </label>
      </div>}
      {openPanel === 'sort' && <div className="property-browse-filters__panel" id="property-sort-panel">
        <label className="property-browse-filters__field">
          <span>Price order</span>
          <select value={sort} onChange={(event) => onSortChange(event.target.value as PropertySort)}>
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>}
    </section>
  );
}
