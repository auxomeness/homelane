import { useState } from 'react';
import AdminHeader from '../../shared/AdminHeader';
import AdminNavigation from '../../shared/AdminNavigation';
import CategoryFilter from '../../../components/CategoryFilter';
import { Agents, type CategoryStatus } from '../../libs/listData';
import SearchFilter from '../../../components/SearchFIlter';

import './adminAgentReviewStyles.css'
import { AgentReviewGrid } from '../../shared/ReviewGrid';


export default function AdminAgentReview() {

    const [selectedCategory, setSelectedCategory] = useState<CategoryStatus>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredAgents = Agents.filter((agent) => {
        const matchesCategory = selectedCategory === "All" ||
            (selectedCategory === "Rejected" ? agent.status === "cancelled" :
                agent.status === selectedCategory.toLowerCase());
        const matchesSearch = `${agent.title} ${agent.location}`.toLowerCase().includes(normalizedQuery);
        return matchesCategory && matchesSearch;
    });
    return(
        <main className="agent-container">
            <AdminHeader/>
            <AdminNavigation/>

            <div id='agent-header'>
                <h1>Agent reviews</h1>
                <p>Manage and review agent submissions</p>
            </div>

            <div className="agent-filter">
                <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}/>
                <SearchFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} placeholder='agents'/>
            </div>

            <section className="review-grid-container">
                <div className="review-grid-container-header">
                <h2>Review queue</h2>
                <span>{filteredAgents.length} Submissions</span>
                </div>

                <div className="review-grid-container-labels">
                        <span>Agent</span>
                        <span>Location</span>
                        <span>Submission</span>
                        <span>Status</span>
                </div>

                {filteredAgents.map((agent) => (
                    <AgentReviewGrid 
                    image={agent.image} 
                    name={agent.name} 
                    location={agent.location} 
                    submission={agent.name} 
                    status={agent.status}/>
                ))}
                {filteredAgents.length === 0 && <p className="review-empty">No listings match your filters.</p>}
            </section>
        </main>
    );
}
