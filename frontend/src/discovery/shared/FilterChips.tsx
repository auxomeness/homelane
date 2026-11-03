export interface AppliedFilter {
  key: string;
  label: string;
}

interface FilterChipsProps {
  filters: AppliedFilter[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

// Applied-filter chips with a Clear Filters button.
export default function FilterChips({ filters, onRemove, onClearAll }: FilterChipsProps) {
  if (filters.length === 0) return null;
  return (
    <div className="filter-chips" aria-label="Applied filters">
      {filters.map((filter) => (
        <span className="filter-chip" key={filter.key}>
          {filter.label}
          <button type="button" aria-label={`Remove filter ${filter.label}`} onClick={() => onRemove(filter.key)}>×</button>
        </span>
      ))}
      <button type="button" className="filter-chips__clear" onClick={onClearAll}>Clear Filters</button>
    </div>
  );
}
