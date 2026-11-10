import { useState } from 'react';
import AdminHeader from '../../shared/AdminHeader';
import AdminNavigation from '../../shared/AdminNavigation';
import CategoryFilter from '../../../components/CategoryFilter';
import { listData, Lists, type CategoryStatus } from '../../libs/listData';
import ReviewGrid from '../../shared/ReviewGrid';
import SearchFilter from '../../../components/SearchFIlter';

import './adminListingReviewStyles.css'


export default function AdminListingReview() {

    const [selectedCategory, setSelectedCategory] = useState<CategoryStatus>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const totalReviewListings = Lists.length;
    return(
        <div className="listing-container">
            <AdminHeader/>
            <AdminNavigation/>
            
            <div id='listing-header'>
                <h1>Listing reviews</h1>
                <p>Property facts, verified agents, and safe locations</p>
            </div>

            <div className="listing-filter">
                <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}/>
                <SearchFilter searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
            </div>

            <div className="review-grid-container">
                <div className="review-grid-container-header">
                <h2>Review queue</h2>
                <span>{totalReviewListings} Listings</span>
                </div>
                
                <div className="review-grid-container-labels">
                        <span>Property</span>
                        <span>Location</span>
                        <span>Asking price</span>
                        <span>Status</span>
                </div>

                {listData.map((list) => (
                    <ReviewGrid 
                        key={list.title}
                        image={list.image} 
                        title={list.title} 
                        location={list.location} 
                        intPrice={list.intPrice} 
                        status={list.status} 
                        link={list.title}
                        />
                ))}
            </div>
        </div>
    );
}