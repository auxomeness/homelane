import { useMemo, useState } from 'react';
import VisitorHeader from '../shared/VisitorHeader';
import PropertyBrowseFilters from '../components/properties/PropertyBrowseFilters';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyDetailsModal from '../components/properties/PropertyDetailsModal';
import { filterProperties, getPublicProperties, type Property, type PropertySort } from '../libs/propertyData';
import { useSavedProperties } from '../libs/useSavedProperties';
import '../components/home/home.css';

export default function VisitorProperties() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') ?? '');
  const [bedrooms, setBedrooms] = useState<number | 'any'>('any');
  const [sort, setSort] = useState<PropertySort>('recommended');
  const [savedOnly, setSavedOnly] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { savedIds, toggleSaved } = useSavedProperties();

  const visibleProperties = useMemo(() => {
    const filtered = filterProperties(getPublicProperties(), { query, bedrooms, sort });
    return savedOnly ? filtered.filter((property) => savedIds.includes(property.id)) : filtered;
  }, [query, bedrooms, sort, savedOnly, savedIds]);

  return (
    <div className="visitor-page">
      <VisitorHeader />
      <main className="visitor-page__main visitor-properties-page">
        <div className="visitor-section-heading">
          <div><p className="visitor-eyebrow">Explore homes</p><h1>Properties for you</h1></div>
          <span aria-live="polite">{visibleProperties.length} {visibleProperties.length === 1 ? 'home' : 'homes'}</span>
        </div>
        <PropertyBrowseFilters
          query={query}
          onQueryChange={setQuery}
          bedrooms={bedrooms}
          onBedroomsChange={setBedrooms}
          sort={sort}
          onSortChange={setSort}
          savedOnly={savedOnly}
          onSavedOnlyChange={setSavedOnly}
        />
        {visibleProperties.length > 0 ? (
          <div className="property-grid" aria-live="polite">
            {visibleProperties.map((property) => <PropertyCard
              property={property}
              saved={savedIds.includes(property.id)}
              onToggleSaved={toggleSaved}
              onViewDetails={setSelectedProperty}
              key={property.id}
            />)}
          </div>
        ) : (
          <div className="property-empty-state">
            <h2>{savedOnly ? 'No saved homes yet' : 'No homes match your search'}</h2>
            <p>{savedOnly ? 'Save a home with the heart button and it will appear here.' : 'Try another neighborhood, home type, or bedroom count.'}</p>
            {(query || bedrooms !== 'any' || savedOnly) && <button type="button" onClick={() => { setQuery(''); setBedrooms('any'); setSavedOnly(false); }}>Clear filters</button>}
          </div>
        )}
      </main>
      <PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </div>
  );
}
