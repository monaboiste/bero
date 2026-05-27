"use client";

import { Heading } from "@components/ui/heading";
import { Surface } from "@components/ui/surface";
import { Text } from "@components/ui/text";
import { cn } from "@lib/cn";
import { motion } from "motion/react";

export interface ServiceCardProps {
  title: string;
  description: string;
  className?: string;
  "data-testid"?: string;
}

const viewport = { once: true, margin: "-50px" } as const;
const lineInitial = { scaleX: 0 };
const lineWhileInView = { scaleX: 1 };
const lineTransition = { duration: 0.6, delay: 0.3 };

export function ServiceCard({
  title,
  description,
  className = "",
  "data-testid": dataTestId = "service-card",
}: Readonly<ServiceCardProps>) {
  return (
    <Surface className={cn("h-full", className)} data-testid={dataTestId} hover>
      <motion.div
        className="mb-4 h-1 w-12 bg-accent"
        initial={lineInitial}
        style={{ transformOrigin: "left" }}
        transition={lineTransition}
        viewport={viewport}
        whileInView={lineWhileInView}
      />
      <Heading as="h4" className="mb-3" size="xl">
        {title}
      </Heading>
      <Text variant="muted">{description}</Text>
    </Surface>
  );
}
