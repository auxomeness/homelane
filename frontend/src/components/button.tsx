import type {ButtonHTMLAttributes, ReactNode} from 'react'
import './button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  shape?: "rounded" | "pill" | "square";
  fullWidth?: boolean;
}

export default function Button({ 
  children, 
  variant = "primary", 
  size = "medium", 
  className = "",
  type = "button",
  shape = "rounded",
  fullWidth = false,
  ...rest 
}: ButtonProps) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    `btn--${shape}`,
    fullWidth ? "btn--full-width" : "",
    className
  ]
  return (
    <button
    type={type}
    className={classes.filter(Boolean).join(" ")}
    {...rest}
    >
      {children}
    </button>
  );
}