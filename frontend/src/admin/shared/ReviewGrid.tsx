import { Link } from "react-router";

import "./sharedStyles.css"

import Status, { type StatusType } from "./Status";
import { MoveRight } from "lucide-react";

interface ReviewGridProps {
    image: string,
    title: string;
    location: string;
    intPrice: number;
    status: StatusType
    link:string;
}


export default function ReviewGrid({ 
    image,
    title,
    location,
    intPrice,
    status,
    link
}: ReviewGridProps) {
    
    // format for pricing
    const formattedNumber = Intl.NumberFormat("en-US", { 
        maximumFractionDigits: 2,
         }
    ).format(intPrice)

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
                        <span> &#8369; {formattedNumber}</span>
                    </div>

                    <div className="review-status">
                        <Status status={status}/>
                    </div>

                <Link to={`/admin/${link}`} key={link} viewTransition>
                    <div className="review-action">
                        <span key={link}>View Details</span>
                        
                        <div>
                        <MoveRight size={15}/>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}