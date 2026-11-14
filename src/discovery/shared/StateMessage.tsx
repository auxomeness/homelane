import type { ReactNode } from 'react';
import Icon, { type IconName } from './Icon.js';

interface StateMessageProps {
  title: string;
  text: string;
  /** "loading" shows a spinner, "empty" shows the icon circle. */
  kind?: 'empty' | 'loading';
  /** Icon shown inside the circle for empty states. */
  icon?: IconName;
  children?: ReactNode;
}

// Reusable empty / loading panel used by the Discovery pages (circle icon, heading, text, optional button).
export default function StateMessage({ title, text, kind = 'empty', icon, children }: StateMessageProps) {
  return (
    <div className="state-message" role={kind === 'loading' ? 'status' : undefined}>
      {kind === 'loading' && <span className="state-message__spinner" aria-hidden="true" />}
      {kind === 'empty' && icon && <span className="state-message__icon"><Icon name={icon} size={32} /></span>}
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
