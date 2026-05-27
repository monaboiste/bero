"use client";

import { Heading } from "@components/ui/heading";
import { Surface } from "@components/ui/surface";
import { Text } from "@components/ui/text";
import { cn } from "@lib/cn";
import { scaleLine } from "@lib/motion";
import { motion } from "motion/react";

export interface ServiceCardProps {
  title: string;
  description: string;
  className?: string;
  "data-testid"?: string;
}

const lineMotion = scaleLine();

export function ServiceCard({
  title,
  description,
  className = "",
  "data-testid": dataTestId = "service-card",
}: Readonly<ServiceCardProps>) {
  return (
    <Surface className={cn("h-full", className)} data-testid={dataTestId} hover>
      <motion.div className="mb-4 h-1 w-12 bg-accent" {...lineMotion} />
      <Heading as="h4" className="mb-3" size="xl">
        {title}
      </Heading>
      <Text variant="muted">{description}</Text>
    </Surface>
  );
}
