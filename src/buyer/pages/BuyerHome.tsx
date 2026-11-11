import './BuyerHome.css';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, Search } from 'lucide-react';
import Card from '../components/PropertyCard.js';
import { buyerListings, type PropertyType } from '../data/listings.js';

const searchShortcuts: { title: string; type: PropertyType; description: string }[] = [
  { title: 'Houses', type: 'House', description: 'Room to make yourself at home' },
  { title: 'Condominiums', type: 'Condo', description: 'City living in Naga' },
  { title: 'Townhouses', type: 'Townhouse', description: 'Comfort with space to grow' },
  { title: 'Residential lots', type: 'Residential lot', description: 'Find a place to build' },
];

export default function BuyerHome() {
  const navigate = useNavigate();
  const [locationQuery, setLocationQuery] = useState('');

  function searchProperties(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = locationQuery.trim();
    navigate(query ? `/buyer/properties?q=${encodeURIComponent(query)}` : '/buyer/properties');
  }

  return (
    <section className="buyer-home" aria-label="Buyer home dashboard">
      <section className="buyer-home__announcements" aria-labelledby="buyer-home-announcements-title">
        <p className="buyer-eyebrow">Announcements</p>
        <h1 id="buyer-home-announcements-title">Welcome to HOMELANE</h1>
        <p>Find a home in Naga City, explore neighborhoods, and connect with local real estate agents.</p>
        <Link to="/buyer/properties" className="buyer-home__announcement-link">
          Explore homes <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>

      <form className="buyer-home__search" role="search" onSubmit={searchProperties}>
        <label htmlFor="buyer-home-location">Location</label>
        <span className="buyer-home__search-field">
          <Search size={16} aria-hidden="true" />
          <input
            id="buyer-home-location"
            type="search"
            value={locationQuery}
            onChange={(event) => setLocationQuery(event.target.value)}
            placeholder="City, neighborhood, or ZIP"
          />
          <button type="submit">Search</button>
        </span>
      </form>

      <section className="buyer-home__shortcuts" aria-labelledby="buyer-home-shortcuts-title">
        <div className="buyer-home__section-heading">
          <div>
            <p className="buyer-eyebrow">Start exploring</p>
            <h2 id="buyer-home-shortcuts-title">Search shortcuts</h2>
          </div>
          <Link to="/buyer/map" className="buyer-home__text-link">Open map <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="buyer-home__shortcut-grid">
          {searchShortcuts.map((shortcut, index) => (
            <Link
              className="buyer-home__shortcut"
              key={shortcut.type}
              to={`/buyer/properties?type=${encodeURIComponent(shortcut.type)}`}
            >
              <span className={`buyer-home__shortcut-icon buyer-home__shortcut-icon--${index + 1}`} aria-hidden="true">
                {shortcut.title.slice(0, 1)}
              </span>
              <span className="buyer-home__shortcut-copy">
                <strong>{shortcut.title}</strong>
                <span>{shortcut.description}</span>
              </span>
              <ArrowRight className="buyer-home__shortcut-arrow" size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="buyer-home__featured buyer-properties" aria-labelledby="buyer-home-featured-title">
        <div className="buyer-home__section-heading">
          <div>
            <p className="buyer-eyebrow">Selected for you</p>
            <h2 id="buyer-home-featured-title">Featured homes</h2>
          </div>
          <Link to="/buyer/properties" className="buyer-home__text-link">View all <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="buyer-properties__grid">
          {buyerListings.slice(0, 6).map((listing) => (
            <Link
              className="buyer-home__property-link"
              key={listing.id}
              to={`/buyer/properties?q=${encodeURIComponent(listing.location)}`}
            >
              <Card
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
            </Link>
          ))}
        </div>
      </section>

      <section className="buyer-home__about" aria-labelledby="buyer-home-about-title">
        <p className="buyer-eyebrow">About</p>
        <h2 id="buyer-home-about-title">A thoughtful way to find home</h2>
        <p>HOMELANE brings Naga City homes, neighborhoods, and real estate professionals together in one place.</p>
      </section>
    </section>
  );
}

