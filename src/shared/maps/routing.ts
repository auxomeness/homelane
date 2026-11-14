import type { MapPin } from './PropertyMap.js';
export interface RouteStep { distance: number; name: string; instruction?: string }

export async function locateWalkingRoute(from: MapPin, to: MapPin, signal?: AbortSignal) {
  const options = { locations: [{ lat: from.latitude, lon: from.longitude }, { lat: to.latitude, lon: to.longitude }], costing: 'pedestrian', units: 'kilometers', format: 'osrm', shape_format: 'geojson', directions_type: 'instructions', language: 'en-US' };
  const response = await fetch(`https://valhalla1.openstreetmap.de/route?json=${encodeURIComponent(JSON.stringify(options))}`, { signal });
  if (!response.ok) throw new Error('Route service unavailable');
  const data = await response.json() as { code?: string; routes?: Array<{ geometry?: { coordinates?: [number, number][] }; distance?: number; duration?: number; legs?: Array<{ steps?: RouteStep[] }> }> };
  const result = data.routes?.[0];
  const coordinates = result?.geometry?.coordinates?.filter(([longitude, latitude]) => Number.isFinite(longitude) && Number.isFinite(latitude)).map(([longitude, latitude]) => [latitude, longitude] as [number, number]) ?? [];
  if (data.code !== 'Ok') throw new Error('No walkable route found');
  if (!coordinates.length) throw new Error('No walking route found');
  return { coordinates, distance: result?.distance ?? 0, duration: result?.duration ?? 0, steps: result?.legs?.[0]?.steps ?? [] };
}
