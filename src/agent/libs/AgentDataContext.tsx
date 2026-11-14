import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createListing as createListingRequest, deleteListing as deleteListingRequest, getStaffListings, updateListing as updateListingRequest, type ListingInput, type PropertyListing } from '../../shared/maps/listingsApi.js';
import type { AgentListingData, AgentListingStatus } from './listData.js';

export interface AgentInquiry { id: string; name: string; property: string; message: string; time: string; status: 'new' | 'read' | 'replied'; replies?: string[] }
export interface AgentProfile { name: string; credential: string; city: string; verified: boolean }
type ListingDraft = Omit<ListingInput, 'status'>;
interface AgentWorkspaceData { listings: AgentListingData[]; inquiries: AgentInquiry[]; profile: AgentProfile }
interface AgentDataValue extends AgentWorkspaceData {
  loading: boolean; error: string; reload: () => Promise<void>;
  createListing: (draft: ListingDraft, submitForReview: boolean) => Promise<void>;
  updateListing: (id: string, draft: ListingDraft, submitForReview?: boolean) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
  updateProfile: (profile: AgentProfile) => void; markInquiryRead: (id: string) => void; replyToInquiry: (id: string, message: string) => void;
}
const statusText = (status: AgentListingStatus) => ({ status, statusLabel: status === 'draft' ? 'Draft' : status === 'pending' ? 'Pending review' : status === 'rejected' ? 'Action required' : 'Active / Live', actionLabel: status === 'draft' || status === 'rejected' ? 'Edit listing' : 'View listing' });
function adaptListing(listing: PropertyListing): AgentListingData {
  return { ...listing, bedrooms: listing.bedrooms ?? undefined, bathrooms: listing.bathrooms ?? undefined, floorArea: listing.floorArea ?? undefined, price: `₱ ${Number(listing.price).toLocaleString('en-PH')}`, ...statusText(listing.status) };
}

const AgentDataContext = createContext<AgentDataValue | null>(null);
export function AgentDataProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<AgentListingData[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const [inquiries, setInquiries] = useState<AgentInquiry[]>([]);
  const [profile, setProfile] = useState<AgentProfile>({ name: 'Homelane Agent', credential: 'Property professional', city: 'Philippines', verified: false });
  const reload = useCallback(async () => { setLoading(true); setError(''); try { setListings((await getStaffListings()).map(adaptListing)); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to load listings.'); } finally { setLoading(false); } }, []);
  useEffect(() => { void reload(); }, [reload]);
  const value = useMemo<AgentDataValue>(() => ({
    listings, inquiries, profile, loading, error, reload,
    createListing: async (draft, submit) => { const listing = await createListingRequest({ ...draft, status: submit ? 'pending' : 'draft' }); setListings((current) => [adaptListing(listing), ...current]); },
    updateListing: async (id, draft, submit = false) => { const previous = listings.find((listing) => listing.id === id); const listing = await updateListingRequest(id, { ...draft, status: submit ? 'pending' : previous?.status ?? 'draft' }); setListings((current) => current.map((item) => item.id === id ? adaptListing(listing) : item)); },
    deleteListing: async (id) => { await deleteListingRequest(id); setListings((current) => current.filter((listing) => listing.id !== id)); },
    updateProfile: setProfile,
    markInquiryRead: (id) => setInquiries((current) => current.map((item) => item.id === id && item.status === 'new' ? { ...item, status: 'read' } : item)),
    replyToInquiry: (id, message) => setInquiries((current) => current.map((item) => item.id === id ? { ...item, status: 'replied', replies: [...(item.replies ?? []), message] } : item)),
  }), [listings, inquiries, profile, loading, error, reload]);
  return <AgentDataContext.Provider value={value}>{children}</AgentDataContext.Provider>;
}
export function useAgentData() { const context = useContext(AgentDataContext); if (!context) throw new Error('useAgentData must be used within AgentDataProvider'); return context; }
