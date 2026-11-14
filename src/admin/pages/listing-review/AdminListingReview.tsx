import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import AdminHeader from '../../shared/AdminHeader';
import AdminNavigation from '../../shared/AdminNavigation';
import PropertyMap, { type MapPin } from '../../../shared/maps/PropertyMap.js';
import { getStaffListings, reviewListing, type ListingStatus, type PropertyListing } from '../../../shared/maps/listingsApi.js';
import PriceRangeSelect from '../../../shared/maps/PriceRangeSelect.js';
import './adminListingReviewStyles.css';

export default function AdminListingReview() {
  const [listings, setListings] = useState<PropertyListing[]>([]); const [selectedId, setSelectedId] = useState('');
  const [params, setParams] = useSearchParams();
  const [pin, setPin] = useState<MapPin | null>(null); const [status, setStatus] = useState<ListingStatus>('active'); const [message, setMessage] = useState(''); const [error, setError] = useState('');
  const selected = listings.find((item) => item.id === selectedId) ?? null;
  const search = params.get('q') ?? ''; const type = params.get('type') ?? 'all'; const min = params.get('min') ?? ''; const max = params.get('max') ?? ''; const category = params.get('status') ?? 'all';
  const setParam = useCallback((key: string, value: string) => setParams((old) => { const next = new URLSearchParams(old); if (value) next.set(key, value); else next.delete(key); return next; }, { replace: true }), [setParams]);
  const setPriceRange = useCallback((min: string, max: string) => setParams((old) => { const next = new URLSearchParams(old); min ? next.set('min', min) : next.delete('min'); max ? next.set('max', max) : next.delete('max'); return next; }, { replace: true }), [setParams]);
  const filtered = useMemo(() => listings.filter((item) => `${item.title} ${item.location}`.toLowerCase().includes(search.trim().toLowerCase()) && (type === 'all' || item.propertyType.toLowerCase() === type.toLowerCase()) && (!min || Number(item.price) >= Number(min)) && (!max || Number(item.price) <= Number(max)) && (category === 'all' || item.status === category)), [category, listings, max, min, search, type]);
  const pending = useMemo(() => listings.filter((item) => item.status === 'pending' || item.status === 'rejected'), [listings]);
  useEffect(() => { getStaffListings().then((data) => { setListings(data); setSelectedId(data.find((item) => item.status === 'pending')?.id ?? data[0]?.id ?? ''); }).catch((reason: Error) => setError(reason.message)); }, []);
  useEffect(() => { if (selectedId && !filtered.some((item) => item.id === selectedId)) setSelectedId(filtered[0]?.id ?? ''); }, [filtered, selectedId]);
  useEffect(() => { if (selected) { setPin({ latitude: selected.latitude, longitude: selected.longitude }); setStatus(selected.status === 'rejected' ? 'rejected' : 'active'); } }, [selectedId]);
  const save = async () => {
    if (!selected || !pin) return;
    setMessage(''); setError('');
    try { const updated = await reviewListing(selected.id, status, pin.latitude, pin.longitude); setListings((current) => current.map((item) => item.id === updated.id ? { ...item, ...updated } : item)); setMessage('Listing review and exact pin saved.'); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save review.'); }
  };
  return <div className="listing-container"><AdminHeader/><AdminNavigation/><div id="listing-header"><h1>Listing reviews</h1><p>Review property details and verify exact map pins.</p></div>
    <div className="admin-map-tabs"><span>List</span><Link to={`/admin/map${params.size ? `?${params}` : ''}`}>Map</Link></div>
    <section className="admin-map-review">
      <div className="map-filter-fields admin-review-filters"><label>Search<input value={search} onChange={(event) => setParam('q', event.target.value)} placeholder="Title or location" /></label><label>Property type<select value={type} onChange={(event) => setParam('type', event.target.value === 'all' ? '' : event.target.value)}><option value="all">All types</option>{['House','Condo','Townhouse','Lot'].map((item) => <option key={item}>{item}</option>)}</select></label><PriceRangeSelect min={min} max={max} onChange={setPriceRange} /><label>Status<select value={category} onChange={(event) => setParam('status', event.target.value === 'all' ? '' : event.target.value)}><option value="all">All statuses</option>{(['pending','active','rejected','draft'] as ListingStatus[]).map((item) => <option key={item}>{item}</option>)}</select></label></div>
      <div className="admin-map-review__controls"><label htmlFor="review-listing">Select listing ({filtered.length})</label><select id="review-listing" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}><option value="">Choose a listing</option>{filtered.map((item) => <option value={item.id} key={item.id}>{item.title} · {item.status}</option>)}</select>
        {selected && <><p>{selected.location} · ₱ {Number(selected.price).toLocaleString('en-PH')}</p><label htmlFor="review-status">Decision</label><select id="review-status" value={status} onChange={(event) => setStatus(event.target.value as ListingStatus)}><option value="active">Approve and publish</option><option value="rejected">Request correction</option><option value="pending">Keep pending</option></select></>}
      </div>
      {selected ? <PropertyMap listings={[]} mode="pick" pin={pin} onPinChange={setPin} allowRoute={false} height={400}/> : <p>{error || (listings.length ? 'Select a listing to review its pin.' : 'No shared listings have been submitted yet.')}</p>}
      {error && <p className="staff-login-error" role="alert">{error}</p>}{message && <p role="status">{message}</p>}
      <button type="button" className="admin-map-review__save" onClick={save} disabled={!selected || !pin}>Save review and exact pin</button>
      <p className="admin-map-review__queue">{pending.length} pending or correction listings · {listings.length} total</p>
    </section>
  </div>;
}
