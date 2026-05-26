"use client";

import { cn } from "@lib/cn";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { GalleryImage } from "./types";
import "./grid-gallery.css";

export interface GridGalleryProps {
  images: GalleryImage[];
  className?: string;
}

const tileInitial = { opacity: 0, y: 40 };
const tileWhileInView = { opacity: 1, y: 0 };
const tileTransition = { duration: 0.5, ease: "easeOut" } as const;
const tileViewport = { once: true, margin: "-50px" } as const;

export function GridGallery({ images, className }: Readonly<GridGalleryProps>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    let destroyed = false;
    let cleanup: (() => void) | null = null;

    async function init() {
      const GLightbox = (await import("glightbox")).default;

      if (destroyed) {
        return;
      }

      const lightbox = GLightbox({
        selector: ".glightbox",
        skin: "bero",
        // Disable GLightbox's built-in touch/drag navigation entirely.
        // Its touchNavigation relies on stale UA-sniffing (isMobile/isTouch)
        // and has an `imageZoomed` flag that can get stuck, permanently
        // blocking swipe. Its draggable binds mousedown/up/move which fires
        // alongside pointer events. Both systems would double-fire
        // nextSlide/prevSlide together with our custom handler below,
        // causing a visible "flash" (GLightbox has no guard against
        // concurrent navigation calls). We replace them with a single
        // pointer-event-based handler that works on both desktop and mobile.
        touchNavigation: false,
        draggable: false,
        loop: false,
        zoomable: false,
        moreLength: 0,
      });

      // Swipe / drag navigation via Pointer Events.
      // Works uniformly across desktop (mouse) and mobile (touch) because
      // PointerEvent abstracts both input types. We guard against
      // concurrent navigations with an `isAnimating` flag so that rapid
      // swipes cannot cause a double-fire flash.
      const SWIPE_THRESHOLD = 50;
      const TAP_THRESHOLD = 10;
      const ANIMATION_SETTLE_MS = 400; // GLightbox slide animation is 300ms

      let startX: number | null = null;
      let startY: number | null = null;
      let tracking = false;
      let isAnimating = false;
      let descVisible = false;

      function onPointerDown(e: PointerEvent): void {
        if (!e.isPrimary) {
          return;
        }
        startX = e.clientX;
        startY = e.clientY;
        tracking = true;
      }

      function handleSwipe(dx: number): void {
        isAnimating = true;
        if (dx < 0) {
          lightbox.nextSlide();
        } else {
          lightbox.prevSlide();
        }
        setTimeout(() => {
          isAnimating = false;
        }, ANIMATION_SETTLE_MS);
      }

      function handleTap(dx: number, dy: number): void {
        const isTap =
          Math.abs(dx) < TAP_THRESHOLD && Math.abs(dy) < TAP_THRESHOLD;
        if (isTap && document.body.classList.contains("glightbox-mobile")) {
          descVisible = !descVisible;
          syncDescVisibility(true);
        }
      }

      function onPointerUp(e: PointerEvent): void {
        if (!(tracking && e.isPrimary) || startX === null || startY === null) {
          return;
        }

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        startX = null;
        startY = null;
        tracking = false;

        if (isAnimating) {
          return;
        }

        // Only act on predominantly-horizontal swipes
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
          handleSwipe(dx);
          return;
        }

        // Tap (no significant movement) on mobile: toggle description mode
        handleTap(dx, dy);
      }

      function onPointerCancel(): void {
        startX = null;
        startY = null;
        tracking = false;
      }

      function hideAllMobileDescs(): void {
        for (const d of document.querySelectorAll(".gslide-desc-visible")) {
          d.classList.remove("gslide-desc-visible");
        }
      }

      function syncDescVisibility(animate: boolean): void {
        if (!document.body.classList.contains("glightbox-mobile")) {
          return;
        }
        hideAllMobileDescs();
        if (!descVisible) {
          return;
        }
        const slide = document.querySelector(".gslide.current");
        const desc = slide?.querySelector(
          ".gslide-description"
        ) as HTMLElement | null;
        if (!desc) {
          return;
        }
        if (!animate) {
          desc.style.transition = "none";
        }
        desc.classList.add("gslide-desc-visible");
        if (!animate) {
          // Force reflow so the browser commits the change without transition
          desc.offsetHeight;
          desc.style.transition = "";
        }
      }

      // On mobile, GLightbox sets an inline `height` on <img> from the
      // data-height attribute (meant for desktop padding only). Remove it
      // so the image can size naturally via CSS object-fit: contain.
      function clearMobileInlineHeight(): void {
        if (!document.body.classList.contains("glightbox-mobile")) {
          return;
        }
        const img = document.querySelector(
          ".gslide.current .gslide-image img"
        ) as HTMLImageElement | null;
        if (img) {
          img.style.height = "";
        }
      }

      // Prevent default click behavior on tiles so GLightbox handles opening
      for (const tile of document.querySelectorAll(".glightbox")) {
        tile.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          },
          { capture: true }
        );
      }

      lightbox.on("open", () => {
        const slider = document.getElementById("glightbox-slider");
        if (!slider) {
          return;
        }
        slider.addEventListener("pointerdown", onPointerDown);
        slider.addEventListener("pointerup", onPointerUp);
        slider.addEventListener("pointercancel", onPointerCancel);
        clearMobileInlineHeight();
        descVisible = true;
      });

      lightbox.on("slide_before_change", ((data: {
        current: { slideIndex: number };
      }) => {
        if (
          !(descVisible && document.body.classList.contains("glightbox-mobile"))
        ) {
          return;
        }
        // data.current.slideNode is unreliable (GLightbox bug: still points to
        // the old slide), so look up the incoming slide by index instead.
        const slides = document.querySelectorAll("#glightbox-slider .gslide");
        const nextSlide = slides[data.current.slideIndex];
        const desc = nextSlide?.querySelector(
          ".gslide-description"
        ) as HTMLElement | null;
        if (desc) {
          desc.style.transition = "none";
          desc.classList.add("gslide-desc-visible");
          // Force reflow so the browser commits the class without transition
          desc.offsetHeight;
          desc.style.transition = "";
        }
      }) as () => void);

      lightbox.on("slide_changed", () => {
        // Clean up: remove desc-visible from non-current slides (the previous one).
        for (const d of document.querySelectorAll(
          ".gslide:not(.current) .gslide-desc-visible"
        )) {
          d.classList.remove("gslide-desc-visible");
        }
        // Ensure current slide's description is visible if in desc mode.
        if (
          descVisible &&
          document.body.classList.contains("glightbox-mobile")
        ) {
          const slide = document.querySelector(".gslide.current");
          const desc = slide?.querySelector(
            ".gslide-description"
          ) as HTMLElement | null;
          if (desc && !desc.classList.contains("gslide-desc-visible")) {
            desc.classList.add("gslide-desc-visible");
          }
        }
        clearMobileInlineHeight();
      });

      lightbox.on("close", () => {
        const slider = document.getElementById("glightbox-slider");
        if (!slider) {
          return;
        }
        slider.removeEventListener("pointerdown", onPointerDown);
        slider.removeEventListener("pointerup", onPointerUp);
        slider.removeEventListener("pointercancel", onPointerCancel);
        isAnimating = false;
        descVisible = false;
        hideAllMobileDescs();
      });

      cleanup = () => {
        lightbox.destroy();
      };

      // Signal that GLightbox is ready (useful for e2e tests)
      containerRef.current?.setAttribute("data-glightbox-ready", "");
    }

    init();

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      className={cn("gallery", className)}
      data-testid="gallery"
      ref={containerRef}
    >
      {images.map((image, index) => {
        const dateLabel = image.date?.slice(0, 7);
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
            initial={tileInitial}
            key={`${image.url}-${index}`}
            transition={tileTransition}
            viewport={tileViewport}
            whileInView={tileWhileInView}
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

            <div className="glightbox-desc hidden">
              <div className="lightbox-desc-header">
                <h4 className="lightbox-desc-title">{image.title}</h4>
                {dateLabel && (
                  <span className="lightbox-desc-date">{dateLabel}</span>
                )}
              </div>
              <p className="lightbox-desc-text">{image.description}</p>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
