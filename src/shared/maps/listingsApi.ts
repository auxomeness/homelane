export type ListingStatus = 'draft' | 'pending' | 'active' | 'rejected';
export interface PropertyListing {
  id: string; title: string; location: string; price: number; propertyType: string; description: string; photos: string[];
  bedrooms: number | null; bathrooms: number | null; floorArea: number | null; latitude: number; longitude: number;
  status: ListingStatus; createdAt: string; updatedAt: string;
}
export interface ListingInput { title: string; location: string; price: number; propertyType: string; description: string; photos: string[]; bedrooms?: number | null; bathrooms?: number | null; floorArea?: number | null; latitude: number; longitude: number; status: ListingStatus }
export interface StaffSession { token: string; user: { email: string; role: 'admin' | 'agent' } }

const API_URL = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');
const TOKEN_KEY = 'homelane.staff-token.v1';
const ROLE_KEY = 'homelane.staff-role.v1';
export const getStaffToken = () => sessionStorage.getItem(TOKEN_KEY);
export const getStaffRole = () => sessionStorage.getItem(ROLE_KEY);
export const setStaffToken = (token: string | null, role?: 'agent' | 'admin') => { if (token) { sessionStorage.setItem(TOKEN_KEY, token); if (role) sessionStorage.setItem(ROLE_KEY, role); } else { sessionStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(ROLE_KEY); } };

async function request<T>(path: string, init: RequestInit = {}, staff = false): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body) headers.set('Content-Type', 'application/json');
  const token = getStaffToken();
  if (staff && token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error ?? `Request failed (${response.status}).`);
  return payload as T;
}

export const loginStaff = async (email: string, password: string) => {
  const session = await request<StaffSession>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  setStaffToken(session.token, session.user.role);
  return session.user;
};
export const getPublicListings = async () => (await request<{ listings: PropertyListing[] }>('/listings')).listings;
export const getStaffListings = async () => (await request<{ listings: PropertyListing[] }>('/staff/listings', {}, true)).listings;
export const createListing = async (listing: ListingInput) => (await request<{ listing: PropertyListing }>('/staff/listings', { method: 'POST', body: JSON.stringify(listing) }, true)).listing;
export const updateListing = async (id: string, listing: ListingInput) => (await request<{ listing: PropertyListing }>(`/staff/listings/${id}`, { method: 'PUT', body: JSON.stringify(listing) }, true)).listing;
export const reviewListing = async (id: string, status: ListingStatus, latitude: number, longitude: number) => (await request<{ listing: PropertyListing }>(`/staff/listings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, latitude, longitude }) }, true)).listing;
export const deleteListing = async (id: string) => request<{ ok: boolean }>(`/staff/listings/${id}`, { method: 'DELETE' }, true);

declare global { interface ImportMetaEnv { readonly VITE_API_URL?: string } }
