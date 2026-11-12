import { Search } from 'lucide-react';

type PropertySearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
};

export default function PropertySearch({
  value,
  onChange,
  onSubmit,
  placeholder = 'City, neighborhood, or property type',
  className = 'visitor-search',
  label,
}: PropertySearchProps) {
  return (
    <form className={className} role="search" onSubmit={(event) => { event.preventDefault(); onSubmit?.(value.trim()); }}>
      <div className="visitor-search__field">
        {label && <label htmlFor="visitor-property-search">{label}</label>}
        <input
          id={label ? 'visitor-property-search' : undefined}
          aria-label="Search homes by city, neighborhood, or property type"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      <button type="submit" aria-label="Search homes"><Search size={18} /><span>Search homes</span></button>
    </form>
  );
}
