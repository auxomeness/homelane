import { MoveRight, type LucideIcon } from "lucide-react";
import "./dashboard.css"

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
        <div className="card-container">
            <div className="card-title">
                <Icon size={20}/>
                <h4>{label}</h4>
            </div>

            <div className="card-bottom">
                <div className="card-total">{value}</div>

                <a href={href} className="card-link">
                    <span>View reviews</span>
                    <MoveRight size={15}/>
                </a>    
            </div>
        </div>
    );
}