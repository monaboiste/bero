import { cn } from "@lib/cn";
import type { ElementType, ReactNode } from "react";

export interface TextProps {
  children: ReactNode;
  variant?: "body" | "lead" | "muted" | "caption";
  as?: ElementType;
  className?: string;
  "data-testid"?: string;
}

const variantClasses = {
  body: "text-base leading-relaxed",
  lead: "text-lg leading-relaxed",
  muted: "text-muted-foreground",
  caption: "text-muted-foreground text-sm",
} as const;

export function Text({
  children,
  variant = "body",
  as: Tag = "p",
  className,
  "data-testid": dataTestId,
}: Readonly<TextProps>) {
  return (
    <Tag
      className={cn(variantClasses[variant], className)}
      data-testid={dataTestId}
    >
      {children}
    </Tag>
  );
}
