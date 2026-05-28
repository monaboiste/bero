"use client";

import { cn } from "@lib/cn";
import { scaleIn } from "@lib/motion";
import { motion } from "motion/react";

export interface MapEmbedProps {
  className?: string;
  "data-testid"?: string;
  src: string;
  title?: string;
}

const mapMotion = scaleIn({ scale: 0.95, delay: 0.3 });

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
      {...mapMotion}
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
