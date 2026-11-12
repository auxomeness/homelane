export type PropertyType = 'House' | 'Condo' | 'Townhouse';
export type PropertySort = 'recommended' | 'price-low' | 'price-high';

export type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: PropertyType;
  description: string;
  visibility: 'public' | 'private';
  tag?: string;
};

// The project currently has no shared listings API. These visitor-only sample
// listings are explicitly public demo data and can be replaced by an API later.
const propertyData: Property[] = [
  {
    id: 1,
    title: 'Modern family home',
    location: 'Nuvali, Santa Rosa, Laguna',
    price: 6850000,
    bedrooms: 3,
    bathrooms: 2,
    area: 126,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    type: 'House',
    description: 'A light-filled family home in a peaceful Nuvali neighborhood, with comfortable living spaces and room to grow.',
    visibility: 'public',
    tag: 'Featured',
  },
  {
    id: 2,
    title: 'Bright city apartment',
    location: 'Makati City, Metro Manila',
    price: 4200000,
    bedrooms: 2,
    bathrooms: 1,
    area: 68,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
    type: 'Condo',
    description: 'A bright, easy-to-maintain apartment close to Makati offices, restaurants, and everyday conveniences.',
    visibility: 'public',
    tag: 'New listing',
  },
  {
    id: 3,
    title: 'Garden-side townhouse',
    location: 'Marikina Heights, Marikina',
    price: 5750000,
    bedrooms: 3,
    bathrooms: 3,
    area: 104,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',
    type: 'Townhouse',
    description: 'A welcoming townhouse with a garden-side outlook, generous bedrooms, and space for a home office.',
    visibility: 'public',
  },
];

export function getPublicProperties(): Property[] {
  return propertyData.filter((property) => property.visibility === 'public');
}

export type PropertyFilters = {
  query?: string;
  bedrooms?: number | 'any';
  sort?: PropertySort;
};

export function filterProperties(properties: Property[], filters: PropertyFilters = {}): Property[] {
  const query = filters.query?.trim().toLocaleLowerCase();
  const filtered = properties.filter((property) => {
    const matchesQuery = !query || [property.title, property.location, property.type]
      .some((value) => value.toLocaleLowerCase().includes(query));
    const matchesBedrooms = filters.bedrooms === undefined || filters.bedrooms === 'any'
      || property.bedrooms >= filters.bedrooms;
    return matchesQuery && matchesBedrooms;
  });

  if (filters.sort === 'price-low') return filtered.sort((a, b) => a.price - b.price);
  if (filters.sort === 'price-high') return filtered.sort((a, b) => b.price - a.price);
  return filtered;
}
