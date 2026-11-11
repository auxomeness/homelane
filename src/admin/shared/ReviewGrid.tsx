
import { Link } from 'react-router';
import './sharedStyles.css'
import Status, {type StatusType } from './Status';

interface AgentReviewGridProps {
        image: string,
        name: string;
        location: string;
        submission: string;
        status: StatusType;
}

interface ListReviewGridProps {
    image: string,
    title: string;
    location: string;
    intPrice: number;
    status: StatusType;
}


export function AgentReviewGrid( {
    image,
    name,
    location,
    submission,
    status
}: AgentReviewGridProps) {
    return(
        <Link to={'/'}>
        <section className="review-container">
                        <div className="review-name">
                            <div className="review-name-image">
                            {image}
                            </div>
                            <h3>{name}</h3>
                        </div>
        
                            <div className="review-location">
                                {location}
                            </div>
        
                            <div className="review-price">
                                <p>Submitted on {submission} </p>
                            </div>
        
                            <div className="review-status">
                                <Status status={status}/>
                            </div>
        
                    </section>
        </Link>
    );
}

export function ListReviewGrid({
    image,
    title,
    location,
    intPrice,
    status,
}: ListReviewGridProps) {

    // format for pricing
    const formattedNumber = Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
         }
    ).format(intPrice)

    return(
        <Link to={'/'}>
            <section className="review-container">
                <div className="review-name">
                    <div className="review-name-image">
                    {image}
                    </div>
                    <h3>{title}</h3>
                </div>

                    <div className="review-location">
                        {location}
                    </div>

                    <div className="review-price">
                        <span> &#8369; {formattedNumber}</span>
                    </div>

                    <div className="review-status">
                        <Status status={status}/>
                    </div>

            </section>
        </Link>
    );
}
