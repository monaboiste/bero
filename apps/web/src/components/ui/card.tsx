import { cn } from "@lib/cn";
import type { ReactNode } from "react";

export interface CardProps {
  children?: ReactNode;
  className?: string;
  "data-testid"?: string;
  date?: string;
  image: {
    src: string;
    alt: string;
  };
}

export function Card({
  image,
  date,
  className = "",
  children,
  "data-testid": dataTestId,
}: Readonly<CardProps>) {
  return (
    <div className={cn("group h-full", className)} data-testid={dataTestId}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:shadow-2xl">
        <div className="relative aspect-7/8 shrink-0 overflow-hidden">
          {/* biome-ignore lint/correctness/useImageSize: dimensions controlled by aspect-ratio container */}
          <img
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            src={image.src}
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />

          {date && (
            <div className="absolute top-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <span className="rounded-full bg-accent px-3 py-1 text-sm text-white shadow-lg">
                {date}
              </span>
            </div>
          )}
        </div>

        <div className="flex grow flex-col p-4">{children}</div>
      </div>
    </div>
  );
}
