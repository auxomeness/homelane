interface RangePreset { id: string; label: string; min: string; max: string }
const presets: RangePreset[] = [
  { id: 'any', label: 'Any price', min: '', max: '' },
  { id: '0-10000', label: '₱0–₱10,000', min: '', max: '10000' },
  { id: '10000-50000', label: '₱10,000–₱50,000', min: '10000', max: '50000' },
  { id: '50000-100000', label: '₱50,000–₱100,000', min: '50000', max: '100000' },
  { id: '100000-250000', label: '₱100,000–₱250,000', min: '100000', max: '250000' },
  { id: '250000-500000', label: '₱250,000–₱500,000', min: '250000', max: '500000' },
  { id: '500000-1000000', label: '₱500,000–₱1,000,000', min: '500000', max: '1000000' },
  { id: '1000000-3000000', label: '₱1,000,000–₱3,000,000', min: '1000000', max: '3000000' },
  { id: '3000000-5000000', label: '₱3,000,000–₱5,000,000', min: '3000000', max: '5000000' },
  { id: '5000000-10000000', label: '₱5,000,000–₱10,000,000', min: '5000000', max: '10000000' },
  { id: '10000000-plus', label: '₱10,000,000+', min: '10000000', max: '' },
];

interface Props { min: string; max: string; onChange: (min: string, max: string) => void }
export default function PriceRangeSelect({ min, max, onChange }: Props) {
  const preset = presets.find((item) => item.min === min && item.max === max);
  const value = preset?.id ?? 'custom';
  return <label className="price-range-select">Price range
    <select aria-label="Price range" value={value} onChange={(event) => {
      const selected = presets.find((item) => item.id === event.target.value);
      if (selected) onChange(selected.min, selected.max);
    }}>
      {!preset && <option value="custom">Current custom range</option>}
      {presets.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
    </select>
  </label>;
}
