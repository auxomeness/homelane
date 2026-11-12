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
}: PropertyBrowseFiltersProps) {
  return (
    <section className="property-browse-filters" aria-label="Filter properties">
      <PropertySearch value={query} onChange={onQueryChange} placeholder="Search by city, neighborhood, or home type" />
      <div className="property-browse-filters__options">
        <label>
          <span>Bedrooms</span>
          <select value={bedrooms} onChange={(event) => onBedroomsChange(event.target.value === 'any' ? 'any' : Number(event.target.value))}>
            <option value="any">Any number</option>
            <option value="1">1+ bedrooms</option>
            <option value="2">2+ bedrooms</option>
            <option value="3">3+ bedrooms</option>
            <option value="4">4+ bedrooms</option>
          </select>
        </label>
        <label>
          <span>Sort by</span>
          <select value={sort} onChange={(event) => onSortChange(event.target.value as PropertySort)}>
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
        <label className="property-browse-filters__saved">
          <input type="checkbox" checked={savedOnly} onChange={(event) => onSavedOnlyChange(event.target.checked)} />
          <span>Saved homes only</span>
        </label>
      </div>
    </section>
  );
}
