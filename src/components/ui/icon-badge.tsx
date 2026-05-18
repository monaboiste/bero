import type { IconType } from "react-icons";

export interface IconBadgeProps {
  icon: IconType;
  size?: "sm" | "md" | "lg";
  className?: string;
  "data-testid"?: string;
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
      className={`inline-flex items-center justify-center rounded-full bg-accent/10 ${scheme.container} ${className}`.trim()}
      data-icon-size={scheme.icon}
      data-testid={dataTestId}
    >
      <Icon className={`text-accent ${scheme.icon}`} />
    </div>
  );
}
