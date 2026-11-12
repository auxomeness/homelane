import { useState } from 'react';
import VisitorHeader from '../shared/VisitorHeader';
import RecommendedLocations from '../components/map/RecommendedLocations';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyDetailsModal from '../components/properties/PropertyDetailsModal';
import { getPublicProperties, type Property } from '../libs/propertyData';
import { useSavedProperties } from '../libs/useSavedProperties';
import '../components/home/home.css';

export default function VisitorMap() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { savedIds, toggleSaved } = useSavedProperties();

  return (
    <div className="visitor-page">
      <VisitorHeader />
      <main className="visitor-page__main">
        <div className="visitor-section-heading">
          <div><p className="visitor-eyebrow">Find the right neighborhood</p><h1>Explore locations</h1></div>
        </div>
        <RecommendedLocations />
        <section className="visitor-page__section">
          <div className="visitor-section-heading"><div><p className="visitor-eyebrow">Homes worth a closer look</p><h2>Nearby properties</h2></div></div>
          <div className="property-grid">{getPublicProperties().map((property) => <PropertyCard
            property={property}
            saved={savedIds.includes(property.id)}
            onToggleSaved={toggleSaved}
            onViewDetails={setSelectedProperty}
            key={property.id}
          />)}</div>
        </section>
      </main>
      <PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </div>
  );
}
