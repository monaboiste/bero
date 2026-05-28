"use client";

import type { OptimisedImage } from "@components/ui/types";
import { fadeX, scaleIn } from "@lib/motion";
import { motion } from "motion/react";

export interface StorySectionProps {
  "data-testid"?: string;
  image: OptimisedImage;
  mission: string;
  story: string;
}

const imageMotion = fadeX(-50);
const textMotion = fadeX(50, { delay: 0.2 });
const logoMotion = scaleIn({ delay: 0.4 });

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
        loading="lazy"
        sizes={image.sizes}
        src={image.src}
        srcSet={image.srcSet}
        width={image.width}
        {...imageMotion}
      />

      <div>
        <motion.p className="mb-6 text-lg leading-relaxed" {...textMotion}>
          {story}
        </motion.p>

        <motion.p
          className="text-muted-foreground leading-relaxed"
          {...textMotion}
        >
          {mission}
        </motion.p>

        <motion.div className="mt-8" {...logoMotion}>
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
