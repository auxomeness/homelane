import type { ReactNode } from 'react';

interface StateMessageProps {
  title: string;
  text: string;
  /** "loading" shows a spinner, "empty" shows a plain panel. */
  kind?: 'empty' | 'loading';
  children?: ReactNode;
}

// Reusable empty / loading panel used by the Discovery pages.
export default function StateMessage({ title, text, kind = 'empty', children }: StateMessageProps) {
  return (
    <div className="state-message" role={kind === 'loading' ? 'status' : undefined}>
      {kind === 'loading' && <span className="state-message__spinner" aria-hidden="true" />}
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
