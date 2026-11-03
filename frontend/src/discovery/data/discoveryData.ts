// Fictional sample data for the Discovery module (Naga City, PHP prices).
// No live APIs or databases are used.

/* ---------- Properties (Map Discovery) ---------- */

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

export const properties: Property[] = [
  { id: 'p1', title: 'Three-bedroom home', area: 'Concepcion Pequeña', type: 'House', price: 8500000, bedrooms: 3, bathrooms: 2, floorArea: 145, pinX: 30, pinY: 30 },
  { id: 'p2', title: 'Modern townhouse', area: 'Triangulo', type: 'Townhouse', price: 5200000, bedrooms: 2, bathrooms: 2, floorArea: 96, pinX: 60, pinY: 25 },
  { id: 'p3', title: 'Studio condo unit', area: 'Sabang', type: 'Condo', price: 2400000, bedrooms: 1, bathrooms: 1, floorArea: 32, pinX: 75, pinY: 55 },
  { id: 'p4', title: 'Garden-view family home', area: 'Pacol', type: 'House', price: 11900000, bedrooms: 4, bathrooms: 3, floorArea: 220, pinX: 20, pinY: 65 },
  { id: 'p5', title: 'Corner duplex', area: 'Dayangdang', type: 'Duplex', price: 6800000, bedrooms: 3, bathrooms: 2, floorArea: 130, pinX: 50, pinY: 70 },
  { id: 'p6', title: 'Two-bedroom condo', area: 'Triangulo', type: 'Condo', price: 3600000, bedrooms: 2, bathrooms: 1, floorArea: 54, pinX: 60, pinY: 25 },
];

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

/* ---------- Messages ---------- */

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
  messages: ChatMessage[];
}

/** Mock signed-in user (a buyer). No real authentication is used. */
export const currentUser = { id: 'buyer-1', name: 'Miguel Reyes' };

export const conversations: Conversation[] = [
  {
    id: 'c1', participantIds: ['buyer-1', 'agent-1'], buyerName: 'Miguel Reyes', agentName: 'Xian Humping', propertyId: 'p1', unread: 2,
    messages: [
      { id: 'm1', senderId: 'buyer-1', text: 'Hi! Is the three-bedroom home still available?', time: 'Oct 28, 9:12 AM' },
      { id: 'm2', senderId: 'agent-1', text: 'Yes, it is. Would you like to schedule a viewing?', time: 'Oct 28, 9:40 AM' },
      { id: 'm3', senderId: 'buyer-1', time: 'Oct 29, 2:05 PM', offer: { kind: 'offer', amount: 8000000, status: 'Countered', note: 'Interested at this price.' } },
      { id: 'm4', senderId: 'agent-1', time: 'Oct 30, 10:15 AM', offer: { kind: 'counteroffer', amount: 8300000, status: 'Pending', note: 'The owner can meet at this price.' } },
      { id: 'm5', senderId: 'agent-1', text: 'Let me know what you think of the counteroffer.', time: 'Oct 30, 10:16 AM' },
    ],
  },
  {
    id: 'c2', participantIds: ['buyer-1', 'agent-2'], buyerName: 'Miguel Reyes', agentName: 'Neil Villanueva', propertyId: 'p2', unread: 0,
    messages: [
      { id: 'm1', senderId: 'buyer-1', text: 'Can I bring my family to see the townhouse?', time: 'Oct 25, 4:30 PM' },
      { id: 'm2', senderId: 'agent-2', text: 'Of course. Saturday morning works well.', time: 'Oct 25, 5:02 PM' },
    ],
  },
  {
    id: 'c3', participantIds: ['buyer-1', 'agent-3'], buyerName: 'Miguel Reyes', agentName: 'Syxied Abelado', propertyId: 'p3', unread: 0,
    messages: [
      { id: 'm1', senderId: 'buyer-1', time: 'Oct 20, 11:00 AM', offer: { kind: 'offer', amount: 2200000, status: 'Declined' } },
      { id: 'm2', senderId: 'agent-3', text: 'Sorry, the owner declined this offer.', time: 'Oct 20, 3:20 PM' },
    ],
  },
  // Not shared with the current user, so it is filtered out of the list.
  {
    id: 'c4', participantIds: ['buyer-2', 'agent-1'], buyerName: 'Another Buyer', agentName: 'Xian Humping', propertyId: 'p4', unread: 1,
    messages: [{ id: 'm1', senderId: 'buyer-2', text: 'Private conversation.', time: 'Oct 27, 8:00 AM' }],
  },
];

/* ---------- Notifications ---------- */

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
  /** Page the notification links to, where supported. */
  link?: 'messages' | 'map';
}

export const notifications: NotificationItem[] = [
  { id: 'n1', category: 'Messages', title: 'New message', description: 'Xian Humping sent you a message about the three-bedroom home.', time: '10 min ago', read: false, reference: 'Three-bedroom home · Concepcion Pequeña', link: 'messages' },
  { id: 'n2', category: 'Offers', title: 'Counteroffer received', description: 'A counteroffer of PHP 8,300,000 is waiting for your response. Offers are non-binding.', time: '1 hr ago', read: false, reference: 'Conversation with Xian Humping', link: 'messages' },
  { id: 'n3', category: 'Offers', title: 'Offer update', description: 'Your offer of PHP 2,200,000 was declined.', time: 'Oct 20', read: true, reference: 'Studio condo unit · Sabang', link: 'messages' },
  { id: 'n4', category: 'Viewings', title: 'Viewing response', description: 'The agent responded to your viewing request. Check the viewing status.', time: 'Yesterday', read: false, reference: 'Modern townhouse · Triangulo' },
  { id: 'n5', category: 'Listings', title: 'Listing updated', description: 'The price of this saved listing was updated.', time: 'Oct 26', read: true, reference: 'Garden-view family home · Pacol', link: 'map' },
];

export const notificationCategories: Array<'All' | NotificationCategory> = ['All', 'Messages', 'Offers', 'Viewings', 'Listings'];

/* ---------- Helpers ---------- */

export const formatPrice = (value: number) => `PHP ${value.toLocaleString('en-PH')}`;

export const getProperty = (id: string) => properties.find((p) => p.id === id);
