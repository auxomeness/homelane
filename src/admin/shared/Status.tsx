import './status.css'

export type StatusType =  "pending" | "approved" | "cancelled";


interface StatusProps {
    status: StatusType;
}

export default function Status({status}: StatusProps) {
    return(
        <div className={`status-container ${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
    );
}