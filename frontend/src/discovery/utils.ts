import type { NotificationCategory, Property, PropertyType } from './types.js';

/* Price formatting */
export const formatPrice = (value: number) => `PHP ${value.toLocaleString('en-PH')}`;
export const formatMillions = (value: number) => `₱${Number((value / 1000000).toFixed(1))}M`;
export const formatPeso = (value: number) => `₱ ${value.toLocaleString('en-PH')}`;

/** Finds one property in a list by id. */
export const getProperty = (properties: Property[], id: string) => properties.find((p) => p.id === id);

/* Options for the search and filter controls (settings, not property records). */
export const areas = ['Concepcion Pequeña', 'Triangulo', 'Sabang', 'Pacol', 'Dayangdang'];
export const propertyTypes: PropertyType[] = ['House', 'Condo', 'Townhouse', 'Duplex'];

export interface PriceRange { id: string; label: string; min: number; max: number }

export const priceRanges: PriceRange[] = [
  { id: 'under-3m', label: 'Under PHP 3M', min: 0, max: 3000000 },
  { id: '3m-6m', label: 'PHP 3M – 6M', min: 3000000, max: 6000000 },
  { id: '6m-10m', label: 'PHP 6M – 10M', min: 6000000, max: 10000000 },
  { id: 'over-10m', label: 'Over PHP 10M', min: 10000000, max: Number.POSITIVE_INFINITY },
];

export const bedroomOptions = [1, 2, 3, 4];

export const notificationCategories: Array<'All' | NotificationCategory> = ['All', 'Messages', 'Offers', 'Viewings', 'Listings'];
