import { useLocation, useNavigate } from 'react-router';
import { getDiscoveryPath, type DiscoveryScreen } from './discoveryRoutes.js';

// Returns a function that opens a Discovery screen through the shared React Router.
export default function useDiscoveryNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  return (screen: DiscoveryScreen) => navigate(getDiscoveryPath(screen, location.search));
}
