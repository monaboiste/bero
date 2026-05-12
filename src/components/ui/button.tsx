import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  "data-testid"?: string;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-lg px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300";

const variantClasses = {
  primary: "bg-accent text-white shadow-lg hover:bg-accent/90 hover:shadow-xl",
  secondary:
    "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
  ghost: "text-foreground hover:bg-muted",
} as const;

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  onClick,
  "data-testid": dataTestId,
}: Readonly<ButtonProps>) {
  const classes =
    `${baseClasses} ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} data-testid={dataTestId} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      data-testid={dataTestId}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
