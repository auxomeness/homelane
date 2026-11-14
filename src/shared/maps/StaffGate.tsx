import { Outlet } from 'react-router';
import StaffLogin from './StaffLogin.js';
import { getStaffRole, getStaffToken, setStaffToken } from './listingsApi.js';

export default function StaffGate({ role }: { role: 'agent' | 'admin' }) {
  if (!getStaffToken() || getStaffRole() !== role) { if (getStaffRole() !== role) setStaffToken(null); return <StaffLogin role={role} />; }
  return <Outlet />;
}
