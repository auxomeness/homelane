import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin, Pencil, Trash2 } from 'lucide-react';
import Button from '../../../components/button.js';
import { useAgentData } from '../../libs/AgentDataContext.js';
import './listingDetailsStyles.css';
import PropertyMap from '../../../shared/maps/PropertyMap.js';

export default function AgentListingDetails() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { listings, deleteListing } = useAgentData();
  const listing = listings.find((item) => item.id === listingId);

  if (!listing) return <main className="agent-listing-details"><h1>Listing not found</h1><Button className="agent-button agent-button--secondary" variant="secondary" onClick={() => navigate('/agent/my-listings')}>Back to my listings</Button></main>;

  const editListing = () => navigate(`/agent/add-listings?edit=${encodeURIComponent(listing.id)}`);
  const removeListing = async () => {
    if (window.confirm(`Delete “${listing.title}”? This cannot be undone.`)) {
      try { await deleteListing(listing.id); navigate('/agent/my-listings'); }
      catch (error) { window.alert(error instanceof Error ? error.message : 'Unable to delete listing.'); }
    }
  };

  return (
    <main className="agent-listing-details">
      <button type="button" className="agent-back-link" onClick={() => navigate('/agent/my-listings')}><ArrowLeft size={17} />My listings</button>
      <div className="agent-listing-details__heading"><div><h1>{listing.title}</h1><p><MapPin size={16} />{listing.location}</p></div><span className={`agent-status-pill agent-status-pill--${listing.status}`}>{listing.statusLabel}</span></div>
      <section className="agent-panel agent-listing-details__content">
        {listing.photos?.length ? <div className="agent-listing-details__photos">{listing.photos.map((photo, index) => <img key={`${listing.id}-photo-${index}`} src={photo} alt={`${listing.title} property photo ${index + 1}`} />)}</div> : <div className={`agent-listing-details__photo-placeholder is-${listing.status}`}><span>Property photos will appear here</span></div>}
        <div className="agent-listing-details__facts"><div><small>Price</small><strong>{listing.price}</strong></div><div><small>Property type</small><strong>{listing.propertyType ?? 'House'}</strong></div>{listing.bedrooms !== undefined && <div><small>Bedrooms</small><strong>{listing.bedrooms}</strong></div>}{listing.bathrooms !== undefined && <div><small>Bathrooms</small><strong>{listing.bathrooms}</strong></div>}{listing.floorArea !== undefined && <div><small>Floor area</small><strong>{listing.floorArea} m²</strong></div>}</div>
        <div className="agent-listing-details__description"><h2>About this property</h2><p>{listing.description || 'No description has been added yet.'}</p></div>
        <section className="agent-map-preview"><MapPin size={22} /><div><strong>Exact location preview</strong><span>{listing.location}</span><span>{listing.latitude?.toFixed(6)}, {listing.longitude?.toFixed(6)}</span></div><PropertyMap listings={[{ id: listing.id, title: listing.title, location: listing.location, price: Number(listing.price.replace(/[^\d.]/g, '')), propertyType: listing.propertyType ?? 'House', description: listing.description ?? '', photos: listing.photos ?? [], bedrooms: listing.bedrooms ?? null, bathrooms: listing.bathrooms ?? null, floorArea: listing.floorArea ?? null, latitude: listing.latitude ?? 13.6218, longitude: listing.longitude ?? 123.1948, status: listing.status, createdAt: '', updatedAt: '' }]} allowRoute={false} height={300} /></section>
      </section>
      <div className="agent-listing-details__actions">
        <Button className="agent-button agent-button--primary" size="medium" onClick={editListing}><Pencil size={16} />{listing.status === 'rejected' ? 'Fix and resubmit' : listing.status === 'draft' ? 'Continue editing' : 'Edit listing'}</Button>
        <Button className="agent-button agent-button--danger" size="medium" onClick={removeListing}><Trash2 size={16} />Delete listing</Button>
      </div>
    </main>
  );
}
