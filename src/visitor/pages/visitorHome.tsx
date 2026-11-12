import { useState } from 'react';
import { useNavigate } from 'react-router';
import VisitorHeader from '../shared/VisitorHeader';
import VisitorNavigation from '../shared/VisitorNavigation';
import AnnouncementsPanel from '../components/home/AnnouncementsPanel';
import PropertyCard from '../components/properties/PropertyCard';
import PropertySearch from '../components/properties/PropertySearch';
import PropertyDetailsModal from '../components/properties/PropertyDetailsModal';
import RecommendedLocations from '../components/map/RecommendedLocations';
import LoginModal from '../components/login/LoginModal';
import { getPublicProperties, type Property } from '../libs/propertyData';
import { useSavedProperties } from '../libs/useSavedProperties';
import '../components/home/home.css';

export default function VisitorHome() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const navigate = useNavigate();
  const { savedIds, toggleSaved } = useSavedProperties();
  const featuredProperties = getPublicProperties().slice(0, 3);

  return (
    <div className="visitor-page">
      <VisitorHeader onLoginClick={() => setLoginOpen(true)} />
      <main className="visitor-page__main visitor-home">
        <section className="visitor-hero visitor-home__hero">
          <div className="visitor-hero__content">

            <PropertySearch
              value={query}
              onChange={setQuery}
              onSubmit={(search) => navigate(`/visitor/properties${search ? `?q=${encodeURIComponent(search)}` : ''}`)}
              placeholder="City, neighborhood, or ZIP code"
            />
          </div>
        </section>
        <section className="visitor-page__section visitor-home__featured">
          <div className="visitor-section-heading">
            <div><p className="visitor-eyebrow">Handpicked for you</p><h2>Featured homes</h2></div>
            <a href="/visitor/properties">Browse properties</a>
          </div>
          {featuredProperties.length > 0 ? <div className="property-grid">{featuredProperties.map((property) => <PropertyCard
            property={property}
            saved={savedIds.includes(property.id)}
            onToggleSaved={toggleSaved}
            onViewDetails={setSelectedProperty}
            key={property.id}
          />)}</div> : <div className="property-empty-state visitor-home__empty"><p>No public homes available right now.</p></div>}
        </section>
        <section className="visitor-home__shortcuts" aria-labelledby="search-shortcuts-heading">
          <h2 id="search-shortcuts-heading">Search shortcuts</h2>
          <div className="visitor-home__shortcut-links">
            <a href="/visitor/properties">Browse all properties</a>
            <a href="/visitor/map">Explore locations</a>
          </div>
        </section>
        <div className="visitor-page__section visitor-home__locations"><RecommendedLocations /></div>
        <div className="visitor-page__section visitor-home__announcements"><AnnouncementsPanel /></div>
        <section className="visitor-page__section visitor-join visitor-home__about">
          <div><p className="visitor-eyebrow">About Homelane</p><h2>A better place to find your next home.</h2></div>
          <p>Explore homes and neighborhoods with Homelane.</p>
        </section>
      </main>
      <VisitorNavigation />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </div>
  );
}
