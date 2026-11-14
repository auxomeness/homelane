export type PropertyType = 'House' | 'Condo' | 'Townhouse' | 'Residential lot';

export type PropertyListing = {
  id: string;
  title: string;
  location: string;
  postalCode: string;
  type: PropertyType;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
};

export const buyerListings: PropertyListing[] = [
  { id: 'pacol-family', title: 'Garden-view family home', location: 'Pacol, Naga City', postalCode: '4400', type: 'House', price: 8_500_000, bedrooms: 3, bathrooms: 2, area: 145 },
  { id: 'concepcion-home', title: 'Three-bedroom home', location: 'Concepcion Pequeña, Naga City', postalCode: '4400', type: 'House', price: 8_500_000, bedrooms: 3, bathrooms: 2, area: 145 },
  { id: 'triangulo-condo', title: 'Two-bedroom condo', location: 'Triangulo, Naga City', postalCode: '4400', type: 'Condo', price: 2_400_000, bedrooms: 2, bathrooms: 1, area: 68 },
  { id: 'dayangdang-duplex', title: 'Corner duplex', location: 'Dayangdang, Naga City', postalCode: '4400', type: 'Townhouse', price: 5_200_000, bedrooms: 3, bathrooms: 2, area: 112 },
  { id: 'magsaysay-house', title: 'Modern family home', location: 'Magsaysay Avenue, Naga City', postalCode: '4400', type: 'House', price: 11_900_000, bedrooms: 4, bathrooms: 3, area: 190 },
  { id: 'pacol-townhouse', title: 'Newly built townhouse', location: 'Pacol, Naga City', postalCode: '4400', type: 'Townhouse', price: 3_600_000, bedrooms: 2, bathrooms: 2, area: 96 },
  { id: 'pacol-lot', title: 'Residential lot near the city', location: 'Pacol, Naga City', postalCode: '4400', type: 'Residential lot', price: 4_200_000, area: 180 },
];
