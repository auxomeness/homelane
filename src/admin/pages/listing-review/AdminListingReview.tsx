import { useState } from 'react';
import AdminHeader from '../../shared/AdminHeader';
import AdminNavigation from '../../shared/AdminNavigation';
import CategoryFilter from '../../../components/CategoryFilter';
import { listData, type CategoryStatus } from '../../libs/listData';
import {ListReviewGrid} from '../../shared/ReviewGrid';
import SearchFilter from '../../../components/SearchFIlter';

import './adminListingReviewStyles.css'


export default function AdminListingReview() {

    const [selectedCategory, setSelectedCategory] = useState<CategoryStatus>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredListings = listData.filter((list) => {
        const matchesCategory = selectedCategory === "All" ||
            (selectedCategory === "Rejected" ? list.status === "cancelled" :
                list.status === selectedCategory.toLowerCase());
        const matchesSearch = `${list.title} ${list.location}`.toLowerCase().includes(normalizedQuery);
        return matchesCategory && matchesSearch;
    });
    return(
        <article className="listing-container">
            <AdminHeader/>
            <AdminNavigation/>

            <div id='listing-header'>
                <h1>Listing reviews</h1>
                <p>Property facts, verified agents, and safe locations</p>
            </div>

            <div className="listing-filter">
                <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}/>
                <SearchFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} placeholder='listings'/>
            </div>

            <section className="review-grid-container">
                <div className="review-grid-container-header">
                <h2>Review queue</h2>
                <span>{filteredListings.length} Listings</span>
                </div>

                <div className="review-grid-container-labels">
                        <span>Agent</span>
                        <span>Location</span>
                        <span>Submission</span>
                        <span>Status</span>
                </div>

                {filteredListings.map((list) => (
                    <ListReviewGrid
                        key={list.title}
                        image={list.image}
                        title={list.title}
                        location={list.location}
                        intPrice={list.intPrice}
                        status={list.status}
                        />
                ))}
                {filteredListings.length === 0 && <p className="review-empty">No listings match your filters.</p>}
            </section>
        </article>
    );
}
