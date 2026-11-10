import AdminHeader from '../../shared/AdminHeader';
import AdminNavigation from '../../shared/AdminNavigation';
import './agentReviewPagesStyles.css'

export default function AdminAgentReview() {
    return(
        <section className="agent-container">
            <AdminHeader/>
            <AdminNavigation/>
            <h1>Admin agent review page</h1>
        </section>

    );
}
