import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { agentListings, type AgentListingData, type AgentListingStatus } from './listData.js';

const STORAGE_KEY = 'homelane.agent.workspace.v1';

export interface AgentInquiry {
  id: string;
  name: string;
  property: string;
  message: string;
  time: string;
  status: 'new' | 'read' | 'replied';
  replies?: string[];
}

export interface AgentProfile {
  name: string;
  credential: string;
  city: string;
  verified: boolean;
}

interface AgentWorkspaceData {
  listings: AgentListingData[];
  inquiries: AgentInquiry[];
  profile: AgentProfile;
}

interface ListingDraft {
  title: string;
  location: string;
  price: number;
  propertyType: string;
  description: string;
  photos: string[];
  bedrooms?: number;
  bathrooms?: number;
  floorArea?: number;
}

interface AgentDataValue extends AgentWorkspaceData {
  createListing: (draft: ListingDraft, submitForReview: boolean) => void;
  updateListing: (id: string, draft: ListingDraft, submitForReview?: boolean) => void;
  deleteListing: (id: string) => void;
  updateProfile: (profile: AgentProfile) => void;
  markInquiryRead: (id: string) => void;
  replyToInquiry: (id: string, message: string) => void;
}

const initialData: AgentWorkspaceData = {
  listings: agentListings,
  inquiries: [
    { id: 'inquiry-elena', name: 'Elena Alano', property: '3BR Villa in Concepcion Pequeña', message: 'Is Saturday viewing available?', time: '10 minutes ago', status: 'new' },
    { id: 'inquiry-juan', name: 'Juan Dela Cruz', property: '3BR Villa in Concepcion Pequeña', message: 'Can I see the floor plan?', time: 'Yesterday', status: 'read' },
  ],
  profile: { name: 'Shan Cruz', credential: 'PRC #0029182', city: 'Naga City, PH', verified: true },
};

function readWorkspace(): AgentWorkspaceData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...initialData, ...JSON.parse(stored) } as AgentWorkspaceData;
  } catch {
    // Ignore unavailable storage or invalid saved data and use the demo workspace.
  }
  return initialData;
}

const AgentDataContext = createContext<AgentDataValue | null>(null);

export function AgentDataProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState<AgentWorkspaceData>(readWorkspace);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
    } catch {
      // Keep the current session usable if browser storage is unavailable or full.
    }
  }, [workspace]);

  const value = useMemo<AgentDataValue>(() => {
    const statusFields = (status: AgentListingStatus) => ({
      status,
      statusLabel: status === 'draft' ? 'Draft' : status === 'pending' ? 'Pending review' : status === 'rejected' ? 'Action required' : 'Active / Live',
      actionLabel: status === 'draft' || status === 'rejected' ? 'Edit listing' : 'View listing',
    });

    return {
      ...workspace,
      createListing: (draft, submitForReview) => {
        const id = globalThis.crypto?.randomUUID?.() ?? `listing-${Date.now()}`;
        const status = submitForReview ? 'pending' : 'draft';
        setWorkspace((current) => ({
          ...current,
          listings: [{ id, ...draft, price: `₱ ${Number(draft.price).toLocaleString('en-PH')}`, ...statusFields(status) }, ...current.listings],
        }));
      },
      updateListing: (id, draft, submitForReview = false) => {
        setWorkspace((current) => ({
          ...current,
          listings: current.listings.map((listing) => listing.id === id ? {
            ...listing,
            ...draft,
            price: `₱ ${Number(draft.price).toLocaleString('en-PH')}`,
            ...statusFields(submitForReview ? 'pending' : listing.status),
          } : listing),
        }));
      },
      deleteListing: (id) => setWorkspace((current) => ({ ...current, listings: current.listings.filter((listing) => listing.id !== id) })),
      updateProfile: (profile) => setWorkspace((current) => ({ ...current, profile })),
      markInquiryRead: (id) => setWorkspace((current) => ({
        ...current,
        inquiries: current.inquiries.map((inquiry) => inquiry.id === id && inquiry.status === 'new' ? { ...inquiry, status: 'read' } : inquiry),
      })),
      replyToInquiry: (id, message) => setWorkspace((current) => ({
        ...current,
        inquiries: current.inquiries.map((inquiry) => inquiry.id === id ? { ...inquiry, status: 'replied', replies: [...(inquiry.replies ?? []), message] } : inquiry),
      })),
    };
  }, [workspace]);

  return <AgentDataContext.Provider value={value}>{children}</AgentDataContext.Provider>;
}

export function useAgentData() {
  const context = useContext(AgentDataContext);
  if (!context) throw new Error('useAgentData must be used within AgentDataProvider');
  return context;
}
