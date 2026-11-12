import { useMemo, useState } from 'react';
import VisitorHeader from '../shared/VisitorHeader';
import VisitorNavigation from '../shared/VisitorNavigation';
import PropertyBrowseFilters from '../components/properties/PropertyBrowseFilters';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyDetailsModal from '../components/properties/PropertyDetailsModal';
import LoginModal from '../components/login/LoginModal';
import { filterProperties, getPublicProperties, type Property, type PropertySort } from '../libs/propertyData';
import { useSavedProperties } from '../libs/useSavedProperties';
import '../components/home/home.css';

export default function VisitorProperties() {
  const publicProperties = useMemo(() => getPublicProperties(), []);
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') ?? '');
  const [bedrooms, setBedrooms] = useState<number | 'any'>('any');
  const [sort, setSort] = useState<PropertySort>('recommended');
  const [savedOnly, setSavedOnly] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const { savedIds, toggleSaved } = useSavedProperties();

  const visibleProperties = useMemo(() => {
    const filtered = filterProperties(publicProperties, { query, bedrooms, sort });
    return savedOnly ? filtered.filter((property) => savedIds.includes(property.id)) : filtered;
  }, [publicProperties, query, bedrooms, sort, savedOnly, savedIds]);

  return (
    <div className="visitor-page">
      <VisitorHeader onLoginClick={() => setLoginOpen(true)} />
      <main className="visitor-page__main visitor-properties-page">
        <PropertyBrowseFilters
          query={query}
          onQueryChange={setQuery}
          bedrooms={bedrooms}
          onBedroomsChange={setBedrooms}
          sort={sort}
          onSortChange={setSort}
          savedOnly={savedOnly}
          onSavedOnlyChange={setSavedOnly}
          resultCount={visibleProperties.length}
        />
        {publicProperties.length === 0 ? (
          <div className="property-empty-state">
            <h2>No public listings available yet</h2>
            <p>Public homes will appear here once a listings source is connected.</p>
          </div>
        ) : visibleProperties.length > 0 ? (
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
      <VisitorNavigation />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </div>
  );
}
