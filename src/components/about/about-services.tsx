"use client";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 480,
      damping: 20,
      mass: 1,
    },
  },
} as const;

const titleViewport = { once: true } as const;
const titleInitial = { opacity: 0, y: 20 };
const titleWhileInView = { opacity: 1, y: 0 };
const titleTransition = { duration: 0.6, ease: "easeOut" } as const;

const gridViewport = { once: true, margin: "-50px" } as const;

export function AboutServices({
  title,
  services,
  "data-testid": dataTestId = "about-services",
}: Readonly<AboutServicesProps>) {
  return (
    <div data-testid={dataTestId}>
      <motion.h3
        className="mb-12 text-center text-3xl"
        initial={titleInitial}
        transition={titleTransition}
        viewport={titleViewport}
        whileInView={titleWhileInView}
      >
        {title}
      </motion.h3>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        variants={containerVariants}
        viewport={gridViewport}
        whileInView="visible"
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={cardVariants}>
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
