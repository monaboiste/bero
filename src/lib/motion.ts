/** Viewport configuration presets */
export const viewport = { once: true, margin: "-50px" } as const;
export const viewportDeep = { once: true, margin: "-100px" } as const;

/** Transition presets */
export const ease = { duration: 0.6, ease: "easeOut" } as const;
export const easeSlow = { duration: 0.8 } as const;
export const spring = {
  type: "spring",
  stiffness: 480,
  damping: 20,
  mass: 1,
} as const;

/** Scroll-reveal animation presets */

export function fadeUp(y = 20, opts?: { delay?: number }) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    transition: { ...ease, delay: opts?.delay },
    viewport,
  } as const;
}

export function fadeX(x: number, opts?: { delay?: number }) {
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    transition: { ...easeSlow, delay: opts?.delay },
    viewport: viewportDeep,
  } as const;
}

export function scaleIn(opts?: { scale?: number; delay?: number }) {
  return {
    initial: { opacity: 0, scale: opts?.scale ?? 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { ...ease, delay: opts?.delay },
    viewport: viewportDeep,
  } as const;
}

export function scaleLine(opts?: { delay?: number; origin?: string }) {
  return {
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    transition: { duration: 0.6, delay: opts?.delay ?? 0.3 },
    viewport,
    style: { transformOrigin: opts?.origin ?? "left" },
  } as const;
}

/** On-mount entrance animation presets */

export function entrance(opts: {
  x?: number;
  y?: number;
  delay?: number;
  duration?: number;
}) {
  return {
    initial: {
      opacity: 0,
      ...(opts.x != null && { x: opts.x }),
      ...(opts.y != null && { y: opts.y }),
    },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: opts.duration ?? 0.6, delay: opts.delay },
  } as const;
}

export function entranceScale(opts?: {
  from?: number;
  delay?: number;
  duration?: number;
}) {
  return {
    initial: { scale: opts?.from ?? 1.1 },
    animate: { scale: 1 },
    transition: { duration: opts?.duration ?? 1.5, delay: opts?.delay },
  } as const;
}

/** Staggered children animation presets */

export function stagger(
  staggerChildren = 0.1,
  itemConfig?: { y?: number; transition?: object }
) {
  return {
    container: {
      hidden: {},
      visible: { transition: { staggerChildren } },
    },
    item: {
      hidden: { opacity: 0, y: itemConfig?.y ?? 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: itemConfig?.transition ?? ease,
      },
    },
  } as const;
}
