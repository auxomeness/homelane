import { useNavigate } from 'react-router';
import { discoveryPaths, type DiscoveryScreen } from './DiscoveryNavigation.js';

// Returns a function that opens a Discovery screen through the shared React Router.
export default function useDiscoveryNavigate() {
  const navigate = useNavigate();
  return (screen: DiscoveryScreen) => navigate(discoveryPaths[screen]);
}
