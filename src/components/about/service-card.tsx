"use client";

import { cn } from "@lib/cn";
import { motion } from "motion/react";

export interface ServiceCardProps {
  title: string;
  description: string;
  className?: string;
  "data-testid"?: string;
}

const viewport = { once: true, margin: "-50px" } as const;
const lineInitial = { scaleX: 0 };
const lineWhileInView = { scaleX: 1 };
const lineTransition = { duration: 0.6, delay: 0.3 };

export function ServiceCard({
  title,
  description,
  className = "",
  "data-testid": dataTestId = "service-card",
}: Readonly<ServiceCardProps>) {
  return (
    <div
      className={cn(
        "h-full rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-accent hover:shadow-lg",
        className
      )}
      data-testid={dataTestId}
    >
      <motion.div
        className="mb-4 h-1 w-12 bg-accent"
        initial={lineInitial}
        style={{ transformOrigin: "left" }}
        transition={lineTransition}
        viewport={viewport}
        whileInView={lineWhileInView}
      />
      <h4 className="mb-3 text-xl">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
