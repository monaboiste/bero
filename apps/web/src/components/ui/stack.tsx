import { cn } from "@lib/cn";
import type { ElementType, ReactNode } from "react";

export interface StackProps {
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  as?: ElementType;
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
  direction?: "column" | "row";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
}

const gapClasses = {
  none: "",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
} as const;

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
} as const;

export function Stack({
  children,
  direction = "column",
  gap = "md",
  align,
  justify,
  wrap = false,
  as: Tag = "div",
  className,
  "data-testid": dataTestId,
}: Readonly<StackProps>) {
  return (
    <Tag
      className={cn(
        "flex",
        direction === "column" ? "flex-col" : "flex-row",
        gapClasses[gap],
        align && alignClasses[align],
        justify && justifyClasses[justify],
        wrap && "flex-wrap",
        className
      )}
      data-testid={dataTestId}
    >
      {children}
    </Tag>
  );
}
