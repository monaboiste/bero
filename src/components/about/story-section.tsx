"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export interface StorySectionProps {
  story: string;
  mission: string;
  imageUrl: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  "data-testid"?: string;
}

export function StorySection({
  story,
  mission,
  imageUrl,
  imageAlt = "",
  imageWidth,
  imageHeight,
  "data-testid": dataTestId = "about-story",
}: Readonly<StorySectionProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      className="mb-20 grid items-center gap-12 md:grid-cols-2"
      data-testid={dataTestId}
      ref={ref}
    >
      <motion.img
        alt={imageAlt}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        className="h-auto w-full rounded-lg shadow-xl"
        height={imageHeight}
        initial={{ opacity: 0, x: -50 }}
        loading="lazy"
        src={imageUrl}
        transition={{ duration: 0.8 }}
        width={imageWidth}
      />

      <div>
        <motion.p
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="mb-6 text-lg leading-relaxed"
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {story}
        </motion.p>

        <motion.p
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {mission}
        </motion.p>

        <motion.div
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span
            className="font-accent text-3xl text-accent md:text-4xl"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Bero
          </span>
        </motion.div>
      </div>
    </div>
  );
}
