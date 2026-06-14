import { cn } from "@lib/cn";
import type { ElementType, ReactNode } from "react";

export interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
}

export function Container({
  children,
  as: Tag = "div",
  className,
  "data-testid": dataTestId,
}: Readonly<ContainerProps>) {
  return (
    <Tag
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      data-testid={dataTestId}
    >
      {children}
    </Tag>
  );
}
