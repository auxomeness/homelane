import "./sharedStyles.css"

import Status, { type StatusType } from "./Status";

interface ReviewGridProps {
    image: string,
    title: string;
    location: string;
    intPrice: number;
    status: StatusType;
}


export default function ReviewGrid({
    image,
    title,
    location,
    intPrice,
    status,
}: ReviewGridProps) {

    // format for pricing
    const formattedNumber = Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
         }
    ).format(intPrice)

    return(
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
    );
}
