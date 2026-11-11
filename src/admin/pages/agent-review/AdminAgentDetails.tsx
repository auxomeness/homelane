import { ArrowLeft } from "lucide-react";
import type { AgentReviewGridProps } from "../../libs/listData";
import { Link } from "react-router";


export default function AdminAgentDetails({
    image,
    name,
    location,
    submission,
    title,
    status
}: AgentReviewGridProps) {
    return(
        
        <main className="agent-details-container">

            <Link to={"/admin/agent-reviews"}>
            <div className="back">
                <ArrowLeft/>
            </div>
            </Link>

            <header className="agent-details-header">
                <h2>Agent details</h2>
                <span>Review the agent's profile and credentials </span>
            </header>

            <section className="agent-content">
                <div className="agent-profile">
                    {image}
                </div>

                <div className="agent-name">
                <h3>{name}</h3>
                <span>{location}</span> | 
                <span>{submission}</span>
                </div>

                <div className="agent-status">
                    <span>{title}</span>
                    <div>
                        {status}
                    </div>
                </div>

            </section>
        </main>
    );
}