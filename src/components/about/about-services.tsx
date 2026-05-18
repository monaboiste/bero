"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
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
};

export function AboutServices({
  title,
  services,
  "data-testid": dataTestId = "about-services",
}: Readonly<AboutServicesProps>) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <div data-testid={dataTestId}>
      <motion.h3
        animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
        className="mb-12 text-center text-3xl"
        initial={{ opacity: 0, y: 20 }}
        ref={titleRef}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {title}
      </motion.h3>

      <motion.div
        animate={isGridInView ? "visible" : "hidden"}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        ref={gridRef}
        variants={containerVariants}
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
