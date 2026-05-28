import { cn } from "@lib/cn";
import type { ReactNode } from "react";
import { Container } from "./container";

export interface SectionProps {
  background?: "default" | "secondary";
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
  id?: string;
  spacing?: "sm" | "md" | "lg";
}

const spacingClasses = {
  sm: "py-10",
  md: "py-14",
  lg: "py-20",
} as const;

const backgroundClasses = {
  default: "",
  secondary: "bg-secondary",
} as const;

export function Section({
  children,
  id,
  background = "default",
  spacing = "lg",
  className,
  "data-testid": dataTestId,
}: Readonly<SectionProps>) {
  return (
    <section
      className={cn(
        "overflow-x-hidden",
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      data-testid={dataTestId}
      id={id}
    >
      <Container>{children}</Container>
    </section>
  );
}
