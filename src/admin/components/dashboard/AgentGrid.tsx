import Status, { type StatusType } from '../../shared/Status';

import './dashboardComponentStyles.css'

interface AgentGridProps {
    image: string;
    name: string;
    title: string;
    location: string;
    status: StatusType;
}

export default function AgentGrid({
    image,
    name,
    title,
    location,
    status
}: AgentGridProps) {
    return(
        <div className="grid-container">
           
            <div className="grid-logo">
                { image }
            </div>

            <div className="grid-details">
                <h4 className='grid-name'>{ name }</h4>
                <div className="grid-sub-details">
                <p>{ title }</p>
                | 
                <p className='grid-loc'>{ location }</p>
                </div>
            </div>

            <div>
                <Status status={status} />
            </div>
        </div>
    );
}