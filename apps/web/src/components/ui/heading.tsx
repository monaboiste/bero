import { cn } from "@lib/cn";
import type { ReactNode } from "react";
import type { HeadingTag } from "./types";

export interface HeadingProps {
  as?: HeadingTag;
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
  size?: "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const sizeClasses = {
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl md:text-5xl",
  "5xl": "text-5xl md:text-6xl lg:text-7xl",
} as const;

export function Heading({
  children,
  as: Tag = "h2",
  size = "4xl",
  className,
  "data-testid": dataTestId,
}: Readonly<HeadingProps>) {
  return (
    <Tag className={cn(sizeClasses[size], className)} data-testid={dataTestId}>
      {children}
    </Tag>
  );
}
