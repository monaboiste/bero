"use client";

import { Heading } from "@components/ui/heading";
import { fadeY, spring, stagger, viewport } from "@lib/motion";
import { motion } from "motion/react";
import { ServiceCard } from "./service-card";

export interface ServiceData {
  title: string;
  description: string;
}

export interface AboutServicesProps {
  title: string;
  services: ServiceData[];
  "data-testid"?: string;
}

const titleMotion = fadeY(20);
const { container, item } = stagger(0.08, { y: 30, transition: spring });

export function AboutServices({
  title,
  services,
  "data-testid": dataTestId = "about-services",
}: Readonly<AboutServicesProps>) {
  return (
    <div data-testid={dataTestId}>
      <motion.div {...titleMotion}>
        <Heading as="h3" className="mb-12 text-center" size="3xl">
          {title}
        </Heading>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        variants={container}
        viewport={viewport}
        whileInView="visible"
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={item}>
            <ServiceCard
              description={service.description}
              title={service.title}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
