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

// No public listing source is currently connected to the visitor app.
export function getPublicProperties(): Property[] {
  return [];
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
