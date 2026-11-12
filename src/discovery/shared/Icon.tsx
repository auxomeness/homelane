import type { ReactNode } from 'react';

export type IconName =
  | 'message' | 'tag' | 'eye' | 'home' | 'calendar' | 'chat' | 'info' | 'check' | 'chevron-down' | 'chevron-up' | 'chevron-right' | 'arrow-right' | 'search' | 'pin' | 'x' | 'tick';

const paths: Record<IconName, ReactNode> = {
  message: <path d="M21 12a8 8 0 0 1-11.7 7L4 20l1.1-4.6A8 8 0 1 1 21 12z" />,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1.5" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  home: <path d="M4 21V10l8-6 8 6v11h-5v-6H9v6H4z" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  chat: <path d="M4 5h16v11H9l-5 4V5z" />,
  info: <><circle cx="12" cy="12" r="9.5" fill="currentColor" stroke="none" /><path d="M12 11v6M12 7.5v.5" stroke="#fff" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l3 3 5-6" /></>,
  'chevron-down': <path d="M6 9l6 6 6-6" />,
  'chevron-up': <path d="M6 15l6-6 6 6" />,
  'chevron-right': <path d="M9 6l6 6-6 6" />,
  pin: <><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  tick: <path d="M5 12l5 5 9-10" />,
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4-4" /></>,
};

interface IconProps {
  name: IconName;
  size?: number;
}

// Small stroke icon set used inside Discovery cards (the header and footer icons are the Figma SVG assets).
export default function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
