export type AgentListingStatus = 'active' | 'pending' | 'rejected' | 'draft';

export interface AgentListingData {
  id: string;
  title: string;
  location: string;
  price: string;
  status: AgentListingStatus;
  statusLabel: string;
  actionLabel: string;
  propertyType?: string;
  description?: string;
  photos?: string[];
  bedrooms?: number;
  bathrooms?: number;
  floorArea?: number;
}

export const agentListings: AgentListingData[] = [
  {
    id: 'villa-concepcion',
    title: '3BR Villa in Concepcion Pequeña',
    location: 'Naga City, Camarines Sur',
    price: '₱ 8,500,000',
    status: 'active',
    statusLabel: 'Active / Live',
    actionLabel: 'View listing',
  },
  {
    id: 'condo-magsaysay',
    title: '2BR Condo on Magsaysay Avenue',
    location: 'Naga City, Camarines Sur',
    price: '₱ 6,200,000',
    status: 'pending',
    statusLabel: 'Pending review',
    actionLabel: 'Preview draft',
  },
  {
    id: 'lot-pacol',
    title: 'Residential Lot in Pacol',
    location: 'Naga City, Camarines Sur',
    price: '₱ 2,950,000',
    status: 'rejected',
    statusLabel: 'Action required',
    actionLabel: 'Fix and resubmit',
  },
];
