
import { Link } from 'react-router';
import './sharedStyles.css';

interface NavItem {
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    { label: 'Overview', path: '' },
    { label: 'Listing reviews', path: 'listing-reviews' },
    { label: 'Agent reviews', path: 'agent-reviews' },
    { label: 'Viewings', path: 'viewings' }
]

export default function AdminNavigation() {
    return(
        <>
        <nav id='admin-nav'>
            <div className="nav-title">
                <h3>Workspace</h3>
            </div>

 {/* ----------------------- Add links to navbar -------------------------------  */}
            <div className="nav-panel">
                {navItems.map((nav) => (
                    
                        <Link to={`/admin/${nav.path}`} key={nav.label}>
                            <p className='nav'>
                                {nav.label}
                            </p>
                        </Link>
// ----------------------- Add links to navbar ---------------------------------
                ))}
            </div>
        </nav>
        </>
    );
}