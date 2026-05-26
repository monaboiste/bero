import { cn } from "@lib/cn";
import type { ReactNode } from "react";

export interface FormStatusProps {
  variant: "success" | "error";
  visible?: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}

const variantClasses = {
  success:
    "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200",
} as const;

export function FormStatus({
  variant,
  visible = false,
  id,
  children,
  className = "",
}: Readonly<FormStatusProps>) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        !visible && "hidden",
        variantClasses[variant],
        className
      )}
      id={id}
      role={variant === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}
