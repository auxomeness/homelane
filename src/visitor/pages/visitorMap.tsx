import { useState } from 'react';
import { useNavigate } from 'react-router';
import VisitorHeader from '../shared/VisitorHeader';
import VisitorNavigation from '../shared/VisitorNavigation';
import PropertySearch from '../components/properties/PropertySearch';
import RecommendedLocations from '../components/map/RecommendedLocations';
import LoginModal from '../components/login/LoginModal';
import '../components/home/home.css';
import '../components/map/map.css';

export default function VisitorMap() {
  const [query, setQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="visitor-page">
      <VisitorHeader onLoginClick={() => setLoginOpen(true)} />
      <main className="visitor-page__main visitor-map-page">
        <h1 className="visitor-map-page__title">Map</h1>
        <div className="visitor-map-canvas" role="img" aria-label="Map area. Public location data is not available yet.">
          <span>Map</span>
        </div>
        <PropertySearch
          className="visitor-search visitor-map-search"
          value={query}
          onChange={setQuery}
          onSubmit={(search) => navigate(`/visitor/properties${search ? `?q=${encodeURIComponent(search)}` : ''}`)}
          label="Location"
          placeholder="City, neighborhood, or ZIP"
        />
        <div className="visitor-map-recommendations">
          <RecommendedLocations title="Recommended Locations" />
        </div>
      </main>
      <VisitorNavigation />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
