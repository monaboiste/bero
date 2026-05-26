"use client";

import { cn } from "@lib/cn";
import { motion } from "motion/react";

export interface MapEmbedProps {
  src: string;
  title?: string;
  className?: string;
  "data-testid"?: string;
}

const viewport = { once: true, margin: "-50px" } as const;
const initial = { opacity: 0, scale: 0.95 };
const whileInView = { opacity: 1, scale: 1 };
const transition = { duration: 0.6, ease: "easeOut", delay: 0.3 } as const;

export function MapEmbed({
  src,
  title = "Location map",
  className = "",
  "data-testid": dataTestId = "contact-map",
}: Readonly<MapEmbedProps>) {
  return (
    <motion.div
      className={cn(
        "aspect-video overflow-hidden rounded-lg bg-muted",
        className
      )}
      data-testid={dataTestId}
      initial={initial}
      transition={transition}
      viewport={viewport}
      whileInView={whileInView}
    >
      <iframe
        allowFullScreen
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        style={{ border: 0 }}
        title={title}
        width="100%"
      />
    </motion.div>
  );
}
