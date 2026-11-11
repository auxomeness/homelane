import { Navigate, Outlet } from 'react-router';
import BuyerHeader from './shared/BuyerHeader.js';
import BuyerNavigation from './shared/BuyerNavigation.js';
import './base.css';

export default function BuyerApp() {
  return (
    <div className="buyer-app">
      <div className="buyer-shell">
        <BuyerHeader />
        <BuyerNavigation />
        <main className="buyer-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function BuyerRoutePlaceholder({ title }: { title: string }) {
  return (
    <section className="buyer-coming-soon">
      <p className="buyer-eyebrow">Buyer workspace</p>
      <h1>{title}</h1>
      <p>This route is ready for the next buyer page.</p>
    </section>
  );
}

export function BuyerIndexRedirect() {
  return <Navigate to="home" replace />;
}

