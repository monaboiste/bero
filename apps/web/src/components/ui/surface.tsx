import { cn } from "@lib/cn";
import type { ElementType, ReactNode } from "react";

export interface SurfaceProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg";
  variant?: "card" | "muted" | "elevated";
}

const variantClasses = {
  card: "border border-border bg-card",
  muted: "bg-muted",
  elevated: "bg-card shadow-lg",
} as const;

const hoverClasses = {
  card: "hover:border-accent hover:shadow-lg",
  muted: "hover:bg-muted/80",
  elevated: "hover:shadow-2xl",
} as const;

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

const roundedClasses = {
  sm: "rounded",
  md: "rounded-lg",
  lg: "rounded-xl",
} as const;

export function Surface({
  children,
  variant = "card",
  hover = false,
  padding = "md",
  rounded = "md",
  as: Tag = "div",
  className,
  "data-testid": dataTestId,
}: Readonly<SurfaceProps>) {
  return (
    <Tag
      className={cn(
        variantClasses[variant],
        roundedClasses[rounded],
        paddingClasses[padding],
        hover && "transition-all duration-300",
        hover && hoverClasses[variant],
        className
      )}
      data-testid={dataTestId}
    >
      {children}
    </Tag>
  );
}
