import { useEffect, useMemo, useRef, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, Polyline } from 'react-leaflet';
import L, { type LatLngExpression } from 'leaflet';
import { Crosshair, Maximize2, Minimize2, Navigation, Plus, Minus, RotateCcw } from 'lucide-react';
import { locateWalkingRoute } from './routing.js';
import type { RouteStep } from './routing.js';
import type { PropertyListing } from './listingsApi.js';
import './propertyMap.css';

const DEFAULT_CENTER: LatLngExpression = [13.6218, 123.1948];
const markerIcon = L.divIcon({ className: 'homelane-map-marker', html: '<span></span>', iconSize: [24, 24], iconAnchor: [12, 12] });
const pinIcon = L.divIcon({ className: 'homelane-map-pin', html: '<span></span>', iconSize: [30, 30], iconAnchor: [15, 29] });
export interface MapPin { latitude: number; longitude: number }
const AVAILABLE_RADII = new Set([0, 2, 5, 10, 25]);
export function normalizeRadiusKm(radiusKm: number) {
  if (radiusKm === 100) return 0;
  return AVAILABLE_RADII.has(radiusKm) ? radiusKm : 10;
}
interface Props {
  listings: PropertyListing[]; mode?: 'browse' | 'pick'; pin?: MapPin | null; onPinChange?: (pin: MapPin) => void;
  allowRoute?: boolean; height?: number | string; fullscreen?: boolean; panelCollapsed?: boolean; radiusKm?: number; onRadiusChange?: (radiusKm: number) => void;
  selectedListingId?: string | null; onListingSelect?: (listing: PropertyListing) => void; onVisibleListingsChange?: (listings: PropertyListing[]) => void;
}

function MapEvents({ mode, onPinChange, onMove }: { mode: Props['mode']; onPinChange?: Props['onPinChange']; onMove?: () => void }) {
  useMapEvents({ click(event) { if (mode === 'pick') onPinChange?.({ latitude: event.latlng.lat, longitude: event.latlng.lng }); }, moveend() { onMove?.(); } });
  return null;
}
function Recenter({ center, scopeKey }: { center: LatLngExpression; scopeKey: string }) {
  const map = useMap();
  const previousScopeKey = useRef(scopeKey);
  useEffect(() => {
    const scopeChanged = scopeKey !== previousScopeKey.current;
    previousScopeKey.current = scopeKey;
    if (scopeChanged) return;
    map.flyTo(center, map.getZoom(), { duration: .55, easeLinearity: .2 });
  }, [center, map, scopeKey]);
  return null;
}
function RadiusViewport({ position, radiusKm, listings, fullscreen, panelCollapsed, request }: { position: MapPin | null; radiusKm: number; listings: PropertyListing[]; fullscreen: boolean; panelCollapsed: boolean; request: number }) {
  const map = useMap();
  const previousView = useRef<{ position: MapPin | null; radiusKm: number; request: number; panelCollapsed: boolean }>({ position: null, radiusKm, request, panelCollapsed });
  useEffect(() => {
    const previous = previousView.current;
    previousView.current = { position, radiusKm, request, panelCollapsed };
    const gotLocation = Boolean(position && !previous.position);
    const radiusChanged = radiusKm !== previous.radiusKm;
    const locationRequested = request !== previous.request;
    if (!position) return;
    const layoutChanged = panelCollapsed !== previous.panelCollapsed;
    const shouldFit = gotLocation || radiusChanged || locationRequested || layoutChanged;
    const fitViewport = () => {
      const isMobileLayout = window.innerWidth <= 760;
      const paddingTopLeft: [number, number] = fullscreen ? (isMobileLayout ? [40, 40] : [430, 120]) : [88, 88];
      const paddingBottomRight: [number, number] = fullscreen && isMobileLayout
        ? [40, panelCollapsed ? 84 : Math.round(window.innerHeight * .46)]
        : [120, 120];
      map.stop();
      if (radiusKm > 0) {
        map.flyToBounds(radiusBounds(position, radiusKm), { paddingTopLeft, paddingBottomRight, maxZoom: zoomTargetForRadius(radiusKm), duration: .8 });
      } else if (listings.length > 1) {
        map.flyToBounds(L.latLngBounds(listings.map((item) => [item.latitude, item.longitude])), { paddingTopLeft, paddingBottomRight, duration: .8 });
      } else if (listings.length === 1) {
        map.flyTo([listings[0].latitude, listings[0].longitude], 12, { duration: .8 });
      } else {
        map.flyTo([position.latitude, position.longitude], zoomTargetForRadius(0), { duration: .8 });
      }
    };
    if (shouldFit) fitViewport();
    map.on('resize', fitViewport);
    return () => { map.off('resize', fitViewport); };
  }, [fullscreen, listings, map, panelCollapsed, position, radiusKm, request]);
  return null;
}
function MapControls({ listings, fullscreen, onLocate, onToggleTracking, hasUserPosition, watching }: { listings: PropertyListing[]; fullscreen: boolean; onLocate: () => void; onToggleTracking: () => void; hasUserPosition: boolean; watching: boolean }) {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const update = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);
  const reset = () => {
    if (listings.length > 1) map.fitBounds(L.latLngBounds(listings.map((item) => [item.latitude, item.longitude])), { padding: [60, 60], maxZoom: 15 });
    else if (listings.length === 1) map.flyTo([listings[0].latitude, listings[0].longitude], 14);
    else map.flyTo(DEFAULT_CENTER, 12);
  };
  const toggleFullscreen = async () => {
    const target = map.getContainer().closest('.fullscreen-map-screen');
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (target instanceof HTMLElement) await target.requestFullscreen();
    } catch { /* Fullscreen is optional; map remains usable if the browser declines it. */ }
  };
  return fullscreen ? <div className="property-map__map-controls" aria-label="Map controls">
    <button type="button" aria-label="Use my location" title="Use my location" onClick={onLocate}><Crosshair size={22} /></button>
    <button type="button" aria-label={watching ? 'Stop tracking location' : 'Track location'} title={watching ? 'Stop tracking location' : 'Track location'} disabled={!hasUserPosition} onClick={onToggleTracking}><Navigation size={20} className={watching ? 'is-tracking' : ''} /></button>
    <button type="button" aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} onClick={() => void toggleFullscreen()}>{isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</button>
  </div> : <div className="property-map__zoom-controls" aria-label="Map controls"><button type="button" aria-label="Zoom in" onClick={() => map.zoomIn()}><Plus size={18} /></button><button type="button" aria-label="Zoom out" onClick={() => map.zoomOut()}><Minus size={18} /></button><button type="button" aria-label="Reset view" title="Reset view" onClick={reset}><RotateCcw size={16} /></button></div>;
}
function InvalidateMapSize() { const map = useMap(); useEffect(() => { const observer = new ResizeObserver(() => map.invalidateSize({ pan: false })); observer.observe(map.getContainer()); return () => observer.disconnect(); }, [map]); return null; }

