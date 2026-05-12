"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { HeadingTag } from "./types";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  as?: HeadingTag;
  className?: string;
  "data-testid"?: string;
}

export function SectionHeader({
  title,
  subtitle,
  as: Tag = "h2",
  className = "",
  "data-testid": dataTestId,
}: Readonly<SectionHeaderProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className={`mb-10 text-center ${className}`.trim()}
      data-testid={dataTestId}
      initial={{ opacity: 0, y: -30 }}
      ref={ref}
      transition={{ duration: 0.8 }}
    >
      <Tag className="mb-4 text-4xl md:text-5xl">{title}</Tag>

      <motion.div
        animate={isInView ? { scaleX: 1 } : {}}
        className="mx-auto mb-4 h-1 w-20 bg-accent"
        initial={{ scaleX: 0 }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {subtitle && <p className="text-muted-foreground text-xl">{subtitle}</p>}
    </motion.div>
  );
}
