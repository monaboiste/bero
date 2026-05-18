"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export interface MapEmbedProps {
  src: string;
  title?: string;
  className?: string;
  "data-testid"?: string;
}

export function MapEmbed({
  src,
  title = "Location map",
  className = "",
  "data-testid": dataTestId = "contact-map",
}: Readonly<MapEmbedProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      className={`aspect-video overflow-hidden rounded-lg bg-muted ${className}`.trim()}
      data-testid={dataTestId}
      initial={{ opacity: 0, scale: 0.95 }}
      ref={ref}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
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
