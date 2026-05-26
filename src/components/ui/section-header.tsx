"use client";

import { cn } from "@lib/cn";
import { motion } from "motion/react";
import type { HeadingTag } from "./types";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  as?: HeadingTag;
  className?: string;
  "data-testid"?: string;
}

const viewport = { once: true, margin: "-100px" } as const;
const containerInitial = { opacity: 0, y: -30 };
const containerWhileInView = { opacity: 1, y: 0 };
const containerTransition = { duration: 0.8 };

const lineInitial = { scaleX: 0 };
const lineWhileInView = { scaleX: 1 };
const lineTransition = { duration: 0.8, delay: 0.2 };

export function SectionHeader({
  title,
  subtitle,
  as: Tag = "h2",
  className = "",
  "data-testid": dataTestId,
}: Readonly<SectionHeaderProps>) {
  return (
    <motion.div
      className={cn("mb-10 text-center", className)}
      data-testid={dataTestId}
      initial={containerInitial}
      transition={containerTransition}
      viewport={viewport}
      whileInView={containerWhileInView}
    >
      <Tag className="mb-4 text-4xl md:text-5xl">{title}</Tag>

      <motion.div
        className="mx-auto mb-4 h-1 w-20 bg-accent"
        initial={lineInitial}
        style={{ transformOrigin: "center" }}
        transition={lineTransition}
        viewport={viewport}
        whileInView={lineWhileInView}
      />

      {subtitle && <p className="text-muted-foreground text-xl">{subtitle}</p>}
    </motion.div>
  );
}
