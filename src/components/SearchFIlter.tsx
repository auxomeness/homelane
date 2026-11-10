import type { SeearchFilterProps } from "../admin/libs/listData";

import "./searchFilter.css"

export default function SearchFilter({
    searchQuery,
    onSearchChange,
}:SeearchFilterProps) {
    return(
        <div className="search-filter">
            <input
                type="search"
                placeholder="Search properties"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
                />
        </div>
    );
}