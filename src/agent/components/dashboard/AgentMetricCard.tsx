import type { LucideIcon } from 'lucide-react';
import './dashboard.css';

interface AgentMetricCardProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

export default function AgentMetricCard({ label, value, detail, icon: Icon }: AgentMetricCardProps) {
  return (
    <article className="agent-metric-card">
      <div className="agent-metric-card__label"><Icon size={20} /><h2>{label}</h2></div>
      <div className="agent-metric-card__value">{value}</div>
      <p>{detail}</p>
    </article>
  );
}
