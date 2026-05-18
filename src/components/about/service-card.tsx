"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export interface ServiceCardProps {
  title: string;
  description: string;
  className?: string;
  "data-testid"?: string;
}

export function ServiceCard({
  title,
  description,
  className = "",
  "data-testid": dataTestId = "service-card",
}: Readonly<ServiceCardProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className={`h-full rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-accent hover:shadow-lg ${className}`.trim()}
      data-testid={dataTestId}
      ref={ref}
    >
      <motion.div
        animate={isInView ? { scaleX: 1 } : {}}
        className="mb-4 h-1 w-12 bg-accent"
        initial={{ scaleX: 0 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <h4 className="mb-3 text-xl">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
