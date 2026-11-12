import { X } from 'lucide-react';
import './loginModal.css';

type LoginModalProps = { isOpen: boolean; onClose: () => void };

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="login-modal__backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="login-modal__close" type="button" aria-label="Close login" onClick={onClose}><X size={20} /></button>
        <p className="visitor-eyebrow">Welcome to Homelane</p>
        <h2 id="login-title">Sign in to find your place</h2>
        <p className="login-modal__intro">Save homes you love and keep your search together.</p>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="visitor-email">Email address</label>
          <input id="visitor-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          <label htmlFor="visitor-password">Password</label>
          <input id="visitor-password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required />
          <button className="login-modal__submit" type="submit">Sign in</button>
        </form>
        <p className="login-modal__signup">New to Homelane? <a href="#signup">Create an account</a></p>
      </section>
    </div>
  );
}
