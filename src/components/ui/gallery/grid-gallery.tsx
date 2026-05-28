"use client";

import { useLightbox } from "@components/hooks/use-lightbox";
import { cn } from "@lib/cn";
import { useRef } from "react";
import { GalleryTile } from "./gallery-tile";
import type { GalleryTileData } from "./types";
import "./grid-gallery.css";

export interface GridGalleryProps {
  images: GalleryTileData[];
  className?: string;
}

export function GridGallery({ images, className }: Readonly<GridGalleryProps>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLightbox(containerRef);

  return (
    <div
      className={cn("gallery", className)}
      data-testid="gallery"
      ref={containerRef}
    >
      {images.map((image, index) => (
        <GalleryTile
          image={image}
          index={index}
          key={`${image.url}-${index}`}
        />
      ))}
    </div>
  );
}
