"use client";

import { Button } from "@components/ui/button";
import { SectionHeader } from "@components/ui/section-header";
import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { getTranslatedPath } from "@i18n/path";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { LuArrowRight } from "react-icons/lu";
import { ProjectCard } from "./project-card";

export interface ProjectData {
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export interface ProjectsProps {
  lang: Lang;
  projects: ProjectData[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Projects({ lang, projects }: Readonly<ProjectsProps>) {
  const t = getTranslations(lang);
  const tp = getTranslatedPath(lang);
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });
  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true });

  return (
    <section
      className="bg-secondary py-14"
      data-testid="projects"
      id="projects"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle={t("projects.subtitle")}
          title={t("projects.title")}
        />

        <motion.div
          animate={isGridInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          data-testid="projects-grid"
          initial="hidden"
          ref={gridRef}
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={cardVariants}>
              <ProjectCard
                date={project.date}
                description={project.excerpt}
                image={project.image}
                title={project.title}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          ref={ctaRef}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <Button data-testid="projects-view-all" href={tp("/portfolio")}>
            <span>{t("projects.viewAll")}</span>
            <LuArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
