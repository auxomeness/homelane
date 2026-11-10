import { useState } from 'react';
import AdminHeader from '../../shared/AdminHeader';
import AdminNavigation from '../../shared/AdminNavigation';
import './adminListingReviewStyles.css'
import CategoryFilter from '../../shared/CategoryFilter';
import type { CategoryStatus } from '../../libs/listData';
import ReviewGrid from '../../shared/ReviewGrid';



export default function AdminListingReview() {

    const [selectedCategory, setSelectedCategory] = useState<CategoryStatus>("All");

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
            </div>

            <ReviewGrid image={''} title={'xian'} location={'bombon'} intPrice={320000} status={'All'} action={"ee"}/>
        </div>
    );
}