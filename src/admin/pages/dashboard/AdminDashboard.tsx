import { ListCheck, User } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import AdminHeader from '../../shared/AdminHeader'
import AdminNavigation from '../../shared/AdminNavigation';

import './dashboardPageStyles.css'

import AgentGrid from '../../components/dashboard/AgentGrid';
import ListGrid from '../../components/dashboard/ListGrid';
import { Agents, Lists, listData } from '../../libs/listData';

import { Link, Outlet } from 'react-router';


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
            <StatCard label={'Agent Reviews'} value={Agents.length} href={'agent-reviews'} icon={User}/>
            <StatCard label={'Listing Reviews'} value={listData.length} href={'listing-reviews'} icon={ListCheck}/>
            </div>

            <article id='admin-reviews-container'>
                <section className='admin-reviews'>
                    <div>
                        <h2>Agent reviews</h2>

                        {Agents.map((agent) => (
                            <Link key={agent.name} to="/admin/agent-reviews" className='card-list'>
                            <AgentGrid image={ agent.image } name={ agent.name } title={ agent.title } location={ agent.location } status={ agent.status }/>
                            </Link>

                        ))}
                    </div>

                </section>

                <section className='admin-reviews'>
                    <div>
                        <h2>Listing reviews</h2>


                        {Lists.map((list) => (

                            <Link key={list.name} to="/admin/listing-reviews" className='card-list'>
                            <ListGrid image={ list.image } name={ list.name } title={ list.title } location={ list.location } status={ list.status }/>
                            </Link>

                        ))}
                    </div>
                </section>
            </article>

            <Outlet/>
        </div>
    );
}
