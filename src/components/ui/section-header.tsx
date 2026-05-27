"use client";

import { cn } from "@lib/cn";
import { fadeY, scaleLine, viewportDeep } from "@lib/motion";
import { motion } from "motion/react";
import type { HeadingTag } from "./types";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  as?: HeadingTag;
  className?: string;
  "data-testid"?: string;
}

const containerMotion = {
  ...fadeY(-30),
  viewport: viewportDeep,
  transition: { duration: 0.8 },
};
const lineMotion = scaleLine({ delay: 0.2, origin: "center" });

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
      {...containerMotion}
    >
      <Tag className="mb-4 text-4xl md:text-5xl">{title}</Tag>

      <motion.div className="mx-auto mb-4 h-1 w-20 bg-accent" {...lineMotion} />

      {subtitle && <p className="text-muted-foreground text-xl">{subtitle}</p>}
    </motion.div>
  );
}
