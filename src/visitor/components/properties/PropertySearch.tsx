import { Search } from 'lucide-react';

type PropertySearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function PropertySearch({
  value,
  onChange,
  onSubmit,
  placeholder = 'City, neighborhood, or property type',
  className = 'visitor-search',
}: PropertySearchProps) {
  return (
    <form className={className} role="search" onSubmit={(event) => { event.preventDefault(); onSubmit?.(value.trim()); }}>
      <input
        aria-label="Search homes by city, neighborhood, or property type"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="submit" aria-label="Search homes"><Search size={18} /><span>Search homes</span></button>
    </form>
  );
}
