import { cn } from "@lib/cn";
import type { IconType } from "react-icons";

export interface IconBadgeProps {
  className?: string;
  "data-testid"?: string;
  icon: IconType;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: { container: "h-10 w-10", icon: "h-5 w-5" },
  md: { container: "h-12 w-12", icon: "h-6 w-6" },
  lg: { container: "h-16 w-16", icon: "h-8 w-8" },
} as const;

export function IconBadge({
  icon: Icon,
  size = "md",
  className = "",
  "data-testid": dataTestId,
}: Readonly<IconBadgeProps>) {
  const scheme = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-accent/10",
        scheme.container,
        className
      )}
      data-icon-size={scheme.icon}
      data-testid={dataTestId}
    >
      <Icon className={cn("text-accent", scheme.icon)} />
    </div>
  );
}
