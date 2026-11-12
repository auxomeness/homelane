// Shared types for the Discovery module (properties, messages, notifications, viewings).

export type PropertyType = 'House' | 'Condo' | 'Townhouse' | 'Duplex';

export interface Property {
  id: string;
  title: string;
  /** Barangay only. Street addresses are never stored or shown. */
  area: string;
  type: PropertyType;
  price: number;
  bedrooms: number;
  bathrooms: number;
  floorArea: number;
  /** Approximate map position in % (rounded to the nearest 5% on purpose). */
  pinX: number;
  pinY: number;
}

export type OfferStatus = 'Pending' | 'Countered' | 'Accepted' | 'Declined';

export interface ChatMessage {
  id: string;
  /** Matches a participant id in the conversation. */
  senderId: string;
  text?: string;
  time: string;
  offer?: { kind: 'offer' | 'counteroffer'; amount: number; status: OfferStatus; note?: string };
}

export interface Conversation {
  id: string;
  /** Only these users may open the conversation. */
  participantIds: string[];
  buyerName: string;
  agentName: string;
  propertyId: string;
  unread: number;
  /** Short time shown in the inbox row, such as "2m ago". */
  lastTime: string;
  messages: ChatMessage[];
}

export type NotificationCategory = 'Messages' | 'Offers' | 'Viewings' | 'Listings';

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  read: boolean;
  /** Related reference shown on the item. */
  reference: string;
  /** Page the notification links to. */
  link?: 'messages' | 'map' | 'viewings';
}

/** Offer summary shown when the Offers category is selected. Offers are non-binding. */
export interface OfferSummary {
  id: string;
  propertyId: string;
  agentInitials: string;
  proposed: number;
  time: string;
  status: OfferStatus;
}

/** A viewing request stays "Not confirmed" until the agent responds. */
export type ViewingStatus = 'Not confirmed' | 'Confirmed';

export interface ViewingRequest {
  id: string;
  propertyId: string;
  status: ViewingStatus;
  /** Small heading shown on the left of the card. */
  heading: string;
  requested: string;
  note?: string;
}
