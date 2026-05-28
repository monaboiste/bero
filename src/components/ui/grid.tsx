import { cn } from "@lib/cn";
import type { ElementType, ReactNode } from "react";

export interface GridProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  "data-testid"?: string;
  gap?: "sm" | "md" | "lg" | "xl";
}

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
} as const;

const colClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const mdColClasses: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

const lgColClasses: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

export function Grid({
  children,
  cols = {},
  gap = "lg",
  as: Tag = "div",
  className,
  "data-testid": dataTestId,
}: Readonly<GridProps>) {
  return (
    <Tag
      className={cn(
        "grid",
        gapClasses[gap],
        cols.sm && colClasses[cols.sm],
        cols.md && mdColClasses[cols.md],
        cols.lg && lgColClasses[cols.lg],
        className
      )}
      data-testid={dataTestId}
    >
      {children}
    </Tag>
  );
}
