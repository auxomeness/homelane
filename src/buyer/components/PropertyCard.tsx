import './PropertyCard.css';

interface CardProps {
  className?: string;
  image?: string;
  placeholderText?: string;
  status?: string;
  price: number;
  title: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  areaUnit?: string;
  saved?: boolean;
  showSaveAction?: boolean;
  onSave?: () => void;
  onClick?: () => void;
}

export default function Card({
  className = "",
  image,
  placeholderText = "Image not available",
  status = "For sale",
  price,
  title,
  location,
  bedrooms,
  bathrooms,
  area,
  areaUnit = "sqft",
  saved = false,
  showSaveAction = true,
  onSave,
  onClick,
}: CardProps) {
  return (
    <article className={`card ${className}`.trim()} onClick={onClick}>
      <div className="card-media">
        {image ? (
          <img src={image} alt={title} className="card-image"/>
        ) : (
          <div className="card-image-placeholder">{placeholderText}</div>
        )}
        <span className="card-tag">{status}</span>
      </div>

      <div className="card-row">
        <p className="card-price">{new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(price)}</p>
        {showSaveAction && (
          <button
            type="button"
            className={`card-save-button ${saved ? "saved" : ""}`}
            aria-label={saved ? "Unsave" : "Save"}
            onClick={(e) => {
              e.stopPropagation();
              onSave?.();
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
          </button>
        )}
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-location">{location}</p>
      <div className="card-details">
        {bedrooms != null && <span className="card-bedroom">{bedrooms} bed</span>}
        {bathrooms != null && <span className="card-bathroom">{bathrooms} bath</span>}
        <span className="card-area">{area} {areaUnit}</span>
      </div>
    </article>
  );
}

