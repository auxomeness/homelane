import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, MapPin, UploadCloud } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import Button from '../../../components/button.js';
import { useAgentData } from '../../libs/AgentDataContext.js';
import type { AgentListingData } from '../../libs/listData.js';
import './addListingStyles.css';

const propertyTypes = ['House', 'Condo', 'Townhouse', 'Lot'];
const initialForm = { title: '', location: '', price: '', propertyType: 'House', description: '', photos: [] as string[], bedrooms: '', bathrooms: '', floorArea: '' };
type ListingForm = typeof initialForm;

function toForm(listing: AgentListingData): ListingForm {
  return {
    title: listing.title,
    location: listing.location,
    price: listing.price.replace(/[^\d.]/g, ''),
    propertyType: listing.propertyType ?? 'House',
    description: listing.description ?? '',
    photos: listing.photos ?? [],
    bedrooms: listing.bedrooms?.toString() ?? '',
    bathrooms: listing.bathrooms?.toString() ?? '',
    floorArea: listing.floorArea?.toString() ?? '',
  };
}

function readPhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Could not read this photo.'));
    reader.onerror = () => reject(new Error('Could not read this photo.'));
    reader.readAsDataURL(file);
  });
}

export default function AgentAddListing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { listings, createListing, updateListing } = useAgentData();
  const listingToEdit = listings.find((listing) => listing.id === editId);
  const [form, setForm] = useState<ListingForm>(listingToEdit ? toForm(listingToEdit) : initialForm);
  const [step, setStep] = useState<'details' | 'preview'>('details');
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(listingToEdit ? toForm(listingToEdit) : initialForm);
    setStep('details');
  }, [editId, listingToEdit]);

  const change = (field: keyof ListingForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const addPhotos = async (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (selected.some((file) => file.size > 1_200_000)) {
      setError('Each photo must be 1.2 MB or smaller.');
      return;
    }
    if (form.photos.length + selected.length > 4) {
      setError('You can add up to four photos.');
      return;
    }
    try {
      const photos = await Promise.all(selected.map(readPhoto));
      setForm((current) => ({ ...current, photos: [...current.photos, ...photos] }));
      setError('');
    } catch {
      setError('One or more photos could not be loaded. Please try again.');
    }
  };

  const removePhoto = (index: number) => setForm((current) => ({ ...current, photos: current.photos.filter((_, photoIndex) => photoIndex !== index) }));

  const toDraft = () => ({
    title: form.title.trim(),
    location: form.location.trim(),
    price: Number(form.price),
    propertyType: form.propertyType,
    description: form.description.trim(),
    photos: form.photos,
    bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
    bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
    floorArea: form.floorArea ? Number(form.floorArea) : undefined,
  });

  const save = (submitForReview: boolean) => {
    const draft = toDraft();
    if (editId && listingToEdit) updateListing(editId, draft, submitForReview);
    else createListing(draft, submitForReview);
    navigate('/agent/my-listings');
  };

  const continueToPreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Number(form.price) <= 0) {
      setError('Enter a price greater than zero.');
      return;
    }
    setError('');
    setStep('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (editId && !listingToEdit) return <main className="agent-add-listing"><h1>Listing not found</h1><Button className="agent-button agent-button--secondary" variant="secondary" onClick={() => navigate('/agent/my-listings')}>Back to my listings</Button></main>;

  return (
    <main className="agent-add-listing">
      <div className="agent-page-heading">
        <div><h1>{step === 'preview' ? 'Preview your listing' : editId ? 'Edit property listing' : 'Add property listing'}</h1><p>{step === 'preview' ? 'Review the details before saving or submitting.' : 'Add accurate details to help buyers find your property.'}</p></div>
        <Button className="agent-button agent-button--secondary" variant="secondary" onClick={() => navigate('/agent/my-listings')}>Cancel</Button>
      </div>

      {step === 'details' ? <form className="agent-add-listing__form" onSubmit={continueToPreview}>
        <section className="agent-form-section agent-form-photo">
          <h2>Property photos <span className="agent-form-optional">Optional</span></h2>
          <label className="agent-photo-upload">
            <UploadCloud size={27} />
            <strong>Add property photos</strong>
            <span>JPG, PNG or WebP · up to 4 photos, 1.2 MB each</span>
            <input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={addPhotos} />
          </label>
          {!!form.photos.length && <div className="agent-photo-previews">{form.photos.map((photo, index) => <figure key={`${index}-${photo.slice(-18)}`}><img src={photo} alt={`Selected property ${index + 1}`} /><button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => removePhoto(index)}>×</button></figure>)}</div>}
        </section>

        <section className="agent-form-section agent-form-property-type">
          <h2>Property details</h2>
          <span className="agent-field-label">Property type</span>
          <div className="agent-property-types" role="group" aria-label="Property type">
            {propertyTypes.map((type) => <button type="button" className={form.propertyType === type ? 'is-selected' : ''} aria-pressed={form.propertyType === type} key={type} onClick={() => change('propertyType', type)}>{type}</button>)}
          </div>
          <label className="agent-field-label" htmlFor="listing-price">Price in PHP</label>
          <input id="listing-price" className="agent-form-input" type="number" min="1" step="any" value={form.price} onChange={(event) => change('price', event.target.value)} placeholder="e.g. 8500000" required />
          <label className="agent-field-label" htmlFor="listing-location">Location</label>
          <input id="listing-location" className="agent-form-input" value={form.location} onChange={(event) => change('location', event.target.value)} placeholder="Barangay, city, province" required />
          <div className="agent-form-number-grid">
            <label className="agent-field-label" htmlFor="listing-bedrooms">Bedrooms<input id="listing-bedrooms" className="agent-form-input" type="number" min="0" value={form.bedrooms} onChange={(event) => change('bedrooms', event.target.value)} /></label>
            <label className="agent-field-label" htmlFor="listing-bathrooms">Bathrooms<input id="listing-bathrooms" className="agent-form-input" type="number" min="0" value={form.bathrooms} onChange={(event) => change('bathrooms', event.target.value)} /></label>
            <label className="agent-field-label" htmlFor="listing-floor-area">Floor area (m²)<input id="listing-floor-area" className="agent-form-input" type="number" min="0" value={form.floorArea} onChange={(event) => change('floorArea', event.target.value)} /></label>
          </div>
        </section>

        <section className="agent-form-section agent-form-description">
          <h2>Listing information</h2>
          <label className="agent-field-label" htmlFor="listing-title">Listing title</label>
          <input id="listing-title" className="agent-form-input" value={form.title} onChange={(event) => change('title', event.target.value)} minLength={6} maxLength={100} placeholder="e.g. Modern 3BR Villa with Garden" required />
          <label className="agent-field-label" htmlFor="listing-description">Description</label>
          <textarea id="listing-description" className="agent-form-textarea" value={form.description} onChange={(event) => change('description', event.target.value)} minLength={20} maxLength={2000} placeholder="Describe the property, its features, and nearby amenities…" required />
        </section>

        <section className="agent-form-section agent-form-facts"><h2>Submission</h2><p>Save this as a draft, or continue to review your details before submitting it for admin review.</p></section>
        {error && <p className="agent-form-error" role="alert">{error}</p>}
        <div className="agent-add-listing__actions"><Button className="agent-button agent-button--secondary" variant="secondary" type="button" onClick={() => save(false)}>Save draft</Button><Button className="agent-button agent-button--primary agent-add-listing__next" size="medium" type="submit"><span>Continue to map and preview</span><ArrowRight size={17} /></Button></div>
      </form> : <div className="agent-add-listing__form agent-listing-preview">
        <section className="agent-form-section agent-listing-preview__main">
          {form.photos[0] ? <img className="agent-listing-preview__hero" src={form.photos[0]} alt={`${form.title} preview`} /> : <div className="agent-listing-preview__hero agent-listing-preview__hero--empty">Property cover preview</div>}
          <span className="agent-status-pill agent-status-pill--pending">Pending review</span><h2>{form.title}</h2><p><MapPin size={16} />{form.location}</p><strong>₱ {Number(form.price).toLocaleString('en-PH')}</strong><p>{form.description}</p>
          <div className="agent-listing-preview__facts"><span>{form.propertyType}</span>{form.bedrooms && <span>{form.bedrooms} bedrooms</span>}{form.bathrooms && <span>{form.bathrooms} bathrooms</span>}{form.floorArea && <span>{form.floorArea} m²</span>}</div>
          {form.photos.length > 1 && <div className="agent-photo-previews">{form.photos.slice(1).map((photo, index) => <figure key={`preview-${index}`}><img src={photo} alt={`${form.title} photo ${index + 2}`} /></figure>)}</div>}
        </section>
        <section className="agent-form-section agent-map-preview"><MapPin size={24} /><div><h2>Map preview</h2><p>{form.location}</p><a href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(form.location)}`} target="_blank" rel="noreferrer">Open this location on a map</a></div></section>
        <div className="agent-add-listing__actions"><Button className="agent-button agent-button--secondary" variant="secondary" onClick={() => setStep('details')}><ArrowLeft size={17} />Back to details</Button><Button className="agent-button agent-button--secondary" variant="secondary" onClick={() => save(false)}>Save draft</Button><Button className="agent-button agent-button--primary" size="medium" onClick={() => save(true)}>Submit for review</Button></div>
      </div>}
    </main>
  );
}
