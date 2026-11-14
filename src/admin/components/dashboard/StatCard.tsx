import { MoveRight, type LucideIcon } from "lucide-react";
import "./dashboardComponentStyles.css"
import { Link } from "react-router";

interface StatCardProps {
    label: string;
    value: number;
    href: string;
    icon: LucideIcon;
}

export default function StatCard({
    label,
    value,
    href,
    icon: Icon
}: StatCardProps) {
    return (
        <section className="card-container">
            <div className="card-title">
                <Icon size={20}/>
                <h4>{label}</h4>
            </div>

            <div className="card-bottom">
                <div className="card-total">{value}</div>

                <Link to={`/admin/${href}`} className="card-link" viewTransition>
                    <span>View reviews</span>
                    <MoveRight size={15}/>
                </Link>    
            </div>
        </section>
    );
}