import { type RefObject, useEffect } from "react";

const SWIPE_THRESHOLD = 50;
const TAP_THRESHOLD = 10;
const ANIMATION_SETTLE_MS = 400;
const DESCRIPTIONS_TEMPLATE_ID = "gallery-descriptions";

export interface UseLightboxOptions {
  selector?: string;
  skin?: string;
}

/**
 * Inject lightbox descriptions from a static <template> element into
 * gallery trigger links. This avoids duplicating heavy description data
 * in React props (Astro island serialization).
 */
function injectDescriptions(container: HTMLElement): void {
  const template = document.getElementById(
    DESCRIPTIONS_TEMPLATE_ID
  ) as HTMLTemplateElement | null;
  if (!template) {
    return;
  }

  const templateContent = template.content;
  const triggers = container.querySelectorAll<HTMLAnchorElement>("a.glightbox");

  for (const trigger of triggers) {
    // Remove any previously injected description (in case of re-render)
    const existing = trigger.querySelector(".glightbox-desc");
    if (existing) {
      existing.remove();
    }

    const href = trigger.getAttribute("href");
    if (!href) {
      continue;
    }

    const descSource = templateContent.querySelector(
      `[data-url="${CSS.escape(href)}"]`
    );
    if (!descSource) {
      continue;
    }

    const descEl = document.createElement("div");
    descEl.className = "glightbox-desc hidden";
    descEl.innerHTML = descSource.innerHTML;
    trigger.appendChild(descEl);
  }
}

export function useLightbox(
  containerRef: RefObject<HTMLElement | null>,
  options: UseLightboxOptions = {}
): void {
  const { selector = ".glightbox", skin = "bero" } = options;

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    let destroyed = false;
    let cleanup: (() => void) | null = null;

    async function init() {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      // Inject descriptions from static <template> before GLightbox init
      injectDescriptions(container);

      const GLightbox = (await import("glightbox")).default;

      if (destroyed) {
        return;
      }

      const lightbox = GLightbox({
        selector,
        skin,
        touchNavigation: false,
        draggable: false,
        loop: false,
        zoomable: false,
        moreLength: 0,
      });

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
          // biome-ignore lint/suspicious/noUnusedExpressions: force reflow
          desc.offsetHeight;
          desc.style.transition = "";
        }
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

        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
          handleSwipe(dx);
          return;
        }

        handleTap(dx, dy);
      }

      function onPointerCancel(): void {
        startX = null;
        startY = null;
        tracking = false;
      }

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
      for (const tile of document.querySelectorAll(selector)) {
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
        const slides = document.querySelectorAll("#glightbox-slider .gslide");
        const nextSlide = slides[data.current.slideIndex];
        const desc = nextSlide?.querySelector(
          ".gslide-description"
        ) as HTMLElement | null;
        if (desc) {
          desc.style.transition = "none";
          desc.classList.add("gslide-desc-visible");
          // biome-ignore lint/suspicious/noUnusedExpressions: force reflow
          desc.offsetHeight;
          desc.style.transition = "";
        }
      }) as () => void);

      lightbox.on("slide_changed", () => {
        for (const d of document.querySelectorAll(
          ".gslide:not(.current) .gslide-desc-visible"
        )) {
          d.classList.remove("gslide-desc-visible");
        }
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
  }, [containerRef, selector, skin]);
}
