import '../sharedStyles.css';

interface NavItem {
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    { label: 'Overview', path: '/' },
    { label: 'Listing reviews', path: 'listing-reviews' },
    { label: 'Agent reviews', path: 'agent-reviews' },
    { label: 'Viewings', path: 'viewings' }
]

export default function AdminNavigation() {
    return(
        <>
        <section id='admin-nav'>
            <div className="nav-title">
                <h3>Workspace</h3>
            </div>

            <div className="nav-panel">
                {navItems.map((nav) => (
                    <p key={nav.label} className='nav'>
                        {nav.label}
                    </p>
                ))}
            </div>
        </section>
        </>
    );
}