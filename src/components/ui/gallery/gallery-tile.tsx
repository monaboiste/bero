"use client";

import { cn } from "@lib/cn";
import { fadeY } from "@lib/motion";
import { motion } from "motion/react";
import type { GalleryTileData } from "./types";

export interface GalleryTileProps {
  image: GalleryTileData;
  index: number;
}

const tileMotion = fadeY(40);

export function GalleryTile({ image, index }: Readonly<GalleryTileProps>) {
  const isLandscape = image.orientation === "landscape";

  return (
    <motion.a
      className={cn(
        "glightbox gallery-tile-link block",
        isLandscape && "gallery-tile--landscape"
      )}
      data-gallery={image.gallery ?? "gallery"}
      data-height="calc(100vh - 4rem)"
      data-tags={image.tags?.join(",")}
      data-testid="gallery-tile"
      data-type="image"
      href={image.url}
      key={`${image.url}-${index}`}
      {...tileMotion}
    >
      <div className="gallery-tile group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <img
          alt={image.thumbnail.alt}
          className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          height={image.thumbnail.height}
          loading="lazy"
          sizes={image.thumbnail.sizes}
          src={image.thumbnail.src}
          srcSet={image.thumbnail.srcSet}
          width={image.thumbnail.width}
        />
        <div
          className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-black/80 to-transparent px-3 pt-8 pb-3 transition-transform duration-300 group-hover:translate-y-0"
          data-testid="gallery-tile-caption"
        >
          <p className="text-sm text-white">{image.title}</p>
        </div>
      </div>
    </motion.a>
  );
}
