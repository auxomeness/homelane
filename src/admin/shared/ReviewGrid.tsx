import type { list } from "../libs/listData";

import "./reviewGrid.css"

export default function ReviewGrid({ 
    image,
    title,
    location,
    intPrice,
    status,
    action
 }: list) {
    return(
        <div className="review-container">
            <div className="review-name">
                <div className="review-name-image">
                {image}
                </div>
                <h3>{title}</h3>
            </div>
                
            <div className="review-details">    
                    <div className="review-location">
                        {location}
                    </div>
                    
                    <div className="review-price">
                        {intPrice}
                    </div>
                    
                    <div className="review-status">
                        {status}
                    </div>

                    <div className="review-action">
                        {action && JSON.stringify(action)}
                    </div>
            </div>
        </div>
    );
}