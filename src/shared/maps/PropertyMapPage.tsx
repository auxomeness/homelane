import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { getPublicListings, type PropertyListing } from './listingsApi.js';
import PropertyMap, { normalizeRadiusKm } from './PropertyMap.js';
import PriceRangeSelect from './PriceRangeSelect.js';
import './fullscreenMap.css';

export type BrowserRole = 'visitor' | 'buyer';
interface Props {
  role: BrowserRole;
  mode: 'list' | 'map';
  basePath?: string;
  listPath?: string;
  embedded?: boolean;
}

export default function PropertyMapPage({ role, mode, basePath: basePathOverride, listPath: listPathOverride, embedded = false }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [visibleOnMap, setVisibleOnMap] = useState<PropertyListing[]>([]);
  const [mapResultsKnown, setMapResultsKnown] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [error, setError] = useState(''); const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const basePath = basePathOverride ?? `/${role}`;
  const listPath = listPathOverride ?? basePath;
  const mapPath = `${basePath}/map`;
  const search = searchParams.get('q') ?? '';
  const type = searchParams.get('type') ?? 'all';
  const minPrice = searchParams.get('min') ?? '';
  const maxPrice = searchParams.get('max') ?? '';
  const radiusKm = normalizeRadiusKm(Number(searchParams.get('radius') ?? '10'));
  const selectedId = searchParams.get('selected');

  useEffect(() => { getPublicListings().then(setListings).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  const setParam = useCallback((key: string, value: string) => setSearchParams((current) => { const next = new URLSearchParams(current); if (value) next.set(key, value); else next.delete(key); return next; }, { replace: true }), [setSearchParams]);
  const setPriceRange = useCallback((min: string, max: string) => setSearchParams((current) => { const next = new URLSearchParams(current); min ? next.set('min', min) : next.delete('min'); max ? next.set('max', max) : next.delete('max'); return next; }, { replace: true }), [setSearchParams]);
  const filtered = useMemo(() => listings.filter((listing) => {
    const textMatches = `${listing.title} ${listing.location} ${listing.description}`.toLowerCase().includes(search.trim().toLowerCase());
    return textMatches && (type === 'all' || listing.propertyType.toLowerCase() === type.toLowerCase()) && (!minPrice || Number(listing.price) >= Number(minPrice)) && (!maxPrice || Number(listing.price) <= Number(maxPrice));
  }), [listings, maxPrice, minPrice, search, type]);
  const updateVisible = useCallback((next: PropertyListing[]) => { setVisibleOnMap(next); setMapResultsKnown(true); }, []);
  const selectListing = useCallback((listing: PropertyListing) => setParam('selected', listing.id), [setParam]);
  const goToMap = (listing?: PropertyListing) => {
    if (listing) setParam('selected', listing.id);
    navigate(`${mapPath}${listing ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams), selected: listing.id })}` : searchParams.size ? `?${searchParams}` : ''}`);
  };
  const filterForm = <div className="map-filter-fields"><label>Search<input value={search} onChange={(event) => setParam('q', event.target.value)} placeholder="Title or location" /></label><label>Property type<select value={type} onChange={(event) => setParam('type', event.target.value)}><option value="all">All types</option>{['House', 'Condo', 'Townhouse', 'Lot'].map((item) => <option key={item}>{item}</option>)}</select></label><PriceRangeSelect min={minPrice} max={maxPrice} onChange={setPriceRange} /></div>;

  if (mode === 'map') return <main className="fullscreen-map-screen">
    <aside className={`fullscreen-map-panel${panelOpen ? '' : ' is-collapsed'}`}><div className="fullscreen-map-panel__title"><div><span>HOMELANE · {role.toUpperCase()}</span><h1>Explore properties</h1></div><div className="fullscreen-map-panel__actions"><Link className="map-close" to={`${listPath}${searchParams.size ? `?${searchParams}` : ''}`} aria-label="Back to property list" title="Back to property list"><X size={20} /></Link><button type="button" className="map-panel-collapse" aria-expanded={panelOpen} aria-label={panelOpen ? 'Collapse results panel' : 'Expand results panel'} onClick={() => setPanelOpen((open) => !open)}>{panelOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}</button></div></div><div className="fullscreen-map-panel__content"><nav className="fullscreen-map-panel__tabs" aria-label={`${role} property views`}><NavLink to={`${listPath}${searchParams.size ? `?${searchParams}` : ''}`} end>List</NavLink><NavLink to={`${mapPath}${searchParams.size ? `?${searchParams}` : ''}`}>Map</NavLink></nav>{filterForm}<p className="map-result-count">{mapResultsKnown ? visibleOnMap.length : filtered.length} properties in this area</p>
      <div className="map-result-list">{loading && <p className="map-empty" role="status">Loading published properties…</p>}{(mapResultsKnown ? visibleOnMap : filtered).map((listing) => <button type="button" className={`map-result-card${selectedId === listing.id ? ' is-selected' : ''}`} key={listing.id} onClick={() => selectListing(listing)}>
        {listing.photos[0] ? <img src={listing.photos[0]} alt="" /> : <div className="map-result-card__image">⌂</div>}<span><b>{listing.title}</b><small>{listing.location}</small><strong>₱ {Number(listing.price).toLocaleString('en-PH')}</strong></span>
      </button>)}{!loading && !error && mapResultsKnown && !visibleOnMap.length && <p className="map-empty">No published properties in this radius.</p>}{error && <p className="map-error" role="alert">{error} Check the backend API configuration.</p>}</div></div>
    </aside>
    <div className="fullscreen-map-canvas"><PropertyMap listings={filtered} fullscreen panelCollapsed={!panelOpen} height="100%" radiusKm={radiusKm} onRadiusChange={(value) => setParam('radius', String(value))} selectedListingId={selectedId} onListingSelect={selectListing} onVisibleListingsChange={updateVisible} /></div>
  </main>;

  return <main className={`property-list-page${embedded ? ' property-list-page--embedded' : ''}`}>{!embedded && <header className="property-list-header"><div><p>HOMELANE · {role.toUpperCase()}</p><h1>Find your place</h1><span>Explore verified properties across the map.</span></div><nav aria-label={`${role} property views`}><NavLink to={listPath} end>List</NavLink><NavLink to={`${mapPath}${searchParams.size ? `?${searchParams}` : ''}`}>Map</NavLink></nav></header>}<section className="property-list-filters">{filterForm}</section>
    {loading && <p className="map-empty">Loading properties…</p>}{error && <p className="map-error" role="alert">{error} Check the backend API configuration.</p>}
    <section className="property-list-grid">{filtered.map((listing) => <article className="property-list-card" key={listing.id}>{listing.photos[0] ? <img src={listing.photos[0]} alt={`${listing.title}`} /> : <div className="property-list-card__image">⌂</div>}<div><span>{listing.propertyType}</span><h2>{listing.title}</h2><p>{listing.location}</p><strong>₱ {Number(listing.price).toLocaleString('en-PH')}</strong><button type="button" onClick={() => goToMap(listing)}>Show on map</button></div></article>)}</section>
    {!loading && !error && !filtered.length && <p className="map-empty">No published properties match these filters.</p>}
  </main>;
}
