import { ListCheck, MoveRight, User } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import AdminHeader from '../../shared/AdminHeader'
import AdminNavigation from '../../shared/AdminNavigation';

import './dashboardStyles.css'

import AgentGrid from '../../components/dashboard/AgentGrid';
import ListGrid from '../../components/dashboard/ListGrid';
import { Link, Outlet } from 'react-router';

const Agents = [
    {
        image:'', name: "Xian Humping de los reyes", title: "PRC#0029182", location: "Naga City, PH", status: "pending"
    },
    {
        image:'', name: "Neil Anlene Villanueva", title: "PRC#0029183", location: "San Fernando City, PH", status: "approved"
    },
    {
        image:'', name: "Syxied Sebven Abelado", title: "PRC#0029182", location: "Naga City, PH", status: "cancelled"
    },
] as const

const Lists = [
    {
        image:'', name: "Ateneo de Naga University", title: "PRC#0029182", location: "Naga City, PH", status: "pending"
    },
    {
        image:'', name: "BGC Courtside", title: "PRC#0029183", location: "San Fernando City, PH", status: "approved"
    },
    {
        image:'', name: "Molave Town Street", title: "PRC#0029182", location: "Naga City, PH", status: "cancelled"
    },
] as const

export default function AdminDashboard() {
    return(
        <div className='admin-container'>
            <AdminHeader/>
            <AdminNavigation/>

            <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>An overview of agent applications and property listing reviews.</p>
            </div>

            <div className="admin-stat">
            <StatCard label={'Agent Reviews'} value={0} href={'agent-reviews'} icon={User}/>
            <StatCard label={'Listing Reviews'} value={12} href={'listing-reviews'} icon={ListCheck}/>
            </div>

            <article id='admin-reviews-container'>
                <section className='admin-reviews'>
                    <div className="agent-reviews-card">
                        <h2>Agent reviews</h2>

                        {Agents.map((agent) => (
                            <AgentGrid image={ agent.image } name={ agent.name } title={ agent.title } location={ agent.location } status={ agent.status }/>
                            
                        ))}
                    </div>

                    <div className="card-section-breaker"></div>

                    <Link to="/admin/agent-reviews" className="card-link" viewTransition>
                    <p>View all agent reviews</p>
                    <MoveRight size={15}/>
                    </Link> 
                </section>

                <section className='admin-reviews'>
                    <div className="agent-reviews-card">
                        <h2>Listing reviews</h2>

                        {Lists.map((list) => (
                            <ListGrid image={ list.image } name={ list.name } title={ list.title } location={ list.location } status={ list.status }/>
                            
                        ))}
                    </div>

                    <div className="card-section-breaker"></div>

                    <Link to="/admin/listing-reviews" className="card-link" viewTransition>
                    <p>View all listing reviews</p>
                    <MoveRight size={15}/>
                    </Link> 
                </section>
            </article>

            <Outlet/>
        </div>
    );
}