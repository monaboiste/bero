"use client";

import { IconBadge } from "@components/ui/icon-badge";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";

export interface StatCardProps {
  icon: IconType;
  valueNumeric?: number | null;
  suffix: string;
  label: string;
  "data-testid"?: string;
}

const viewport = { once: true, margin: "-50px" } as const;
const cardInitial = { opacity: 0, y: 50 };
const cardWhileInView = { opacity: 1, y: 0 };
const cardTransition = { duration: 0.6, ease: "easeOut" } as const;

function AnimatedCounter({
  target,
  suffix,
  isInView,
}: Readonly<{ target: number; suffix: string; isInView: boolean }>) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(`${Math.round(v)}${suffix}`);
    });
    return unsubscribe;
  }, [spring, suffix]);

  return <span data-testid="stat-card-value">{display}</span>;
}

export function StatCard({
  icon,
  valueNumeric,
  suffix,
  label,
  "data-testid": dataTestId = "stat-card",
}: Readonly<StatCardProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const isValueAnimatable = valueNumeric !== undefined && valueNumeric !== null;

  return (
    <motion.div
      className="text-center"
      data-testid={dataTestId}
      initial={cardInitial}
      ref={ref}
      transition={cardTransition}
      viewport={viewport}
      whileInView={cardWhileInView}
    >
      <IconBadge className="mb-4" icon={icon} size="lg" />
      <div className="mb-2 text-4xl">
        {isValueAnimatable ? (
          <AnimatedCounter
            isInView={isInView}
            suffix={suffix}
            target={valueNumeric}
          />
        ) : (
          <span>{suffix}</span>
        )}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </motion.div>
  );
}