export default function PropertyMap({ listings, mode = 'browse', pin, onPinChange, allowRoute = true, height = 440, fullscreen = false, panelCollapsed = false, radiusKm: controlledRadius, onRadiusChange, selectedListingId, onListingSelect, onVisibleListingsChange }: Props) {
  const [userPosition, setUserPosition] = useState<MapPin | null>(null);
  const [localRadius, setLocalRadius] = useState(10);
  const radiusKm = normalizeRadiusKm(controlledRadius ?? localRadius);
  const [selected, setSelected] = useState<PropertyListing | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [routeMessage, setRouteMessage] = useState('');
  const [routeSteps, setRouteSteps] = useState<RouteStep[]>([]);
  const lastRouteRequest = useRef<{ from: MapPin; at: number; listingId: string } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [watching, setWatching] = useState(false);
  const [scopeRequest, setScopeRequest] = useState(0);
  const scopeKey = `${scopeRequest}:${radiusKm}`;

  useEffect(() => { if (selectedListingId) { const listing = listings.find((item) => item.id === selectedListingId); if (listing) setSelected(listing); } }, [selectedListingId, listings]);

  useEffect(() => {
    if (!allowRoute || !selected || !userPosition) { setRoute([]); setRouteMessage(''); setRouteSteps([]); lastRouteRequest.current = null; return; }
    if (lastRouteRequest.current?.listingId === selected.id) {
      const moved = distanceKm(lastRouteRequest.current.from, userPosition) * 1000;
      if (moved < 35 || Date.now() - lastRouteRequest.current.at < 10000) return;
    }
    let live = true;
    const controller = new AbortController();
    lastRouteRequest.current = { from: userPosition, at: Date.now(), listingId: selected.id };
    setRouteMessage('Finding a walking route…');
    locateWalkingRoute(userPosition, selected, controller.signal).then((result) => {
      if (!live) return;
      setRoute(result.coordinates);
      setRouteSteps(result.steps);
      const minutes = Math.max(1, Math.round(result.duration / 60));
      setRouteMessage(`${(result.distance / 1000).toFixed(1)} km · ${minutes} min walking`);
    }).catch(() => { if (live && !controller.signal.aborted) { setRoute([]); setRouteMessage('Walking directions are unavailable right now.'); } });
    return () => { live = false; controller.abort(); };
  }, [allowRoute, selected, userPosition]);

  const filtered = useMemo(() => listings.filter((listing) => Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude) && (!userPosition || radiusKm <= 0 || distanceKm(userPosition, listing) <= radiusKm)), [listings, radiusKm, userPosition]);
  useEffect(() => { onVisibleListingsChange?.(filtered); }, [filtered, onVisibleListingsChange]);
  useEffect(() => {
    if (!watching || !navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(({ coords }) => setUserPosition({ latitude: coords.latitude, longitude: coords.longitude }), () => { setLocationError('Location tracking stopped because the browser could not read your location.'); setWatching(false); }, { enableHighAccuracy: true, maximumAge: 3000 });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [watching]);
  const center = useMemo<LatLngExpression>(() => pin ? [pin.latitude, pin.longitude] : selected ? [selected.latitude, selected.longitude] : userPosition ? [userPosition.latitude, userPosition.longitude] : DEFAULT_CENTER, [pin?.latitude, pin?.longitude, selected?.latitude, selected?.longitude, userPosition?.latitude, userPosition?.longitude]);
  const locate = () => {
    if (!navigator.geolocation) { setLocationError('Your browser does not support location.'); return; }
    setLocating(true); setLocationError('');
    navigator.geolocation.getCurrentPosition(({ coords }) => { setUserPosition({ latitude: coords.latitude, longitude: coords.longitude }); setScopeRequest((request) => request + 1); setLocating(false); }, () => { setLocationError('Location access was denied or is unavailable.'); setLocating(false); }, { enableHighAccuracy: true, timeout: 12000 });
  };
  const track = () => { setLocationError(''); setWatching((current) => !current); };

  return <section className={`property-map property-map--${mode}${fullscreen ? ' property-map--fullscreen' : ''}`} aria-label={mode === 'pick' ? 'Choose exact property location' : 'Property locations'}>
    {mode === 'browse' && <div className="property-map__toolbar">{!fullscreen && <div><strong>{filtered.length}</strong> properties on the map</div>}<label><span>Within</span><select value={radiusKm} onChange={(event) => { const value = Number(event.target.value); setLocalRadius(value); onRadiusChange?.(value); setScopeRequest((request) => request + 1); }} disabled={!userPosition}><option value={2}>2 km</option><option value={5}>5 km</option><option value={10}>10 km</option><option value={25}>25 km</option><option value={0}>Any distance</option></select></label>{!fullscreen && <><button type="button" onClick={locate} disabled={locating}>{locating ? 'Locating…' : 'Use my location'}</button>{userPosition && <button type="button" onClick={track}>{watching ? 'Stop tracking' : 'Track location'}</button>}</>}</div>}
    {locationError && <p className="property-map__message" role="status">{locationError}</p>}
    {mode === 'pick' && <p className="property-map__hint">Click the map to place the exact public pin. You can adjust it by clicking again.</p>}
    <MapContainer center={center} zoom={zoomTargetForRadius(radiusKm)} zoomControl={false} scrollWheelZoom style={{ height: fullscreen ? '100%' : height, width: '100%' }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents mode={mode} onPinChange={onPinChange} />
      <Recenter center={center} scopeKey={scopeKey} />
      <RadiusViewport position={userPosition} radiusKm={radiusKm} listings={filtered} fullscreen={fullscreen} panelCollapsed={panelCollapsed} request={scopeRequest} />
      <InvalidateMapSize />
      <MapControls listings={filtered} fullscreen={fullscreen} onLocate={locate} onToggleTracking={track} hasUserPosition={Boolean(userPosition)} watching={watching} />
      {filtered.map((listing) => <Marker key={listing.id} position={[listing.latitude, listing.longitude]} icon={markerIcon} eventHandlers={{ click: () => { setSelected(listing); onListingSelect?.(listing); } }}><Popup><div className="property-map__popup"><strong>{listing.title}</strong><span>{listing.location}</span><b>₱ {Number(listing.price).toLocaleString('en-PH')}</b>{listing.status !== 'active' && <small>{listing.status}</small>}{allowRoute && userPosition && <button type="button" onClick={() => { setSelected(listing); onListingSelect?.(listing); }}>Walking directions</button>}</div></Popup></Marker>)}
      {pin && mode === 'pick' && <Marker position={[pin.latitude, pin.longitude]} icon={pinIcon} draggable eventHandlers={{ dragend: (event) => { const point = event.target.getLatLng(); onPinChange?.({ latitude: point.lat, longitude: point.lng }); } }} />}
      {userPosition && <><Marker position={[userPosition.latitude, userPosition.longitude]} />{radiusKm > 0 && <AnimatedRadiusCircle center={userPosition} radiusKm={radiusKm} />}</>}
      {route.length > 0 && <Polyline positions={route} pathOptions={{ color: '#4b47c5', weight: 5, opacity: .85 }} />}
    </MapContainer>
    {mode === 'browse' && selected && <div className="property-map__route" role="status">
      <div><b>{selected.title}</b>{routeMessage && <span> · {routeMessage}</span>}
        {routeSteps.length > 0 && <ol>{routeSteps.slice(0, 5).map((step, index) => <li key={`${index}-${step.name}`}>
          {step.instruction ?? (step.name ? `Continue on ${step.name}` : 'Continue along the route')}{step.distance > 0 && ` · ${formatDistance(step.distance)}`}
        </li>)}</ol>}
      </div>
      <button type="button" onClick={() => { setSelected(null); setRoute([]); setRouteMessage(''); setRouteSteps([]); lastRouteRequest.current = null; }}>Clear route</button>
    </div>}
    {mode === 'pick' && <p className="property-map__coordinates">{pin ? `Exact pin: ${pin.latitude.toFixed(6)}, ${pin.longitude.toFixed(6)}` : 'No map pin selected yet.'}</p>}
  </section>;
}

function distanceKm(from: MapPin, to: MapPin) {
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const dLat = radians(to.latitude - from.latitude); const dLon = radians(to.longitude - from.longitude);
  const value = Math.sin(dLat / 2) ** 2 + Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function radiusBounds(center: MapPin, radiusKm: number) {
  const radiusMeters = radiusKm * 1000;
  const latitudeDelta = radiusMeters / 111_320;
  const longitudeDelta = radiusMeters / (111_320 * Math.max(0.01, Math.cos(center.latitude * Math.PI / 180)));
  return L.latLngBounds(
    [center.latitude - latitudeDelta, center.longitude - longitudeDelta],
    [center.latitude + latitudeDelta, center.longitude + longitudeDelta],
  );
}

function AnimatedRadiusCircle({ center, radiusKm }: { center: MapPin; radiusKm: number }) {
  const radiusMeters = radiusKm * 1000;
  const [animatedRadius, setAnimatedRadius] = useState(radiusMeters);
  const previousRadius = useRef(radiusMeters);
  useEffect(() => {
    const from = previousRadius.current;
    const startedAt = performance.now();
    let frame = 0;
    const animate = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 520);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextRadius = from + (radiusMeters - from) * eased;
      previousRadius.current = nextRadius;
      setAnimatedRadius(nextRadius);
      if (progress < 1) frame = window.requestAnimationFrame(animate);
      else previousRadius.current = radiusMeters;
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [radiusMeters]);
  return <Circle center={[center.latitude, center.longitude]} radius={animatedRadius} pathOptions={{ color: '#31265f', weight: 2, fillOpacity: .07 }} />;
}

function zoomTargetForRadius(radiusKm: number) {
  // Larger search radii deliberately use smaller zoom levels; smaller radii zoom closer.
  // Keep the radius circle at a useful visual size while leaving fitBounds free to zoom out if needed.
  const zoomByRadius: Record<number, number> = { 0: 10, 2: 14, 5: 13, 10: 12, 25: 11 };
  return zoomByRadius[radiusKm] ?? 11;
}

function formatDistance(distance: number) { return distance >= 1000 ? `${(distance / 1000).toFixed(1)} km` : `${Math.round(distance)} m`; }
