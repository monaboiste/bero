"use client";

import type { OptimisedImage } from "@components/ui/types";
import { motion } from "motion/react";

export interface StorySectionProps {
  story: string;
  mission: string;
  image: OptimisedImage;
  "data-testid"?: string;
}

const viewport = { once: true, margin: "-100px" } as const;

const fadeLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
};

const fadeRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay: 0.2 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, delay: 0.4 },
};

export function StorySection({
  story,
  mission,
  image,
  "data-testid": dataTestId = "about-story",
}: Readonly<StorySectionProps>) {
  return (
    <div
      className="mb-20 grid items-center gap-12 md:grid-cols-2"
      data-testid={dataTestId}
    >
      <motion.img
        alt={image.alt}
        className="h-auto w-full rounded-lg shadow-xl"
        height={image.height}
        initial={fadeLeft.initial}
        loading="lazy"
        sizes={image.sizes}
        src={image.src}
        srcSet={image.srcSet}
        transition={fadeLeft.transition}
        viewport={viewport}
        whileInView={fadeLeft.whileInView}
        width={image.width}
      />

      <div>
        <motion.p
          className="mb-6 text-lg leading-relaxed"
          initial={fadeRight.initial}
          transition={fadeRight.transition}
          viewport={viewport}
          whileInView={fadeRight.whileInView}
        >
          {story}
        </motion.p>

        <motion.p
          className="text-muted-foreground leading-relaxed"
          initial={fadeRight.initial}
          transition={fadeRight.transition}
          viewport={viewport}
          whileInView={fadeRight.whileInView}
        >
          {mission}
        </motion.p>

        <motion.div
          className="mt-8"
          initial={scaleIn.initial}
          transition={scaleIn.transition}
          viewport={viewport}
          whileInView={scaleIn.whileInView}
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
