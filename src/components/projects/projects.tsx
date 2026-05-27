"use client";

import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { SectionHeader } from "@components/ui/section-header";
import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { getTranslatedPath } from "@i18n/path";
import { motion } from "motion/react";
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
} as const;

const gridViewport = { once: true, margin: "-50px" } as const;

const ctaInitial = { opacity: 0, y: 20 };
const ctaWhileInView = { opacity: 1, y: 0 };
const ctaTransition = { duration: 0.6, ease: "easeOut", delay: 0.3 } as const;
const ctaViewport = { once: true } as const;

export function Projects({ lang, projects }: Readonly<ProjectsProps>) {
  const t = getTranslations(lang);
  const tp = getTranslatedPath(lang);

  return (
    <section
      className="bg-secondary py-14"
      data-testid="projects"
      id="projects"
    >
      <Container>
        <SectionHeader
          subtitle={t("projects.subtitle")}
          title={t("projects.title")}
        />

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          data-testid="projects-grid"
          initial="hidden"
          variants={containerVariants}
          viewport={gridViewport}
          whileInView="visible"
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
          className="mt-8 text-center"
          initial={ctaInitial}
          transition={ctaTransition}
          viewport={ctaViewport}
          whileInView={ctaWhileInView}
        >
          <Button data-testid="projects-view-all" href={tp("/portfolio")}>
            <span>{t("projects.viewAll")}</span>
            <LuArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
