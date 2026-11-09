import type {
  CategoryStatus,
  CategoryFilterProps,
} from "../admin/libs/listData";

import "./categoryFilter.css";

const categories: CategoryStatus[] = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
];

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-btn ${
            selectedCategory === category ? "active" : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          { category }
        </button>
      ))}
    </div>
  );
}