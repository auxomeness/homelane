import "./card.css";

interface CardProps {
  image?: string;
  status?: string;
  price: number;
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  saved?: boolean;
  onSave?: () => void;
  onClick?: () => void;
}

export default function Card({
  image,
  status = "For sale",
  price,
  title,
  location,
  bedrooms,
  bathrooms,
  area,
  saved = false,
  onSave,
  onClick,
}: CardProps) {
  return (
    <article className="card" onClick={onClick}>
      <div className="card-media">
        {image ? (
          <img src={image} alt={title} className="card-image"/>
        ) : (
          <div className="card-image-placeholder">Image not available</div>
        )}
        <span className="card-tag">{status}</span>
      </div>

      <div className="card-row">
        <p className="card-price">PHP {price.toLocaleString("en-PH")}</p>
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
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-location">{location}</p>
      <div className="card-details">
        <span className="card-bedroom">{bedrooms} bed</span>
        <span className="card-bathroom">{bathrooms} bath</span>
        <span className="card-area">{area} sqft</span>
      </div>
    </article>
  );
}