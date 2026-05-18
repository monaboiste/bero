"use client";

import { IconBadge } from "@components/ui/icon-badge";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { IconType } from "react-icons";

export interface ContactItem {
  icon: IconType;
  label: string;
}

export interface ContactInfoProps {
  items: ContactItem[];
  className?: string;
  "data-testid"?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ContactInfo({
  items,
  className = "",
  "data-testid": dataTestId = "contact-info",
}: Readonly<ContactInfoProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      animate={isInView ? "visible" : "hidden"}
      className={`space-y-8 ${className}`.trim()}
      data-testid={dataTestId}
      initial="hidden"
      ref={ref}
      variants={containerVariants}
    >
      {items.map((item) => (
        <motion.div
          className="flex items-center space-x-4"
          data-testid="contact-info-row"
          key={item.label}
          variants={rowVariants}
        >
          <div className="shrink-0">
            <IconBadge icon={item.icon} size="md" />
          </div>
          <div className="flex-1">
            <p className="text-lg">{item.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
